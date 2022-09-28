export var IOTA_BECH32_HRP = 'iota';
export var IOTA_TESTNET_BECH32_HRP = 'atoi';
export var SHIMMER_BECH32_HRP = 'smr';
export var SHIMMER_TESTNET_BECH32_HRP = 'rms';
/** BIP44 Coin Types for IOTA and Shimmer. */
export var CoinType;
(function (CoinType) {
    CoinType[CoinType["IOTA"] = 4218] = "IOTA";
    CoinType[CoinType["Shimmer"] = 4219] = "Shimmer";
})(CoinType || (CoinType = {}));
//# sourceMappingURL=constants.js.map