interface CustomMatchers<R = unknown> {
    toBeValidAddress(): R;
    toBeValidBlockId(): R;
    toBeValidOutputId(): R;
}
declare global {
    namespace jest {
        interface Expect extends CustomMatchers {
        }
        interface Matchers<R> extends CustomMatchers<R> {
        }
        interface InverseAsymmetricMatchers extends CustomMatchers {
        }
    }
}
export {};
