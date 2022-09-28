import type { IClientOptions, IGenerateAddressesOptions, IBuildBlockOptions, QueryParameter, IPreparedTransactionData, BlockId, INetworkInfo, SecretManager, INode, IAuth, IBasicOutputBuilderOptions, IAliasOutputBuilderOptions, IFoundryOutputBuilderOptions, INftOutputBuilderOptions, FoundryQueryParameter, NftQueryParameter, AliasQueryParameter, LedgerNanoStatus } from '../types';
import type { IUTXOInput, AddressTypes, IOutputResponse, IBlock, IBlockMetadata, PayloadTypes, IPeer, IMilestonePayload, IMilestoneUtxoChangesResponse, INodeInfo, IReceiptsResponse, ITreasury, IBasicOutput, IAliasOutput, IFoundryOutput, INftOutput } from '@iota/types';
import type { INodeInfoWrapper } from '../types/nodeInfo';
/** The Client to interact with nodes. */
export declare class Client {
    private messageHandler;
    constructor(options: IClientOptions);
    /**
     * Returns the node information together with the url of the used node
     * @returns { Promise<INodeInfoWrapper> }.
     */
    getInfo(): Promise<INodeInfoWrapper>;
    /**
     * Gets the network related information such as network_id and min_pow_score
     */
    getNetworkInfo(): Promise<INetworkInfo>;
    /** Fetch basic output IDs based on query parameters */
    basicOutputIds(queryParameters: QueryParameter[]): Promise<string[]>;
    /** Get output from a known outputID */
    getOutput(outputId: string): Promise<IOutputResponse>;
    /** Fetch OutputResponse from provided OutputIds (requests are sent in parallel) */
    getOutputs(outputIds: string[]): Promise<IOutputResponse[]>;
    /**
     * Generates a new mnemonic.
     */
    generateMnemonic(): Promise<string>;
    /**
     * Returns a hex encoded seed for a mnemonic.
     */
    mnemonicToHexSeed(mnemonic: string): Promise<string>;
    /** Generate addresses */
    generateAddresses(secretManager: SecretManager, generateAddressesOptions: IGenerateAddressesOptions): Promise<string[]>;
    /** Build and post a block */
    buildAndPostBlock(secretManager?: SecretManager, options?: IBuildBlockOptions): Promise<[BlockId, IBlock]>;
    /**
     * Returns tips that are ideal for attaching a block.
     * The tips can be considered as non-lazy and are therefore ideal for attaching a block.
     */
    getTips(): Promise<BlockId[]>;
    /**
     * Post block in JSON format, returns the block ID.
     */
    postBlock(block: IBlock): Promise<BlockId>;
    /**
     * Get block as JSON.
     */
    getBlock(blockId: BlockId): Promise<IBlock>;
    /**
     * Get block metadata.
     */
    getBlockMetadata(blockId: BlockId): Promise<IBlockMetadata>;
    /**
     * Find inputs from addresses for a provided amount (useful for offline signing)
     */
    findInputs(addresses: string[], amount: number): Promise<IUTXOInput[]>;
    /**
     * Find all outputs based on the requests criteria. This method will try to query multiple nodes if
     * the request amount exceeds individual node limit.
     */
    findOutputs(outputIds: string[], addresses: string[]): Promise<IOutputResponse[]>;
    /**
     * Get the status of a Ledger Nano
     */
    getLedgerNanoStatus(isSimulator: boolean): Promise<LedgerNanoStatus>;
    /**
     * Prepare a transaction for signing
     */
    prepareTransaction(secretManager?: SecretManager, options?: IBuildBlockOptions): Promise<IPreparedTransactionData>;
    /**
     * Store a mnemonic in the Stronghold vault
     */
    storeMnemonic(secretManager: SecretManager, mnemonic: string): Promise<void>;
    /**
     * Sign a transaction
     */
    signTransaction(secretManager: SecretManager, preparedTransactionData: IPreparedTransactionData): Promise<PayloadTypes>;
    /**
     * Submit a payload in a block
     */
    submitPayload(payload: PayloadTypes): Promise<IBlock>;
    /**
     * Returns a valid Address parsed from a String.
     */
    parseBech32Address(address: string): Promise<AddressTypes>;
    /**
     * Returns a block ID (Blake2b256 hash of the block bytes)
     */
    blockId(block: IBlock): Promise<BlockId>;
    /**
     * Get a node candidate from the synced node pool.
     */
    getNode(): Promise<INode>;
    /**
     * Get the network id of the node we're connecting to.
     */
    getNetworkId(): Promise<number>;
    /**
     * Returns the bech32_hrp.
     */
    getBech32Hrp(): Promise<string>;
    /**
     * Returns the min PoW score.
     */
    getMinPowScore(): Promise<number>;
    /**
     * Returns the tips interval.
     */
    getTipsInterval(): Promise<number>;
    /**
     * Returns if local pow should be used or not.
     */
    getLocalPow(): Promise<boolean>;
    /**
     * Get fallback to local proof of work timeout.
     */
    getFallbackToLocalPow(): Promise<boolean>;
    /**
     * Get health of node by input url.
     */
    getHealth(url: string): Promise<boolean>;
    /**
     * Get info of node with input url.
     */
    getNodeInfo(url: string, auth?: IAuth): Promise<INodeInfo>;
    /**
     * Get peers.
     */
    getPeers(): Promise<IPeer[]>;
    /**
     * Post block as raw bytes, returns the block ID.
     */
    postBlockRaw(block: IBlock): Promise<BlockId>;
    /**
     * Get block as raw bytes.
     */
    getBlockRaw(blockId: BlockId): Promise<number[]>;
    /**
     * Look up a milestone by a given milestone index.
     */
    getMilestoneById(milestoneId: string): Promise<IMilestonePayload>;
    /**
     * Returns all UTXO changes that happened at a specific milestone.
     */
    getUtxoChangesById(milestoneId: string): Promise<IMilestoneUtxoChangesResponse>;
    /**
     * Look up a milestone by a given milestone index.
     */
    getMilestoneByIndex(index: number): Promise<IMilestonePayload>;
    /**
     * Returns all UTXO changes that happened at a specific milestone.
     */
    getUtxoChangesByIndex(index: number): Promise<IMilestoneUtxoChangesResponse>;
    /**
     * Get receipts.
     */
    getReceipts(): Promise<IReceiptsResponse>;
    /**
     * Get the receipts by the given milestone index.
     */
    getReceiptsMigratedAt(milestoneIndex: number): Promise<IReceiptsResponse[]>;
    /**
     * Get the treasury output.
     */
    getTreasury(): Promise<ITreasury>;
    /**
     * Returns the included block of the transaction.
     */
    getIncludedBlock(transactionId: string): Promise<IBlock>;
    /**
     * Transforms bech32 to hex.
     */
    bech32ToHex(bech32: string): Promise<string>;
    /**
     * Transforms a hex encoded address to a bech32 encoded address.
     */
    hexToBech32(hex: string, bech32Hrp?: string): Promise<string>;
    /**
     * Transforms a hex encoded public key to a bech32 encoded address.
     */
    hexPublicKeyToBech32Address(hex: string, bech32Hrp?: string): Promise<string>;
    /**
     * Checks if a String is a valid bech32 encoded address.
     */
    isAddressValid(address: string): Promise<boolean>;
    /**
     * Fetch alias output IDs
     */
    aliasOutputIds(queryParameters: AliasQueryParameter[]): Promise<string[]>;
    /**
     * Fetch alias output ID
     */
    aliasOutputId(aliasId: string): Promise<string>;
    /**
     * Fetch NFT output IDs
     */
    nftOutputIds(queryParameters: NftQueryParameter[]): Promise<string[]>;
    /**
     * Fetch NFT output ID
     */
    nftOutputId(nftId: string): Promise<string>;
    /**
     * Fetch Foundry Output IDs
     */
    foundryOutputIds(queryParameters: FoundryQueryParameter[]): Promise<string[]>;
    /**
     * Fetch Foundry Output ID
     */
    foundryOutputId(foundryId: string): Promise<string>;
    /**
     * Try to get OutputResponse from provided OutputIds (requests are sent
     * in parallel and errors are ignored, can be useful for spent outputs)
     */
    tryGetOutputs(outputIds: string[]): Promise<IOutputResponse[]>;
    /**
     * Find all blocks by provided block IDs.
     */
    findBlocks(blockIds: BlockId[]): Promise<IBlock[]>;
    /**
     * Retries (promotes or reattaches) a block for provided block id. Block should be
     * retried only if they are valid and haven't been confirmed for a while.
     */
    retry(blockId: BlockId): Promise<[BlockId, IBlock]>;
    /**
     * Retries (promotes or reattaches) a block for provided block id until it's included (referenced by a
     * milestone). Default interval is 5 seconds and max attempts is 40. Returns the included block at first
     * position and additional reattached blocks
     */
    retryUntilIncluded(blockId: BlockId, interval?: number, maxAttempts?: number): Promise<[BlockId, IBlock][]>;
    /**
     * Function to consolidate all funds from a range of addresses to the address with the lowest index in that range
     * Returns the address to which the funds got consolidated, if any were available
     */
    consolidateFunds(secretManager: SecretManager, generateAddressesOptions: IGenerateAddressesOptions): Promise<string>;
    /**
     * Reattaches blocks for provided block id. Blocks can be reattached only if they are valid and haven't been
     * confirmed for a while.
     */
    reattach(blockId: BlockId): Promise<[BlockId, IBlock]>;
    /**
     * Reattach a block without checking if it should be reattached
     */
    reattachUnchecked(blockId: BlockId): Promise<[BlockId, IBlock]>;
    /**
     * Promotes a block. The method should validate if a promotion is necessary through get_block. If not, the
     * method should error out and should not allow unnecessary promotions.
     */
    promote(blockId: BlockId): Promise<[BlockId, IBlock]>;
    /**
     * Promote a block without checking if it should be promoted
     */
    promoteUnchecked(blockId: BlockId): Promise<[BlockId, IBlock]>;
    /**
     * Returns the unsynced nodes.
     */
    unsyncedNodes(): Promise<Set<INode>>;
    /**
     * Build a Basic Output.
     */
    buildBasicOutput(options: IBasicOutputBuilderOptions): Promise<IBasicOutput>;
    /**
     * Build an Alias Output.
     */
    buildAliasOutput(options: IAliasOutputBuilderOptions): Promise<IAliasOutput>;
    /**
     * Build a Foundry Output.
     */
    buildFoundryOutput(options: IFoundryOutputBuilderOptions): Promise<IFoundryOutput>;
    /**
     * Build an Nft Output.
     */
    buildNftOutput(options: INftOutputBuilderOptions): Promise<INftOutput>;
    listen(topics: string[], callback: (error: Error, result: string) => void): void;
}
