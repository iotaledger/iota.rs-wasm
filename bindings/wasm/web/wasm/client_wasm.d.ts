/* tslint:disable */
/* eslint-disable */
/**
* Initializes the console error panic hook for better panic messages.
*/
export function start(): void;
/**
* The Wasm bindings do not support internal logging yet.
*
* Calling this is a no-op, only included for compatibility
* with the Neon Node.js bindings TypeScript definitions.
* @param {any} _config
*/
export function initLogger(_config: any): void;
/**
* Creates a message handler with the given client options.
* @param {string | undefined} clientOptions
* @returns {MessageHandler}
*/
export function messageHandlerNew(clientOptions?: string): MessageHandler;
/**
* Handles a message, returns the response as a JSON-encoded string.
*
* Returns an error if the reponse itself is an error or panic.
* @param {string} message
* @param {MessageHandler} messageHandler
* @returns {Promise<string>}
*/
export function sendMessageAsync(message: string, messageHandler: MessageHandler): Promise<string>;
/**
* MQTT is not supported for WebAssembly bindings.
*
* Throws an error if called, only included for compatibility
* with the Neon Node.js bindings TypeScript definitions.
* @param {string[]} _topics
* @param {Function} _callback
*/
export function listen(_topics: string[], _callback: Function): void;
/**
* The Client message handler.
*/
export class MessageHandler {
  free(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly start: () => void;
  readonly initLogger: (a: number) => void;
  readonly __wbg_messagehandler_free: (a: number) => void;
  readonly messageHandlerNew: (a: number, b: number, c: number) => void;
  readonly sendMessageAsync: (a: number, b: number, c: number, d: number) => void;
  readonly listen: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h0fc7c60353f2b48c: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd254ed860170ff00: (a: number, b: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h536a8ad284f720a0: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_start: () => void;
}

/**
* Synchronously compiles the given `bytes` and instantiates the WebAssembly module.
*
* @param {BufferSource} bytes
*
* @returns {InitOutput}
*/
export function initSync(bytes: BufferSource): InitOutput;

/**
* Loads the Wasm file so the lib can be used, relative path to Wasm file
* @param {string | undefined} path
*/
export function init(path?: string): Promise<void>;
