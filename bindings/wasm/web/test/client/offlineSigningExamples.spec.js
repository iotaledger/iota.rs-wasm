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
import { Client, SHIMMER_TESTNET_BECH32_HRP } from '../../lib';
import '../customMatchers';
import 'dotenv/config';
import { addresses } from '../fixtures/addresses';
import * as signedTransactionJson from '../fixtures/signedTransaction.json';
var onlineClient = new Client({
    nodes: [
        {
            url: process.env.NODE_URL || 'http://localhost:14265'
        },
    ],
    localPow: true
});
var offlineClient = new Client({
    offline: true,
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
describe('Offline signing examples', function () {
    it('generates addresses offline', function () { return __awaiter(void 0, void 0, void 0, function () {
        var addresses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, offlineClient.generateAddresses(secretManager, {
                        range: {
                            start: 0,
                            end: 10
                        },
                        bech32Hrp: SHIMMER_TESTNET_BECH32_HRP
                    })];
                case 1:
                    addresses = _a.sent();
                    expect(addresses.length).toBe(10);
                    addresses.forEach(function (address) {
                        expect(address).toBeValidAddress();
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    // transaction tests disabled for workflows, because they fail if we don't have funds
    it.skip('prepares and signs a transaction', function () { return __awaiter(void 0, void 0, void 0, function () {
        var address, amount, inputs, preparedTransaction, signedTransaction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    address = 'rms1qqv5avetndkxzgr3jtrswdtz5ze6mag20s0jdqvzk4fwezve8q9vkpnqlqe';
                    amount = 1000000;
                    return [4 /*yield*/, onlineClient.findInputs(addresses, amount)];
                case 1:
                    inputs = _a.sent();
                    return [4 /*yield*/, onlineClient.prepareTransaction(undefined, {
                            inputs: inputs,
                            output: { address: address, amount: amount.toString() }
                        })];
                case 2:
                    preparedTransaction = _a.sent();
                    expect(preparedTransaction.essence.type).toBe(1);
                    return [4 /*yield*/, offlineClient.signTransaction(secretManager, 
                        // Imported JSON is typed with literal types
                        preparedTransaction)];
                case 3:
                    signedTransaction = _a.sent();
                    expect(signedTransaction.type).toBe(6);
                    return [2 /*return*/];
            }
        });
    }); });
    // transaction tests disabled for workflows, because they fail if we don't have funds
    it.skip('sends a transaction', function () { return __awaiter(void 0, void 0, void 0, function () {
        var block, blockId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, onlineClient.submitPayload(
                    // Imported JSON is typed with literal types
                    signedTransactionJson)];
                case 1:
                    block = _a.sent();
                    expect(block.payload).toBeDefined();
                    return [4 /*yield*/, onlineClient.blockId(block)];
                case 2:
                    blockId = _a.sent();
                    expect(blockId).toBeValidBlockId;
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=offlineSigningExamples.spec.js.map