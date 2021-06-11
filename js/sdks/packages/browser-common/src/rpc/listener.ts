// import {patchStyle} from '../style-patcher/write';
import { __SECURE_FRAME_URL__ } from '../constants';
import { safeParseJson } from '../utils/json';

import { UnknownFrameMessage } from './types';

/**
 * The goal of this function is to receive RPC calls from the secure frame.
 * @param window Browser `window` instance.
 * @param domInstance Browser `document` instance.
 */
export function addMessageListener(window: Window, domInstance: Document) {
  window.addEventListener(
    'message',
    (event) => {
      if (event.origin !== __SECURE_FRAME_URL__) {
        return;
      }

      if (!event.source) {
        console.error('invalid source of event');
        return;
      }

      const secureContainer = domInstance.querySelector(`[data-secure-frame-nonce="${event.data}"]`);

      if (!secureContainer) {
        console.error('Unable to locate secure container with nonce:', event.data);
        return;
      }

      // @ts-ignore
      const inputElementStyle = window.SECURE_FORM_ORIGINAL_ELEMENTS[event.data]; // secureContainer.querySelector('input') as (HTMLElement | undefined);

      if (!inputElementStyle) {
        console.error('Unable to find child input element for container with nonce:', event.data);
        return;
      }

      const secureIframe = secureContainer.querySelector('iframe');

      if (!secureIframe) {
        console.error('Missing iframe in secure container');
        return;
      }

      // const styleInfo = getStyleInfo(inputElement);

      // patchStyle(domInstance, secureIframe, inputElementStyle);

      // @ts-ignore
      event.source.postMessage(inputElementStyle, event.origin);
    },
    false
  );
}

export function addJsEventListener(window: Window, callback: (message: UnknownFrameMessage) => void): void {
  window.addEventListener('message', (event) => {
    if (event.origin !== __SECURE_FRAME_URL__) {
      return;
    }

    const frameMessage = safeParseJson<UnknownFrameMessage>(event.data);

    // Invalid data passed from frame.
    if (frameMessage === null) {
      console.error('Frame message null:', frameMessage);
      return;
    }

    callback(frameMessage);
  });
}

export function addReactEventListener(
  window: Window,
  controller: AbortController,
  callback: (message: UnknownFrameMessage) => void
): AbortSignal {
  const abortSignal = controller.signal;

  // Note: The AbortSignal seems to be unknown to Typescript.
  // @ts-ignore
  const eventListenerOptions: AddEventListenerOptions = { signal: abortSignal };

  window.addEventListener(
    'message',
    (event) => {
      if (event.origin !== __SECURE_FRAME_URL__) {
        return;
      }

      const frameMessage = safeParseJson<UnknownFrameMessage>(event.data);

      // Invalid data passed from frame.
      if (frameMessage === null) {
        console.error('Frame message null:', frameMessage);
        return;
      }

      // Message is not for us
      // if (frameMessage.correlationToken !== token) {
      //   console.log('correlation token mismatch:', frameMessage.correlationToken, token);
      //   return;
      // }

      callback(frameMessage);
    },
    eventListenerOptions
  );

  return abortSignal;
}
