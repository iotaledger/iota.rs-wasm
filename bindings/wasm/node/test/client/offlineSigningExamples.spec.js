"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
require("../customMatchers");
require("dotenv/config");
const addresses_1 = require("../fixtures/addresses");
const signedTransactionJson = require("../fixtures/signedTransaction.json");
const onlineClient = new lib_1.Client({
    nodes: [
        {
            url: process.env.NODE_URL || 'http://localhost:14265',
        },
    ],
    localPow: true,
});
const offlineClient = new lib_1.Client({
    offline: true,
    nodes: [
        {
            url: process.env.NODE_URL || 'http://localhost:14265',
        },
    ],
    localPow: true,
});
const secretManager = {
    Mnemonic: 'endorse answer radar about source reunion marriage tag sausage weekend frost daring base attack because joke dream slender leisure group reason prepare broken river',
};
describe('Offline signing examples', () => {
    it('generates addresses offline', async () => {
        const addresses = await offlineClient.generateAddresses(secretManager, {
            range: {
                start: 0,
                end: 10,
            },
            bech32Hrp: lib_1.SHIMMER_TESTNET_BECH32_HRP,
        });
        expect(addresses.length).toBe(10);
        addresses.forEach((address) => {
            expect(address).toBeValidAddress();
        });
    });
    // transaction tests disabled for workflows, because they fail if we don't have funds
    it.skip('prepares and signs a transaction', async () => {
        const address = 'rms1qqv5avetndkxzgr3jtrswdtz5ze6mag20s0jdqvzk4fwezve8q9vkpnqlqe';
        const amount = 1000000;
        const inputs = await onlineClient.findInputs(addresses_1.addresses, amount);
        const preparedTransaction = await onlineClient.prepareTransaction(undefined, {
            inputs,
            output: { address, amount: amount.toString() },
        });
        expect(preparedTransaction.essence.type).toBe(1);
        const signedTransaction = await offlineClient.signTransaction(secretManager, 
        // Imported JSON is typed with literal types
        preparedTransaction);
        expect(signedTransaction.type).toBe(6);
    });
    // transaction tests disabled for workflows, because they fail if we don't have funds
    it.skip('sends a transaction', async () => {
        // Send block with the signed transaction as a payload
        const block = await onlineClient.submitPayload(
        // Imported JSON is typed with literal types
        signedTransactionJson);
        expect(block.payload).toBeDefined();
        const blockId = await onlineClient.blockId(block);
        expect(blockId).toBeValidBlockId;
    });
});
//# sourceMappingURL=offlineSigningExamples.spec.js.map