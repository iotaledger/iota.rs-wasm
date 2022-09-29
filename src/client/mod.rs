// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

//! The Client module to connect through HORNET or Bee with API usages

mod builder;
mod high_level;

use std::time::Duration;
#[cfg(not(target_family = "wasm"))]
use std::{
    borrow::{Borrow, BorrowMut},
    sync::{Arc, RwLock},
};

#[cfg(not(target_family = "wasm"))]
#[derive(Clone)]
pub(crate) struct NetworkInfoGuard(pub(crate) Arc<RwLock<NetworkInfo>>);

#[cfg(not(target_family = "wasm"))]
impl NetworkInfoGuard {
    pub(crate) fn new(network_info: NetworkInfo) -> Self {
        Self(Arc::new(RwLock::new(network_info)))
    }

    pub(crate) fn modify<T>(&self, f: impl FnOnce(&mut NetworkInfo) -> T) -> Result<T> {
        self.0
            .write()
            .map(|mut network_guard| f(network_guard.borrow_mut()))
            .map_err(|_| Error::PoisonError)
    }

    fn read<T>(&self, f: impl FnOnce(&NetworkInfo) -> T) -> Result<T> {
        self.0
            .read()
            .map(|guard| f(guard.borrow()))
            .map_err(|_| Error::PoisonError)
    }
}

#[cfg(target_family = "wasm")]
pub(crate) type NetworkInfoGuard = wasm_network_info_guard::WasmNetworkInfoGuard;

#[cfg(target_family = "wasm")]
mod wasm_network_info_guard {
    use std::{
        borrow::{Borrow, BorrowMut},
        cell::{Cell, RefCell},
        rc::Rc,
    };

    use bee_api_types::responses::InfoResponse;
    use bee_block::protocol::ProtocolParameters;

    use crate::{Client, Error, NetworkInfo};
    #[derive(Clone)]
    pub(crate) struct WasmNetworkInfoGuard {
        pub(super) network_info: Rc<RefCell<NetworkInfo>>,
        // The unix timestamp in ms when the NetworkInfo was last observed to be successfully retrieved from the node.
        pub(super) refreshed: Rc<Cell<f64>>,
        pub(super) update_error: Rc<Cell<Option<Error>>>,
    }

    impl WasmNetworkInfoGuard {
        pub(crate) fn new(network_info: NetworkInfo) -> Self {
            Self {
                network_info: Rc::new(RefCell::new(network_info)),
                refreshed: Rc::new(Cell::new(instant::now())),
                update_error: Rc::new(Cell::new(None)),
            }
        }

        pub(crate) fn modify<T>(&self, f: impl FnOnce(&mut NetworkInfo) -> T) -> Result<T, Error> {
            let mut current = self.network_info.try_borrow_mut().map_err(|_| Error::PoisonError)?;
            let output = f(current.borrow_mut());
            Ok(output)
        }

        pub(super) fn refresh(&self, client: Rc<Client>) {
            let client_clone: Rc<Client> = client;
            let guard_clone: WasmNetworkInfoGuard = self.clone();
            wasm_bindgen_futures::spawn_local(async move {
                let info = client_clone.get_info();
                match info.await.map(|wrapper| wrapper.node_info) {
                    Ok(InfoResponse { protocol, .. }) => {
                        match ProtocolParameters::try_from(protocol).map_err(crate::error::Error::from) {
                            Ok(protocol_params) => {
                                let result = guard_clone.modify(move |network_info| {
                                    network_info.protocol_parameters = protocol_params;
                                });
                                if result.is_err() {
                                    return;
                                }

                                let updated = instant::now();
                                guard_clone.refreshed.set(updated);
                            }
                            Err(error) => {
                                guard_clone.update_error.set(Some(error));
                            }
                        }
                    }
                    Err(error) => {
                        guard_clone.update_error.set(Some(error));
                    }
                }
            });
        }

        pub(super) fn read<T>(&self, f: impl FnOnce(&NetworkInfo) -> T) -> Result<T, Error> {
            let current = self.network_info.try_borrow().map_err(|_| Error::PoisonError)?;
            Ok(f(current.borrow()))
        }

        pub(super) fn error(&self) -> Option<Error> {
            self.update_error.take()
        }
    }
}

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

pub use self::builder::{ClientBuilder, NetworkInfo, NetworkInfoDto};
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
    pub(crate) network_info: NetworkInfoGuard,
    /// HTTP request timeout.
    pub(crate) api_timeout: Duration,
    /// HTTP request timeout for remote PoW API call.
    pub(crate) remote_pow_timeout: Duration,
    #[allow(dead_code)] // not used for wasm
    /// pow_worker_count for local PoW.
    pub(crate) pow_worker_count: Option<usize>,
}

#[cfg(not(target_family = "wasm"))]
impl std::fmt::Debug for Client {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let mut d = f.debug_struct("Client");
        d.field("node_manager", &self.node_manager);
        #[cfg(feature = "mqtt")]
        d.field("broker_options", &self.broker_options);
        d.field("network_info", &self.network_info.0).finish()
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
        // For WASM we don't have the node syncing process, which updates the network_info every 60 seconds, but the Pow
        // difficulty or the byte cost could change via a milestone, hence we make sure to update the network info if it
        // is more than 60 seconds old, so we don't create invalid transactions/blocks.
        #[cfg(target_family = "wasm")]
        {
            // These values are milliseconds since the unix epoch.
            let last_refreshed = self.network_info.refreshed.get();
            let start_time = instant::now();
            // if the network info was refreshed less than 60 seconds ago
            // we return the network info immediately, otherwise we update
            let allowed_duration_ms = 60f64 * 1000f64;
            if (start_time - last_refreshed) <= allowed_duration_ms {
                self.network_info.read(Clone::clone)
            } else {
                // Here we emulate block_on which doesn't work in Wasm.
                self.network_info.refresh(std::rc::Rc::new(self.clone()));
                let time_out = self.api_timeout;
                let mut elapsed = Duration::default();
                while elapsed < time_out {
                    let right_now = instant::now();
                    if right_now > start_time {
                        elapsed += Duration::from_millis((right_now as u64) - (start_time as u64));
                    }
                    elapsed += Duration::from_millis(1);
                    if let Some(err) = self.network_info.error() {
                        // The update failed.
                        return Err(err);
                    } else if self.network_info.refreshed.get() > start_time {
                        // This means that the network info has successfully been retrieved in the meantime.
                        return self.network_info.read(Clone::clone);
                    }
                }
                Err(Error::NodeError(
                    "Could not acquire network info within the permitted time frame".to_owned(),
                ))
            }
        }
        #[cfg(not(target_family = "wasm"))]
        return self.network_info.read(Clone::clone);
    }

    /// Gets the protocol parameters of the node we're connecting to.
    pub fn get_protocol_parameters(&self) -> Result<ProtocolParameters> {
        Ok(self.get_network_info()?.protocol_parameters)
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
            .read(|info| info.tips_interval)
            .unwrap_or(DEFAULT_TIPS_INTERVAL)
    }

    /// returns if local pow should be used or not
    pub fn get_local_pow(&self) -> bool {
        self.network_info
            .read(|info| info.local_pow)
            .unwrap_or(NetworkInfo::default().local_pow)
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
            .read(|info| info.fallback_to_local_pow)
            .unwrap_or(NetworkInfo::default().fallback_to_local_pow)
    }
}
