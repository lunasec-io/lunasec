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
import {
  AttributesMessage,
  FrameMessage,
  FrameNotification,
  InboundFrameMessageMap,
  safeParseJson,
  UnknownFrameMessage,
} from '@lunasec/browser-common';

// returns an empty string if the field is empty, so be careful with boolean coercion like `if(token)`
type tokenCallback = () => Promise<string | null>;

export class iFrameRPC {
  origin: string;
  getTokenFromFrame: tokenCallback;

  constructor(origin: string, getTokenFromFrame: tokenCallback) {
    this.origin = origin;

    this.getTokenFromFrame = getTokenFromFrame;
  }

  createMessageToFrame<K extends keyof InboundFrameMessageMap>(
    s: K,
    correlationToken: string,
    createMessage: () => InboundFrameMessageMap[K]
  ): FrameMessage<InboundFrameMessageMap, K> {
    const innerMessage = createMessage();

    return {
      command: s,
      correlationToken: correlationToken,
      data: innerMessage,
    };
  }

  sendMessageToParentFrame(message: UnknownFrameMessage | FrameNotification) {
    window.parent.postMessage(JSON.stringify(message), this.origin);
  }

  respondWithTokenizedValue(rawMessage: UnknownFrameMessage, token: string | null) {
    const message = this.createMessageToFrame('ReceiveCommittedToken', rawMessage.correlationToken, () => {
      if (!token && token !== '') {
        return {
          success: false,
          error: 'tokenizer failed to tokenize data',
        };
      }

      return {
        success: true,
        token: token,
      };
    });

    this.sendMessageToParentFrame(message);
    return;
  }

  // Just tell the outside app that we got the message, kind of boilerplate
  respondAttributesReceived(rawMessage: UnknownFrameMessage) {
    const message = this.createMessageToFrame('ReceiveAttributesConfirmation', rawMessage.correlationToken, () => {
      return {
        success: true,
      };
    });
    this.sendMessageToParentFrame(message);
    return;
  }

  async processMessage(rawMessage: UnknownFrameMessage, updateAttrCallback: (m: AttributesMessage) => void) {
    // TODO: Make this type safe (require every message to be handled)
    if (rawMessage.command === 'CommitToken') {
      const token = await this.getTokenFromFrame(); // This will send an error notification if there is any issue
      this.respondWithTokenizedValue(rawMessage, token);
      return;
    }
    if (rawMessage.command === 'Attributes') {
      updateAttrCallback(rawMessage.data as AttributesMessage);
      this.respondAttributesReceived(rawMessage);
      return;
    }

    throw new Error('Secure frame unable to process message of command type: ' + rawMessage.command);
  }

  // TODO: Passing a callback here that only gets called in certain situations kind of stinks
  listenForRPCMessages(updateAttrCallback: (m: AttributesMessage) => void) {
    window.addEventListener('message', (event) => {
      // TODO: Is this a security problem?
      if (this.origin !== event.origin) {
        console.log('rejected origin', event.origin, origin);
        return;
      }

      const rawMessage = safeParseJson<UnknownFrameMessage>(event.data);
      if (!rawMessage) {
        console.error('Invalid message received by secure frame.');
        return;
      }
      void this.processMessage(rawMessage, updateAttrCallback);
    });
  }
}
