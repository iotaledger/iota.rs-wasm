// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

//! The Client module to connect through HORNET or Bee with API usages

mod builder;
mod high_level;

use std::{
    sync::{Arc, RwLock},
    time::Duration,
};

use bee_block::{output::RentStructure, protocol::ProtocolParameters};
use bee_pow::providers::{NonceProvider, NonceProviderBuilder};
#[cfg(not(target_family = "wasm"))]
use tokio::{runtime::Runtime, sync::broadcast::Sender};
#[cfg(feature = "mqtt")]
use {
    crate::node_api::mqtt::{BrokerOptions, MqttEvent, TopicHandlerMap},
    rumqttc::AsyncClient as MqttClient,
    tokio::sync::watch::{Receiver as WatchReceiver, Sender as WatchSender},
};

pub use self::builder::{ClientBuilder, NetworkInfo};
use crate::{constants::DEFAULT_TIPS_INTERVAL, error::Result};

/// An instance of the client using HORNET or Bee URI
#[derive(Clone)]
pub struct Client {
    #[allow(dead_code)]
    #[cfg(not(target_family = "wasm"))]
    pub(crate) runtime: Option<Arc<Runtime>>,
    /// Node manager
    pub(crate) node_manager: crate::node_manager::NodeManager,
    /// Flag to stop the node syncing
    #[cfg(not(target_family = "wasm"))]
    pub(crate) sync_kill_sender: Option<Arc<Sender<()>>>,
    /// A MQTT client to subscribe/unsubscribe to topics.
    #[cfg(feature = "mqtt")]
    pub(crate) mqtt_client: Option<MqttClient>,
    #[cfg(feature = "mqtt")]
    pub(crate) mqtt_topic_handlers: Arc<tokio::sync::RwLock<TopicHandlerMap>>,
    #[cfg(feature = "mqtt")]
    pub(crate) broker_options: BrokerOptions,
    #[cfg(feature = "mqtt")]
    pub(crate) mqtt_event_channel: (Arc<WatchSender<MqttEvent>>, WatchReceiver<MqttEvent>),
    pub(crate) network_info: Arc<RwLock<NetworkInfo>>,
    /// HTTP request timeout.
    pub(crate) api_timeout: Duration,
    /// HTTP request timeout for remote PoW API call.
    pub(crate) remote_pow_timeout: Duration,
    #[allow(dead_code)] // not used for wasm
    /// pow_worker_count for local PoW.
    pub(crate) pow_worker_count: Option<usize>,
}

impl std::fmt::Debug for Client {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let mut d = f.debug_struct("Client");
        d.field("node_manager", &self.node_manager);
        #[cfg(feature = "mqtt")]
        d.field("broker_options", &self.broker_options);
        d.field("network_info", &self.network_info).finish()
    }
}

impl Drop for Client {
    /// Gracefully shutdown the `Client`
    fn drop(&mut self) {
        #[cfg(not(target_family = "wasm"))]
        if let Some(sender) = self.sync_kill_sender.take() {
            sender.send(()).expect("failed to stop syncing process");
        }

        #[cfg(not(target_family = "wasm"))]
        if let Some(runtime) = self.runtime.take() {
            if let Ok(runtime) = Arc::try_unwrap(runtime) {
                runtime.shutdown_background();
            }
        }

        #[cfg(feature = "mqtt")]
        if let Some(mqtt_client) = self.mqtt_client.take() {
            std::thread::spawn(move || {
                // ignore errors in case the event loop was already dropped
                // .cancel() finishes the event loop right away
                let _ = crate::async_runtime::block_on(mqtt_client.cancel());
            })
            .join()
            .unwrap();
        }
    }
}

impl Client {
    /// Create the builder to instantiate the IOTA Client.
    pub fn builder() -> ClientBuilder {
        ClientBuilder::new()
    }

