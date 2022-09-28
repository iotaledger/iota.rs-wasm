import { printExpected, printReceived, matcherHint } from 'jest-matcher-utils';
var failMessage = function (received, length, prefix, not) { return function () {
    return "".concat(matcherHint("".concat(not ? '.not' : '', ".toHaveLengthAndPrefix"), 'received', 'length, prefix'), "\nExpected").concat(not ? ' not' : '', ":\n  length: ").concat(printExpected(length), "\n  prefix: ").concat(printExpected(prefix), "\nReceived: \n  length: ").concat(printReceived(received.length), "\n  prefix: ").concat(printReceived(received.slice(0, prefix.length)));
}; };
var idMatcher = function (received, length, prefix) {
    var pass = received.length === length && received.startsWith(prefix);
    return {
        message: failMessage(received, length, prefix, pass),
        pass: pass
    };
};
expect.extend({
    toBeValidAddress: function (received) {
        return idMatcher(received, 63, 'rms');
    },
    toBeValidBlockId: function (received) {
        return idMatcher(received, 66, '0x');
    },
    toBeValidOutputId: function (received) {
        return idMatcher(received, 70, '0x');
    }
});
//# sourceMappingURL=customMatchers.js.map