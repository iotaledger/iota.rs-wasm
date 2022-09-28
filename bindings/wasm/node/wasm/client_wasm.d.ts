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
