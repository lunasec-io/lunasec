import { UnknownFrameMessage } from './types';
/**
 * The goal of this function is to receive RPC calls from the secure frame.
 * @param window Browser `window` instance.
 * @param domInstance Browser `document` instance.
 */
export declare function addMessageListener(window: Window, domInstance: Document): void;
export declare function addReactEventListener(window: Window, controller: AbortController, callback: (message: UnknownFrameMessage) => void): AbortSignal;
//# sourceMappingURL=listener.d.ts.map