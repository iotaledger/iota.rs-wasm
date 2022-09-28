"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
// Copyright 2021-2022 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const MessageHandler_1 = require("./MessageHandler");
/** The Client to interact with nodes. */
class Client {
    constructor(options) {
        this.messageHandler = new MessageHandler_1.MessageHandler(options);
    }
    /**
     * Returns the node information together with the url of the used node
     * @returns { Promise<INodeInfoWrapper> }.
     */
    async getInfo() {
        const response = await this.messageHandler.sendMessage({
            name: 'GetInfo',
        });
        return JSON.parse(response).payload;
    }
    /**
     * Gets the network related information such as network_id and min_pow_score
     */
    async getNetworkInfo() {
        const response = await this.messageHandler.sendMessage({
            name: 'GetNetworkInfo',
        });
        return JSON.parse(response).payload;
    }
    /** Fetch basic output IDs based on query parameters */
    async basicOutputIds(queryParameters) {
        const response = await this.messageHandler.sendMessage({
            name: 'BasicOutputIds',
            data: {
                queryParameters,
            },
        });
        return JSON.parse(response).payload;
    }
    /** Get output from a known outputID */
    async getOutput(outputId) {
        const response = await this.messageHandler.sendMessage({
            name: 'GetOutput',
            data: {
                outputId,
            },
        });
        return JSON.parse(response).payload;
    }
    /** Fetch OutputResponse from provided OutputIds (requests are sent in parallel) */
    async getOutputs(outputIds) {
        const response = await this.messageHandler.sendMessage({
            name: 'GetOutputs',
            data: {
                outputIds,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Generates a new mnemonic.
     */
    async generateMnemonic() {
        const response = await this.messageHandler.sendMessage({
            name: 'GenerateMnemonic',
        });
        return JSON.parse(response).payload;
    }
    /**
     * Returns a hex encoded seed for a mnemonic.
     */
    async mnemonicToHexSeed(mnemonic) {
        const response = await this.messageHandler.sendMessage({
            name: 'MnemonicToHexSeed',
            data: {
                mnemonic,
            },
        });
        return JSON.parse(response).payload;
    }
    /** Generate addresses */
    async generateAddresses(secretManager, generateAddressesOptions) {
        const response = await this.messageHandler.sendMessage({
            name: 'GenerateAddresses',
            data: {
                secretManager,
                options: generateAddressesOptions,
            },
        });
        return JSON.parse(response).payload;
    }
    /** Build and post a block */
    async buildAndPostBlock(secretManager, options) {
        const response = await this.messageHandler.sendMessage({
            name: 'BuildAndPostBlock',
            data: {
                secretManager,
                options,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Returns tips that are ideal for attaching a block.
     * The tips can be considered as non-lazy and are therefore ideal for attaching a block.
     */
    async getTips() {
        const response = await this.messageHandler.sendMessage({
            name: 'GetTips',
        });
        return JSON.parse(response).payload;
    }
    /**
     * Post block in JSON format, returns the block ID.
     */
    async postBlock(block) {
        const response = await this.messageHandler.sendMessage({
            name: 'PostBlock',
            data: {
                block,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Get block as JSON.
     */
    async getBlock(blockId) {
        const response = await this.messageHandler.sendMessage({
            name: 'GetBlock',
            data: {
                blockId,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Get block metadata.
     */
    async getBlockMetadata(blockId) {
        const response = await this.messageHandler.sendMessage({
            name: 'GetBlockMetadata',
            data: {
                blockId,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Find inputs from addresses for a provided amount (useful for offline signing)
     */
    async findInputs(addresses, amount) {
        const response = await this.messageHandler.sendMessage({
            name: 'FindInputs',
            data: {
                addresses,
                amount,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Find all outputs based on the requests criteria. This method will try to query multiple nodes if
     * the request amount exceeds individual node limit.
     */
    async findOutputs(outputIds, addresses) {
        const response = await this.messageHandler.sendMessage({
            name: 'FindOutputs',
            data: {
                outputIds,
                addresses,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Get the status of a Ledger Nano
     */
    async getLedgerNanoStatus(isSimulator) {
        const response = await this.messageHandler.sendMessage({
            name: 'GetLedgerNanoStatus',
            data: {
                isSimulator,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Prepare a transaction for signing
     */
    async prepareTransaction(secretManager, options) {
        const response = await this.messageHandler.sendMessage({
            name: 'PrepareTransaction',
            data: {
                secretManager,
                options,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Store a mnemonic in the Stronghold vault
     */
    async storeMnemonic(secretManager, mnemonic) {
        const response = await this.messageHandler.sendMessage({
            name: 'StoreMnemonic',
            data: {
                secretManager,
                mnemonic,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Sign a transaction
     */
    async signTransaction(secretManager, preparedTransactionData) {
        const response = await this.messageHandler.sendMessage({
            name: 'SignTransaction',
            data: {
                secretManager,
                preparedTransactionData,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Submit a payload in a block
     */
    async submitPayload(payload) {
        const response = await this.messageHandler.sendMessage({
            name: 'SubmitPayload',
            data: {
                payload,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Returns a valid Address parsed from a String.
     */
    async parseBech32Address(address) {
        const response = await this.messageHandler.sendMessage({
            name: 'ParseBech32Address',
            data: {
                address,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Returns a block ID (Blake2b256 hash of the block bytes)
     */
    async blockId(block) {
        const response = await this.messageHandler.sendMessage({
            name: 'BlockId',
            data: {
                block,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Get a node candidate from the synced node pool.
     */
    async getNode() {
        const response = await this.messageHandler.sendMessage({
            name: 'GetNode',
        });
        return JSON.parse(response).payload;
    }
    /**
     * Get the network id of the node we're connecting to.
     */
    async getNetworkId() {
        const response = await this.messageHandler.sendMessage({
            name: 'GetNetworkId',
        });
        return JSON.parse(response).payload;
    }
    /**
     * Returns the bech32_hrp.
     */
    async getBech32Hrp() {
        const response = await this.messageHandler.sendMessage({
            name: 'GetBech32Hrp',
        });
        return JSON.parse(response).payload;
    }
    /**
     * Returns the min PoW score.
     */
    async getMinPowScore() {
        const response = await this.messageHandler.sendMessage({
            name: 'GetMinPowScore',
        });
        return JSON.parse(response).payload;
    }
    /**
     * Returns the tips interval.
     */
    async getTipsInterval() {
        const response = await this.messageHandler.sendMessage({
            name: 'GetTipsInterval',
        });
        return JSON.parse(response).payload;
    }
    /**
     * Returns if local pow should be used or not.
     */
    async getLocalPow() {
        const response = await this.messageHandler.sendMessage({
            name: 'GetLocalPow',
        });
        return JSON.parse(response).payload;
    }
    /**
     * Get fallback to local proof of work timeout.
     */
    async getFallbackToLocalPow() {
        const response = await this.messageHandler.sendMessage({
            name: 'GetFallbackToLocalPow',
        });
        return JSON.parse(response).payload;
    }
    /**
     * Get health of node by input url.
     */
    async getHealth(url) {
        const response = await this.messageHandler.sendMessage({
            name: 'GetHealth',
            data: {
                url,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Get info of node with input url.
     */
    async getNodeInfo(url, auth) {
        const response = await this.messageHandler.sendMessage({
            name: 'GetNodeInfo',
            data: {
                url,
                auth,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Get peers.
     */
    async getPeers() {
        const response = await this.messageHandler.sendMessage({
            name: 'GetPeers',
        });
        return JSON.parse(response).payload;
    }
    /**
     * Post block as raw bytes, returns the block ID.
     */
    async postBlockRaw(block) {
        const response = await this.messageHandler.sendMessage({
            name: 'PostBlockRaw',
            data: {
                block,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Get block as raw bytes.
     */
    async getBlockRaw(blockId) {
        const response = await this.messageHandler.sendMessage({
            name: 'GetBlockRaw',
            data: {
                blockId,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Look up a milestone by a given milestone index.
     */
    async getMilestoneById(milestoneId) {
        const response = await this.messageHandler.sendMessage({
            name: 'GetMilestoneById',
            data: {
                milestoneId,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Returns all UTXO changes that happened at a specific milestone.
     */
    async getUtxoChangesById(milestoneId) {
        const response = await this.messageHandler.sendMessage({
            name: 'GetUtxoChangesById',
            data: {
                milestoneId,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Look up a milestone by a given milestone index.
     */
    async getMilestoneByIndex(index) {
        const response = await this.messageHandler.sendMessage({
            name: 'GetMilestoneByIndex',
            data: {
                index,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Returns all UTXO changes that happened at a specific milestone.
     */
    async getUtxoChangesByIndex(index) {
        const response = await this.messageHandler.sendMessage({
            name: 'GetUtxoChangesByIndex',
            data: {
                index,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Get receipts.
     */
    async getReceipts() {
        const response = await this.messageHandler.sendMessage({
            name: 'GetReceipts',
        });
        return JSON.parse(response).payload;
    }
    /**
     * Get the receipts by the given milestone index.
     */
    async getReceiptsMigratedAt(milestoneIndex) {
        const response = await this.messageHandler.sendMessage({
            name: 'GetReceiptsMigratedAt',
            data: {
                milestoneIndex,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Get the treasury output.
     */
    async getTreasury() {
        const response = await this.messageHandler.sendMessage({
            name: 'GetTreasury',
        });
        return JSON.parse(response).payload;
    }
    /**
     * Returns the included block of the transaction.
     */
    async getIncludedBlock(transactionId) {
        const response = await this.messageHandler.sendMessage({
            name: 'GetIncludedBlock',
            data: {
                transactionId,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Transforms bech32 to hex.
     */
    async bech32ToHex(bech32) {
        const response = await this.messageHandler.sendMessage({
            name: 'Bech32ToHex',
            data: {
                bech32,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Transforms a hex encoded address to a bech32 encoded address.
     */
    async hexToBech32(hex, bech32Hrp) {
        const response = await this.messageHandler.sendMessage({
            name: 'HexToBech32',
            data: {
                hex,
                bech32Hrp,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Transforms a hex encoded public key to a bech32 encoded address.
     */
    async hexPublicKeyToBech32Address(hex, bech32Hrp) {
        const response = await this.messageHandler.sendMessage({
            name: 'HexPublicKeyToBech32Address',
            data: {
                hex,
                bech32Hrp,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Checks if a String is a valid bech32 encoded address.
     */
    async isAddressValid(address) {
        const response = await this.messageHandler.sendMessage({
            name: 'IsAddressValid',
            data: {
                address,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Fetch alias output IDs
     */
    async aliasOutputIds(queryParameters) {
        const response = await this.messageHandler.sendMessage({
            name: 'AliasOutputIds',
            data: {
                queryParameters,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Fetch alias output ID
     */
    async aliasOutputId(aliasId) {
        const response = await this.messageHandler.sendMessage({
            name: 'AliasOutputId',
            data: {
                aliasId,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Fetch NFT output IDs
     */
    async nftOutputIds(queryParameters) {
        const response = await this.messageHandler.sendMessage({
            name: 'NftOutputIds',
            data: {
                queryParameters,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Fetch NFT output ID
     */
    async nftOutputId(nftId) {
        const response = await this.messageHandler.sendMessage({
            name: 'NftOutputId',
            data: {
                nftId,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Fetch Foundry Output IDs
     */
    async foundryOutputIds(queryParameters) {
        const response = await this.messageHandler.sendMessage({
            name: 'FoundryOutputIds',
            data: {
                queryParameters,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Fetch Foundry Output ID
     */
    async foundryOutputId(foundryId) {
        const response = await this.messageHandler.sendMessage({
            name: 'FoundryOutputId',
            data: {
                foundryId,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Try to get OutputResponse from provided OutputIds (requests are sent
     * in parallel and errors are ignored, can be useful for spent outputs)
     */
    async tryGetOutputs(outputIds) {
        const response = await this.messageHandler.sendMessage({
            name: 'TryGetOutputs',
            data: {
                outputIds,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Find all blocks by provided block IDs.
     */
    async findBlocks(blockIds) {
        const response = await this.messageHandler.sendMessage({
            name: 'FindBlocks',
            data: {
                blockIds,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Retries (promotes or reattaches) a block for provided block id. Block should be
     * retried only if they are valid and haven't been confirmed for a while.
     */
    async retry(blockId) {
        const response = await this.messageHandler.sendMessage({
            name: 'Retry',
            data: {
                blockId,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Retries (promotes or reattaches) a block for provided block id until it's included (referenced by a
     * milestone). Default interval is 5 seconds and max attempts is 40. Returns the included block at first
     * position and additional reattached blocks
     */
    async retryUntilIncluded(blockId, interval, maxAttempts) {
        const response = await this.messageHandler.sendMessage({
            name: 'RetryUntilIncluded',
            data: {
                blockId,
                interval,
                maxAttempts,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Function to consolidate all funds from a range of addresses to the address with the lowest index in that range
     * Returns the address to which the funds got consolidated, if any were available
     */
    async consolidateFunds(secretManager, generateAddressesOptions) {
        const response = await this.messageHandler.sendMessage({
            name: 'ConsolidateFunds',
            data: {
                secretManager,
                generateAddressesOptions,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Reattaches blocks for provided block id. Blocks can be reattached only if they are valid and haven't been
     * confirmed for a while.
     */
    async reattach(blockId) {
        const response = await this.messageHandler.sendMessage({
            name: 'Reattach',
            data: {
                blockId,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Reattach a block without checking if it should be reattached
     */
    async reattachUnchecked(blockId) {
        const response = await this.messageHandler.sendMessage({
            name: 'ReattachUnchecked',
            data: {
                blockId,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Promotes a block. The method should validate if a promotion is necessary through get_block. If not, the
     * method should error out and should not allow unnecessary promotions.
     */
    async promote(blockId) {
        const response = await this.messageHandler.sendMessage({
            name: 'Promote',
            data: {
                blockId,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Promote a block without checking if it should be promoted
     */
    async promoteUnchecked(blockId) {
        const response = await this.messageHandler.sendMessage({
            name: 'PromoteUnchecked',
            data: {
                blockId,
            },
        });
        return JSON.parse(response).payload;
    }
    /**
     * Returns the unsynced nodes.
     */
    async unsyncedNodes() {
        const response = await this.messageHandler.sendMessage({
            name: 'UnsyncedNodes',
        });
        return JSON.parse(response).payload;
    }
    /**
     * Build a Basic Output.
     */
    async buildBasicOutput(options) {
        const response = await this.messageHandler.sendMessage({
            name: 'BuildBasicOutput',
            data: options,
        });
        return JSON.parse(response).payload;
    }
    /**
     * Build an Alias Output.
     */
    async buildAliasOutput(options) {
        const response = await this.messageHandler.sendMessage({
            name: 'BuildAliasOutput',
            data: options,
        });
        return JSON.parse(response).payload;
    }
    /**
     * Build a Foundry Output.
     */
    async buildFoundryOutput(options) {
        const response = await this.messageHandler.sendMessage({
            name: 'BuildFoundryOutput',
            data: options,
        });
        return JSON.parse(response).payload;
    }
    /**
     * Build an Nft Output.
     */
    async buildNftOutput(options) {
        const response = await this.messageHandler.sendMessage({
            name: 'BuildNftOutput',
            data: options,
        });
        return JSON.parse(response).payload;
    }
    // MQTT
    listen(topics, callback) {
        return this.messageHandler.listen(topics, callback);
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map