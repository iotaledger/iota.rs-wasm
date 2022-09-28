var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Copyright 2021-2022 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { MessageHandler } from './MessageHandler';
/** The Client to interact with nodes. */
var Client = /** @class */ (function () {
    function Client(options) {
        this.messageHandler = new MessageHandler(options);
    }
    /**
     * Returns the node information together with the url of the used node
     * @returns { Promise<INodeInfoWrapper> }.
     */
    Client.prototype.getInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetInfo'
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Gets the network related information such as network_id and min_pow_score
     */
    Client.prototype.getNetworkInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetNetworkInfo'
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /** Fetch basic output IDs based on query parameters */
    Client.prototype.basicOutputIds = function (queryParameters) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'BasicOutputIds',
                            data: {
                                queryParameters: queryParameters
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /** Get output from a known outputID */
    Client.prototype.getOutput = function (outputId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetOutput',
                            data: {
                                outputId: outputId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /** Fetch OutputResponse from provided OutputIds (requests are sent in parallel) */
    Client.prototype.getOutputs = function (outputIds) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetOutputs',
                            data: {
                                outputIds: outputIds
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Generates a new mnemonic.
     */
    Client.prototype.generateMnemonic = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GenerateMnemonic'
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Returns a hex encoded seed for a mnemonic.
     */
    Client.prototype.mnemonicToHexSeed = function (mnemonic) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'MnemonicToHexSeed',
                            data: {
                                mnemonic: mnemonic
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /** Generate addresses */
    Client.prototype.generateAddresses = function (secretManager, generateAddressesOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GenerateAddresses',
                            data: {
                                secretManager: secretManager,
                                options: generateAddressesOptions
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /** Build and post a block */
    Client.prototype.buildAndPostBlock = function (secretManager, options) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'BuildAndPostBlock',
                            data: {
                                secretManager: secretManager,
                                options: options
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Returns tips that are ideal for attaching a block.
     * The tips can be considered as non-lazy and are therefore ideal for attaching a block.
     */
    Client.prototype.getTips = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetTips'
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Post block in JSON format, returns the block ID.
     */
    Client.prototype.postBlock = function (block) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'PostBlock',
                            data: {
                                block: block
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Get block as JSON.
     */
    Client.prototype.getBlock = function (blockId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetBlock',
                            data: {
                                blockId: blockId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Get block metadata.
     */
    Client.prototype.getBlockMetadata = function (blockId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetBlockMetadata',
                            data: {
                                blockId: blockId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Find inputs from addresses for a provided amount (useful for offline signing)
     */
    Client.prototype.findInputs = function (addresses, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'FindInputs',
                            data: {
                                addresses: addresses,
                                amount: amount
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Find all outputs based on the requests criteria. This method will try to query multiple nodes if
     * the request amount exceeds individual node limit.
     */
    Client.prototype.findOutputs = function (outputIds, addresses) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'FindOutputs',
                            data: {
                                outputIds: outputIds,
                                addresses: addresses
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Get the status of a Ledger Nano
     */
    Client.prototype.getLedgerNanoStatus = function (isSimulator) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetLedgerNanoStatus',
                            data: {
                                isSimulator: isSimulator
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Prepare a transaction for signing
     */
    Client.prototype.prepareTransaction = function (secretManager, options) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'PrepareTransaction',
                            data: {
                                secretManager: secretManager,
                                options: options
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Store a mnemonic in the Stronghold vault
     */
    Client.prototype.storeMnemonic = function (secretManager, mnemonic) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'StoreMnemonic',
                            data: {
                                secretManager: secretManager,
                                mnemonic: mnemonic
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Sign a transaction
     */
    Client.prototype.signTransaction = function (secretManager, preparedTransactionData) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'SignTransaction',
                            data: {
                                secretManager: secretManager,
                                preparedTransactionData: preparedTransactionData
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Submit a payload in a block
     */
    Client.prototype.submitPayload = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'SubmitPayload',
                            data: {
                                payload: payload
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Returns a valid Address parsed from a String.
     */
    Client.prototype.parseBech32Address = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'ParseBech32Address',
                            data: {
                                address: address
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Returns a block ID (Blake2b256 hash of the block bytes)
     */
    Client.prototype.blockId = function (block) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'BlockId',
                            data: {
                                block: block
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Get a node candidate from the synced node pool.
     */
    Client.prototype.getNode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetNode'
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Get the network id of the node we're connecting to.
     */
    Client.prototype.getNetworkId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetNetworkId'
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Returns the bech32_hrp.
     */
    Client.prototype.getBech32Hrp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetBech32Hrp'
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Returns the min PoW score.
     */
    Client.prototype.getMinPowScore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetMinPowScore'
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Returns the tips interval.
     */
    Client.prototype.getTipsInterval = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetTipsInterval'
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Returns if local pow should be used or not.
     */
    Client.prototype.getLocalPow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetLocalPow'
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Get fallback to local proof of work timeout.
     */
    Client.prototype.getFallbackToLocalPow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetFallbackToLocalPow'
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Get health of node by input url.
     */
    Client.prototype.getHealth = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetHealth',
                            data: {
                                url: url
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Get info of node with input url.
     */
    Client.prototype.getNodeInfo = function (url, auth) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetNodeInfo',
                            data: {
                                url: url,
                                auth: auth
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Get peers.
     */
    Client.prototype.getPeers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetPeers'
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Post block as raw bytes, returns the block ID.
     */
    Client.prototype.postBlockRaw = function (block) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'PostBlockRaw',
                            data: {
                                block: block
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Get block as raw bytes.
     */
    Client.prototype.getBlockRaw = function (blockId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetBlockRaw',
                            data: {
                                blockId: blockId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Look up a milestone by a given milestone index.
     */
    Client.prototype.getMilestoneById = function (milestoneId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetMilestoneById',
                            data: {
                                milestoneId: milestoneId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Returns all UTXO changes that happened at a specific milestone.
     */
    Client.prototype.getUtxoChangesById = function (milestoneId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetUtxoChangesById',
                            data: {
                                milestoneId: milestoneId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Look up a milestone by a given milestone index.
     */
    Client.prototype.getMilestoneByIndex = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetMilestoneByIndex',
                            data: {
                                index: index
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Returns all UTXO changes that happened at a specific milestone.
     */
    Client.prototype.getUtxoChangesByIndex = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetUtxoChangesByIndex',
                            data: {
                                index: index
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Get receipts.
     */
    Client.prototype.getReceipts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetReceipts'
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Get the receipts by the given milestone index.
     */
    Client.prototype.getReceiptsMigratedAt = function (milestoneIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetReceiptsMigratedAt',
                            data: {
                                milestoneIndex: milestoneIndex
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Get the treasury output.
     */
    Client.prototype.getTreasury = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetTreasury'
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Returns the included block of the transaction.
     */
    Client.prototype.getIncludedBlock = function (transactionId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'GetIncludedBlock',
                            data: {
                                transactionId: transactionId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Transforms bech32 to hex.
     */
    Client.prototype.bech32ToHex = function (bech32) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'Bech32ToHex',
                            data: {
                                bech32: bech32
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Transforms a hex encoded address to a bech32 encoded address.
     */
    Client.prototype.hexToBech32 = function (hex, bech32Hrp) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'HexToBech32',
                            data: {
                                hex: hex,
                                bech32Hrp: bech32Hrp
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Transforms a hex encoded public key to a bech32 encoded address.
     */
    Client.prototype.hexPublicKeyToBech32Address = function (hex, bech32Hrp) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'HexPublicKeyToBech32Address',
                            data: {
                                hex: hex,
                                bech32Hrp: bech32Hrp
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Checks if a String is a valid bech32 encoded address.
     */
    Client.prototype.isAddressValid = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'IsAddressValid',
                            data: {
                                address: address
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Fetch alias output IDs
     */
    Client.prototype.aliasOutputIds = function (queryParameters) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'AliasOutputIds',
                            data: {
                                queryParameters: queryParameters
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Fetch alias output ID
     */
    Client.prototype.aliasOutputId = function (aliasId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'AliasOutputId',
                            data: {
                                aliasId: aliasId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Fetch NFT output IDs
     */
    Client.prototype.nftOutputIds = function (queryParameters) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'NftOutputIds',
                            data: {
                                queryParameters: queryParameters
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Fetch NFT output ID
     */
    Client.prototype.nftOutputId = function (nftId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'NftOutputId',
                            data: {
                                nftId: nftId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Fetch Foundry Output IDs
     */
    Client.prototype.foundryOutputIds = function (queryParameters) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'FoundryOutputIds',
                            data: {
                                queryParameters: queryParameters
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Fetch Foundry Output ID
     */
    Client.prototype.foundryOutputId = function (foundryId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'FoundryOutputId',
                            data: {
                                foundryId: foundryId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Try to get OutputResponse from provided OutputIds (requests are sent
     * in parallel and errors are ignored, can be useful for spent outputs)
     */
    Client.prototype.tryGetOutputs = function (outputIds) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'TryGetOutputs',
                            data: {
                                outputIds: outputIds
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Find all blocks by provided block IDs.
     */
    Client.prototype.findBlocks = function (blockIds) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'FindBlocks',
                            data: {
                                blockIds: blockIds
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Retries (promotes or reattaches) a block for provided block id. Block should be
     * retried only if they are valid and haven't been confirmed for a while.
     */
    Client.prototype.retry = function (blockId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'Retry',
                            data: {
                                blockId: blockId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Retries (promotes or reattaches) a block for provided block id until it's included (referenced by a
     * milestone). Default interval is 5 seconds and max attempts is 40. Returns the included block at first
     * position and additional reattached blocks
     */
    Client.prototype.retryUntilIncluded = function (blockId, interval, maxAttempts) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'RetryUntilIncluded',
                            data: {
                                blockId: blockId,
                                interval: interval,
                                maxAttempts: maxAttempts
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Function to consolidate all funds from a range of addresses to the address with the lowest index in that range
     * Returns the address to which the funds got consolidated, if any were available
     */
    Client.prototype.consolidateFunds = function (secretManager, generateAddressesOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'ConsolidateFunds',
                            data: {
                                secretManager: secretManager,
                                generateAddressesOptions: generateAddressesOptions
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Reattaches blocks for provided block id. Blocks can be reattached only if they are valid and haven't been
     * confirmed for a while.
     */
    Client.prototype.reattach = function (blockId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'Reattach',
                            data: {
                                blockId: blockId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Reattach a block without checking if it should be reattached
     */
    Client.prototype.reattachUnchecked = function (blockId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'ReattachUnchecked',
                            data: {
                                blockId: blockId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Promotes a block. The method should validate if a promotion is necessary through get_block. If not, the
     * method should error out and should not allow unnecessary promotions.
     */
    Client.prototype.promote = function (blockId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'Promote',
                            data: {
                                blockId: blockId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Promote a block without checking if it should be promoted
     */
    Client.prototype.promoteUnchecked = function (blockId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'PromoteUnchecked',
                            data: {
                                blockId: blockId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Returns the unsynced nodes.
     */
    Client.prototype.unsyncedNodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'UnsyncedNodes'
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Build a Basic Output.
     */
    Client.prototype.buildBasicOutput = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'BuildBasicOutput',
                            data: options
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Build an Alias Output.
     */
    Client.prototype.buildAliasOutput = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'BuildAliasOutput',
                            data: options
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Build a Foundry Output.
     */
    Client.prototype.buildFoundryOutput = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'BuildFoundryOutput',
                            data: options
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    /**
     * Build an Nft Output.
     */
    Client.prototype.buildNftOutput = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageHandler.sendMessage({
                            name: 'BuildNftOutput',
                            data: options
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, JSON.parse(response).payload];
                }
            });
        });
    };
    // MQTT
    Client.prototype.listen = function (topics, callback) {
        return this.messageHandler.listen(topics, callback);
    };
    return Client;
}());
export { Client };
//# sourceMappingURL=Client.js.map