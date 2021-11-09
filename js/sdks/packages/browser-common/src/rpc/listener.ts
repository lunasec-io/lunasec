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

export function addEventListenerWithAbort(
  lunaSecDomain: string,
  window: Window,
  controller: AbortController,
  callback: (message: UnknownFrameMessage) => void
): AbortSignal {
  const abortSignal = controller.signal;

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
