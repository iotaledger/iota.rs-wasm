"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
require("../customMatchers");
require("dotenv/config");
const offlineClient = new lib_1.Client({
    offline: true,
    nodes: [
        {
            url: 'http://localhost:14265',
        },
    ],
    localPow: true,
});
describe('Client utility methods', () => {
    // Requires "stronghold" in cargo toml iota-client features
    it.skip('generates and stores mnemonic', async () => {
        const mnemonic = await offlineClient.generateMnemonic();
        const StrongholdSecretManager = {
            Stronghold: {
                password: 'some_hopefully_secure_password',
                snapshotPath: './stronghold',
            },
        };
        await expect(offlineClient.storeMnemonic(StrongholdSecretManager, mnemonic)).resolves.toBe(null);
    });
    it('converts address to hex and bech32', async () => {
        const address = 'rms1qpllaj0pyveqfkwxmnngz2c488hfdtmfrj3wfkgxtk4gtyrax0jaxzt70zy';
        const hexAddress = await offlineClient.bech32ToHex(address);
        expect(hexAddress.slice(0, 2)).toBe('0x');
        const bech32Address = await offlineClient.hexToBech32(hexAddress, 'rms');
        expect(bech32Address).toBe(address);
    });
    it('converts hex public key to bech32 address', async () => {
        const hexPublicKey = '0x2baaf3bca8ace9f862e60184bd3e79df25ff230f7eaaa4c7f03daa9833ba854a';
        const address = await offlineClient.hexPublicKeyToBech32Address(hexPublicKey, 'rms');
        expect(address).toBeValidAddress();
    });
    it('validates address', async () => {
        const address = 'rms1qpllaj0pyveqfkwxmnngz2c488hfdtmfrj3wfkgxtk4gtyrax0jaxzt70zy';
        const isAddressValid = await offlineClient.isAddressValid(address);
        expect(isAddressValid).toBeTruthy();
    });
});
//# sourceMappingURL=utilityMethods.spec.js.map