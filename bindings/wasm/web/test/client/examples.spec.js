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
import { Client, utf8ToHex } from '../../lib';
import '../customMatchers';
import 'dotenv/config';
import * as addressOutputs from '../fixtures/addressOutputs.json';
var client = new Client({
    nodes: [
        {
            url: process.env.NODE_URL || 'http://localhost:14265'
        },
    ],
    localPow: true
});
var secretManager = {
    Mnemonic: 'endorse answer radar about source reunion marriage tag sausage weekend frost daring base attack because joke dream slender leisure group reason prepare broken river'
};
// Skip for CI
describe.skip('Main examples', function () {
    it('gets info about the node', function () { return __awaiter(void 0, void 0, void 0, function () {
        var info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.getInfo()];
                case 1:
                    info = _a.sent();
                    expect(info.nodeInfo.protocol.bech32Hrp).toBe('rms');
                    expect(info.nodeInfo.protocol.minPowScore).toBe(1000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('generates a mnemonic', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mnemonic;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.generateMnemonic()];
                case 1:
                    mnemonic = _a.sent();
                    expect(mnemonic).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('generates addresses', function () { return __awaiter(void 0, void 0, void 0, function () {
        var addresses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.generateAddresses(secretManager, {
                        accountIndex: 0,
                        range: {
                            start: 0,
                            end: 5
                        },
                        bech32Hrp: 'rms'
                    })];
                case 1:
                    addresses = _a.sent();
                    expect(addresses.length).toBe(5);
                    addresses.forEach(function (address) {
                        expect(address).toBeValidAddress();
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets address outputs', function () { return __awaiter(void 0, void 0, void 0, function () {
        var outputIds, addressOutputs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.basicOutputIds([
                        {
                            address: 'rms1qpllaj0pyveqfkwxmnngz2c488hfdtmfrj3wfkgxtk4gtyrax0jaxzt70zy'
                        },
                        { hasExpiration: false },
                        { hasTimelock: false },
                        { hasStorageDepositReturn: false },
                    ])];
                case 1:
                    outputIds = _a.sent();
                    outputIds.forEach(function (id) { return expect(id).toBeValidOutputId(); });
                    return [4 /*yield*/, client.getOutputs(outputIds)];
                case 2:
                    addressOutputs = _a.sent();
                    expect(addressOutputs).toBeDefined();
                    addressOutputs.forEach(function (output) {
                        expect(output.metadata.blockId).toBeValidBlockId();
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets the output of a known output ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var output;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.getOutput('0xc1d95ac9c8c0237c6929faf427556c3562055a7155c6d336ee7891691d5525c90100')];
                case 1:
                    output = _a.sent();
                    expect(output.metadata.blockId).toBeValidBlockId();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets the balance of an address', function () { return __awaiter(void 0, void 0, void 0, function () {
        var addresses, outputIds, addressOutputs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.generateAddresses(secretManager, {
                        accountIndex: 0,
                        range: {
                            start: 0,
                            end: 1
                        }
                    })];
                case 1:
                    addresses = _a.sent();
                    expect(addresses[0]).toBeValidAddress();
                    return [4 /*yield*/, client.basicOutputIds([
                            { address: addresses[0] },
                            { hasExpiration: false },
                            { hasTimelock: false },
                            { hasStorageDepositReturn: false },
                        ])];
                case 2:
                    outputIds = _a.sent();
                    outputIds.forEach(function (id) { return expect(id).toBeValidOutputId(); });
                    return [4 /*yield*/, client.getOutputs(outputIds)];
                case 3:
                    addressOutputs = _a.sent();
                    expect(addressOutputs).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('calculates the balance of an address', function () {
        var _a;
        var testOutputs = addressOutputs;
        // Calculate the total amount and native tokens
        var totalAmount = 0;
        var totalNativeTokens = {};
        for (var _i = 0, testOutputs_1 = testOutputs; _i < testOutputs_1.length; _i++) {
            var outputResponse = testOutputs_1[_i];
            var output = outputResponse['output'];
            if ('nativeTokens' in output) {
                (_a = output.nativeTokens) === null || _a === void 0 ? void 0 : _a.forEach(function (token) {
                    return (totalNativeTokens[token.id] =
                        (totalNativeTokens[token.id] || 0) +
                            parseInt(token.amount));
                });
            }
            totalAmount += parseInt(output.amount);
        }
        expect(totalAmount).toBe(1960954000);
        expect(Object.keys(totalNativeTokens).length).toBe(2);
        expect(Object.values(totalNativeTokens).reduce(function (acc, val) { return acc + val; })).toBe(200);
    });
    it('sends a block', function () { return __awaiter(void 0, void 0, void 0, function () {
        var blockIdAndBlock;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.buildAndPostBlock()];
                case 1:
                    blockIdAndBlock = _a.sent();
                    expect(blockIdAndBlock[0]).toBeValidBlockId();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets block data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var blockIdAndBlock, blockData, blockMetadata;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.buildAndPostBlock()];
                case 1:
                    blockIdAndBlock = _a.sent();
                    return [4 /*yield*/, client.getBlock(blockIdAndBlock[0])];
                case 2:
                    blockData = _a.sent();
                    return [4 /*yield*/, client.getBlockMetadata(blockIdAndBlock[0])];
                case 3:
                    blockMetadata = _a.sent();
                    expect(blockData).toStrictEqual(blockIdAndBlock[1]);
                    expect(blockMetadata.blockId).toBeValidBlockId();
                    return [2 /*return*/];
            }
        });
    }); });
    it('sends a block with a tagged data payload', function () { return __awaiter(void 0, void 0, void 0, function () {
        var blockIdAndBlock, fetchedBlock;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.buildAndPostBlock(secretManager, {
                        tag: utf8ToHex('Hello'),
                        data: utf8ToHex('Tangle')
                    })];
                case 1:
                    blockIdAndBlock = _a.sent();
                    return [4 /*yield*/, client.getBlock(blockIdAndBlock[0])];
                case 2:
                    fetchedBlock = _a.sent();
                    expect(fetchedBlock.payload).toStrictEqual({
                        type: 5,
                        tag: utf8ToHex('Hello'),
                        data: utf8ToHex('Tangle')
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('sends a transaction', function () { return __awaiter(void 0, void 0, void 0, function () {
        var addresses, blockIdAndBlock;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.generateAddresses(secretManager, {
                        range: {
                            start: 1,
                            end: 2
                        }
                    })];
                case 1:
                    addresses = _a.sent();
                    return [4 /*yield*/, client.buildAndPostBlock(secretManager, {
                            output: {
                                address: addresses[0],
                                amount: '1000000'
                            }
                        })];
                case 2:
                    blockIdAndBlock = _a.sent();
                    expect(blockIdAndBlock[0]).toBeValidBlockId();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=examples.spec.js.map