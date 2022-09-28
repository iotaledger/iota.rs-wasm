"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_matcher_utils_1 = require("jest-matcher-utils");
const failMessage = (received, length, prefix, not) => () => `${(0, jest_matcher_utils_1.matcherHint)(`${not ? '.not' : ''}.toHaveLengthAndPrefix`, 'received', 'length, prefix')}
Expected${not ? ' not' : ''}:
  length: ${(0, jest_matcher_utils_1.printExpected)(length)}
  prefix: ${(0, jest_matcher_utils_1.printExpected)(prefix)}
Received: 
  length: ${(0, jest_matcher_utils_1.printReceived)(received.length)}
  prefix: ${(0, jest_matcher_utils_1.printReceived)(received.slice(0, prefix.length))}`;
const idMatcher = (received, length, prefix) => {
    const pass = received.length === length && received.startsWith(prefix);
    return {
        message: failMessage(received, length, prefix, pass),
        pass,
    };
};
expect.extend({
    toBeValidAddress(received) {
        return idMatcher(received, 63, 'rms');
    },
    toBeValidBlockId(received) {
        return idMatcher(received, 66, '0x');
    },
    toBeValidOutputId(received) {
        return idMatcher(received, 70, '0x');
    },
});
//# sourceMappingURL=customMatchers.js.map