import {
  AttributesMessage,
  FrameMessage,
  FrameNotification,
  InboundFrameMessageMap,
  safeParseJson,
  UnknownFrameMessage,
} from '@lunasec/browser-common';
import { Tokenizer } from '@lunasec/tokenizer-sdk';

import { TokenizerClientConfig } from '../../../tokenizer-sdk/src';

export class iFrameRPC {
  tokenizer: Tokenizer;
  origin: string;

  constructor(origin: string, tokenizerConfig?: Partial<TokenizerClientConfig>) {
    this.origin = origin;
    this.tokenizer = new Tokenizer(tokenizerConfig);
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

  async tokenizeField(): Promise<string | null> {
    // TODO: this is brittle, move this into the secure-frame control logic
    const secureInput = document.querySelector('.secure-input');

    if (!secureInput) {
      throw new Error('Unable to read value to tokenize');
    }
    const value = (secureInput as HTMLInputElement).value;
    if (value.length > 0) {
      const resp = await this.tokenizer.tokenize(value, { dataType: 'string' });

      if (!resp.success) {
        console.error('tokenizer error:', resp);
        return null;
      }
      return resp.tokenId;
    } else {
      return '';
    }
  }

  async detokenize(token: string) {
    const resp = await this.tokenizer.detokenize(token);
    if (!resp.success) {
      throw resp.error;
    }
    return resp.value;
  }

  sendMessageToParentFrame(message: UnknownFrameMessage | FrameNotification) {
    window.parent.postMessage(JSON.stringify(message), this.origin);
  }

  respondWithTokenizedValue(rawMessage: UnknownFrameMessage, token: string | null): void {
    const message = this.createMessageToFrame('ReceiveCommittedToken', rawMessage.correlationToken, () => {
      if (token === null) {
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
  respondAttributesReceived(rawMessage: UnknownFrameMessage): void {
    const message = this.createMessageToFrame('ReceiveAttributesConfirmation', rawMessage.correlationToken, () => {
      return {
        success: true,
      };
    });
    this.sendMessageToParentFrame(message);
    return;
  }

  async processMessage(rawMessage: UnknownFrameMessage, updateAttrCallback: (m: AttributesMessage) => any) {
    // TODO: Make this type safe (require every message to be handled)
    if (rawMessage.command === 'CommitToken') {
      const serverResponse = await this.tokenizeField();
      this.respondWithTokenizedValue(rawMessage, serverResponse);
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
  listenForRPCMessages(updateAttrCallback: (m: AttributesMessage) => any) {
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
