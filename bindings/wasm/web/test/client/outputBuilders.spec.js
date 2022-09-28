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
import { Client } from '../../lib';
import '../customMatchers';
import 'dotenv/config';
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
describe.skip('Output builder methods', function () {
    it('builds a basic output', function () { return __awaiter(void 0, void 0, void 0, function () {
        var addresses, hexAddress, basicOutput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.generateAddresses(secretManager, {
                        range: {
                            start: 0,
                            end: 1
                        }
                    })];
                case 1:
                    addresses = _a.sent();
                    return [4 /*yield*/, client.bech32ToHex(addresses[0])];
                case 2:
                    hexAddress = _a.sent();
                    return [4 /*yield*/, client.buildBasicOutput({
                            amount: '1000000',
                            unlockConditions: [
                                {
                                    type: 0,
                                    address: {
                                        type: 0,
                                        pubKeyHash: hexAddress
                                    }
                                },
                            ]
                        })];
                case 3:
                    basicOutput = _a.sent();
                    expect(basicOutput).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('builds an alias output', function () { return __awaiter(void 0, void 0, void 0, function () {
        var addresses, hexAddress, aliasId, aliasOutput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.generateAddresses(secretManager, {
                        range: {
                            start: 0,
                            end: 1
                        }
                    })];
                case 1:
                    addresses = _a.sent();
                    return [4 /*yield*/, client.bech32ToHex(addresses[0])];
                case 2:
                    hexAddress = _a.sent();
                    aliasId = '0xa5c28d5baa951de05e375fb19134ea51a918f03acc2d0cee011a42b298d3effa';
                    return [4 /*yield*/, client.buildAliasOutput({
                            aliasId: aliasId,
                            unlockConditions: [
                                {
                                    type: 4,
                                    address: {
                                        type: 0,
                                        pubKeyHash: hexAddress
                                    }
                                },
                                {
                                    type: 5,
                                    address: {
                                        type: 0,
                                        pubKeyHash: hexAddress
                                    }
                                },
                            ]
                        })];
                case 3:
                    aliasOutput = _a.sent();
                    expect(aliasOutput).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('builds a foundry output', function () { return __awaiter(void 0, void 0, void 0, function () {
        var aliasId, foundryOutput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    aliasId = '0xa5c28d5baa951de05e375fb19134ea51a918f03acc2d0cee011a42b298d3effa';
                    return [4 /*yield*/, client.buildFoundryOutput({
                            serialNumber: 1,
                            nativeTokens: [
                                {
                                    id: '0x081e6439529b020328c08224b43172f282cb16649d50c891fa156365323667e47a0100000000',
                                    amount: '0x32'
                                },
                            ],
                            tokenScheme: {
                                type: 0,
                                meltedTokens: '0x0',
                                mintedTokens: '0x32',
                                maximumSupply: '0x64'
                            },
                            unlockConditions: [
                                {
                                    type: 6,
                                    address: {
                                        type: 8,
                                        aliasId: aliasId
                                    }
                                },
                            ]
                        })];
                case 1:
                    foundryOutput = _a.sent();
                    expect(foundryOutput).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('builds an nft output', function () { return __awaiter(void 0, void 0, void 0, function () {
        var addresses, hexAddress, nftOutput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.generateAddresses(secretManager, {
                        range: {
                            start: 0,
                            end: 1
                        }
                    })];
                case 1:
                    addresses = _a.sent();
                    return [4 /*yield*/, client.bech32ToHex(addresses[0])];
                case 2:
                    hexAddress = _a.sent();
                    return [4 /*yield*/, client.buildNftOutput({
                            nftId: '0x7ffec9e1233204d9c6dce6812b1539ee96af691ca2e4d9065daa85907d33e5d3',
                            unlockConditions: [
                                {
                                    type: 0,
                                    address: {
                                        type: 0,
                                        pubKeyHash: hexAddress
                                    }
                                },
                            ]
                        })];
                case 3:
                    nftOutput = _a.sent();
                    expect(nftOutput).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=outputBuilders.spec.js.map