    /// Gets the miner to use based on the Pow setting
    pub fn get_pow_provider(&self) -> impl NonceProvider {
        let local_pow: bool = self.get_local_pow();
        #[cfg(target_family = "wasm")]
        let miner = crate::api::wasm_miner::SingleThreadedMiner::builder()
            .local_pow(local_pow)
            .finish();
        #[cfg(not(target_family = "wasm"))]
        let miner = {
            let mut miner = crate::api::miner::ClientMiner::builder().with_local_pow(local_pow);
            if let Some(worker_count) = self.pow_worker_count {
                miner = miner.with_worker_count(worker_count)
            }
            miner.finish()
        };

        miner
    }

    /// Gets the network related information such as network_id and min_pow_score
    /// and if it's the default one, sync it first and set the NetworkInfo.
    pub fn get_network_info(&self) -> Result<NetworkInfo> {
        Ok(self.network_info.read().map_err(|_| crate::Error::PoisonError)?.clone())
    }

    /// Gets the protocol parameters of the node we're connecting to.
    pub fn get_protocol_parameters(&self) -> Result<ProtocolParameters> {
        Ok(self.get_network_info()?.protocol_parameters)
    }

    /// Gets and updates the internally cached network info.
    pub async fn get_info_update(&self) -> Result<()> {
        let info = self.get_info().await?;

        let mut network_info = self.network_info.write().map_err(|_| crate::Error::PoisonError)?;
        network_info.protocol_parameters = ProtocolParameters::try_from(info.node_info.protocol.clone())?;

        Ok(())
    }

    /// Gets the protocol version of the node we're connecting to.
    pub fn get_protocol_version(&self) -> Result<u8> {
        Ok(self.get_network_info()?.protocol_parameters.protocol_version())
    }

    /// Gets the network name of the node we're connecting to.
    pub fn get_network_name(&self) -> Result<String> {
        Ok(self.get_network_info()?.protocol_parameters.network_name().into())
    }

    /// Gets the network id of the node we're connecting to.
    pub fn get_network_id(&self) -> Result<u64> {
        Ok(self.get_network_info()?.protocol_parameters.network_id())
    }

    /// Gets the bech32 HRP of the node we're connecting to.
    pub fn get_bech32_hrp(&self) -> Result<String> {
        Ok(self.get_network_info()?.protocol_parameters.bech32_hrp().into())
    }

    /// Gets the minimum pow score of the node we're connecting to.
    pub fn get_min_pow_score(&self) -> Result<u32> {
        Ok(self.get_network_info()?.protocol_parameters.min_pow_score())
    }

    /// Gets the below maximum depth of the node we're connecting to.
    pub fn get_below_max_depth(&self) -> Result<u8> {
        Ok(self.get_network_info()?.protocol_parameters.below_max_depth())
    }

    /// Gets the rent structure of the node we're connecting to.
    pub fn get_rent_structure(&self) -> Result<RentStructure> {
        Ok(self.get_network_info()?.protocol_parameters.rent_structure().clone())
    }

    /// Gets the token supply of the node we're connecting to.
    pub fn get_token_supply(&self) -> Result<u64> {
        Ok(self.get_network_info()?.protocol_parameters.token_supply())
    }

    /// returns the tips interval
    pub fn get_tips_interval(&self) -> u64 {
        self.network_info
            .read()
            .map_or(DEFAULT_TIPS_INTERVAL, |info| info.tips_interval)
    }

    /// returns if local pow should be used or not
    pub fn get_local_pow(&self) -> bool {
        self.network_info
            .read()
            .map_or(NetworkInfo::default().local_pow, |info| info.local_pow)
    }

    pub(crate) fn get_timeout(&self) -> Duration {
        self.api_timeout
    }

    pub(crate) fn get_remote_pow_timeout(&self) -> Duration {
        self.remote_pow_timeout
    }

    /// returns the fallback_to_local_pow
    pub fn get_fallback_to_local_pow(&self) -> bool {
        self.network_info
            .read()
            .map_or(NetworkInfo::default().fallback_to_local_pow, |info| {
                info.fallback_to_local_pow
            })
    }
}
