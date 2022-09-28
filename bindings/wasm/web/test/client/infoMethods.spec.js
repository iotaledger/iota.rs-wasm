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
// Skip for CI
describe.skip('Client info methods', function () {
    it('gets a node candidate from the synced node pool', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nodeInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.getNode()];
                case 1:
                    nodeInfo = _a.sent();
                    expect(nodeInfo.disabled).not.toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets info about node by url', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nodeInfo, nodeInfoByUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.getNode()];
                case 1:
                    nodeInfo = _a.sent();
                    return [4 /*yield*/, client.getNodeInfo(nodeInfo.url)];
                case 2:
                    nodeInfoByUrl = _a.sent();
                    expect(nodeInfoByUrl).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets health of node with input url', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nodeInfo, nodeHealth;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.getNode()];
                case 1:
                    nodeInfo = _a.sent();
                    return [4 /*yield*/, client.getHealth(nodeInfo.url)];
                case 2:
                    nodeHealth = _a.sent();
                    expect(nodeHealth).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets the unsynced nodes', function () { return __awaiter(void 0, void 0, void 0, function () {
        var unsyncedNodes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.unsyncedNodes()];
                case 1:
                    unsyncedNodes = _a.sent();
                    expect(unsyncedNodes).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets tips', function () { return __awaiter(void 0, void 0, void 0, function () {
        var tips;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.getTips()];
                case 1:
                    tips = _a.sent();
                    expect(tips.length).toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets peers', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect(client.getPeers()).rejects.toMatch('missing or malformed jwt')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets networkInfo', function () { return __awaiter(void 0, void 0, void 0, function () {
        var networkInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.getNetworkInfo()];
                case 1:
                    networkInfo = _a.sent();
                    expect(networkInfo.localPow).toBeTruthy();
                    expect(networkInfo.minPowScore).toBe(1000);
                    expect(networkInfo.bech32Hrp).toBe('rms');
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets networkId', function () { return __awaiter(void 0, void 0, void 0, function () {
        var networkId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.getNetworkId()];
                case 1:
                    networkId = _a.sent();
                    expect(networkId).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets bech32Hrp', function () { return __awaiter(void 0, void 0, void 0, function () {
        var bech32Hrp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.getBech32Hrp()];
                case 1:
                    bech32Hrp = _a.sent();
                    expect(bech32Hrp).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets minimum PoW score', function () { return __awaiter(void 0, void 0, void 0, function () {
        var minPowScore;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.getMinPowScore()];
                case 1:
                    minPowScore = _a.sent();
                    expect(minPowScore).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets tips interval', function () { return __awaiter(void 0, void 0, void 0, function () {
        var tipsInterval;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.getTipsInterval()];
                case 1:
                    tipsInterval = _a.sent();
                    expect(tipsInterval).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets local PoW status', function () { return __awaiter(void 0, void 0, void 0, function () {
        var localPow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.getLocalPow()];
                case 1:
                    localPow = _a.sent();
                    expect(localPow).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets fallback to local PoW status', function () { return __awaiter(void 0, void 0, void 0, function () {
        var fallbackToLocalPow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.getFallbackToLocalPow()];
                case 1:
                    fallbackToLocalPow = _a.sent();
                    expect(fallbackToLocalPow).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=infoMethods.spec.js.map