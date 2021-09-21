/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
// import {patchStyle} from '../style-patcher/write';
import { safeParseJson } from '../utils/json';

import { UnknownFrameMessage } from './types';

/**
 * The goal of this function is to receive RPC calls from the secure frame.
 * @param window Browser `window` instance.
 * @param domInstance Browser `document` instance.
//  DEPRECATED, LEFT HERE FOR JS-SDK */
export function addMessageListener(window: Window, domInstance: Document) {
  const __SECURE_FRAME_URL__ = 'DEPRECATED, THIS WILL BE BROKEN';
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
