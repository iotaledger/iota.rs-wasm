/** Secret manager that uses a Ledger Nano hardware wallet or Speculos simulator. */
export interface LedgerNanoSecretManager {
    /** boolean indicates whether it's a simulator or not. */
    LedgerNano: boolean;
}
/** Secret manager that uses only a mnemonic. */
export interface MnemonicSecretManager {
    Mnemonic: string;
}
/** Secret manager that uses Stronghold. */
export interface StrongholdSecretManager {
    Stronghold: {
        password?: string;
        snapshotPath: string;
    };
}
/** Supported secret managers */
export declare type SecretManager = LedgerNanoSecretManager | MnemonicSecretManager | StrongholdSecretManager;
