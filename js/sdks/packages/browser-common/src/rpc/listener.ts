// import {patchStyle} from '../style-patcher/write';
import { safeParseJson } from '../utils/json';

import { UnknownFrameMessage } from './types';

export function addJsEventListener(
  window: Window,
  lunaSecDomain: string,
  callback: (message: UnknownFrameMessage) => void
): void {
  window.addEventListener('message', (event) => {
    if (event.origin !== lunaSecDomain) {
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
  lunaSecDomain: string,
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
      if (event.origin !== lunaSecDomain) {
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
