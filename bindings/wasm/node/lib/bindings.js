"use strict";
// Copyright 2021-2022 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.messageHandlerNew = exports.sendMessageAsync = exports.initLogger = void 0;
// This file overwrites the `bindings.ts` file from `bindings/nodejs/lib`, to link the Wasm `MessageHandler` interface.
// The rest of the TypeScript definitions are copied as-is to the `out` directory before being compiled.
// @ts-ignore: path is set to match runtime transpiled js path when bundled.
const client_wasm_1 = require("../wasm/client_wasm");
Object.defineProperty(exports, "initLogger", { enumerable: true, get: function () { return client_wasm_1.initLogger; } });
Object.defineProperty(exports, "sendMessageAsync", { enumerable: true, get: function () { return client_wasm_1.sendMessageAsync; } });
Object.defineProperty(exports, "messageHandlerNew", { enumerable: true, get: function () { return client_wasm_1.messageHandlerNew; } });
Object.defineProperty(exports, "listen", { enumerable: true, get: function () { return client_wasm_1.listen; } });
//# sourceMappingURL=bindings.js.map