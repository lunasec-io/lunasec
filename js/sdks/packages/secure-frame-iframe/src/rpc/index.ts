import {
  AttributesMessage,
  FrameMessage,
  FrameNotification,
  InboundFrameMessageMap,
  safeParseJson,
  UnknownFrameMessage,
} from '@lunasec/browser-common';
import { Tokenizer } from '@lunasec/tokenizer-sdk';

// always a response to a message from outside
function createMessageToFrame<K extends keyof InboundFrameMessageMap>(
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

async function tokenizeField(): Promise<string | null> {
  const secureInput = document.querySelector('.secure-input');

  if (!secureInput) {
    throw new Error('Unable to read value to tokenize');
  }
  const value = (secureInput as HTMLInputElement).value;
  const tokenizer = new Tokenizer();
  const resp = await tokenizer.tokenize(value);

  if (!resp.success) {
    console.error('tokenizer error:', resp);
    return null;
  }
  return resp.tokenId;
}

export async function detokenize(token: string) {
  const tokenizer = new Tokenizer();
  const resp = await tokenizer.detokenize(token);
  if (!resp.success) {
    throw resp.error;
  }
  return resp.value;
}

export function sendMessageToParentFrame(origin: string, message: UnknownFrameMessage | FrameNotification) {
  window.parent.postMessage(JSON.stringify(message), origin);
}

export function respondWithTokenizedValue(origin: string, rawMessage: UnknownFrameMessage, token: string | null): void {
  const message = createMessageToFrame('ReceiveCommittedToken', rawMessage.correlationToken, () => {
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

  sendMessageToParentFrame(origin, message);
  return;
}

// Just tell the outside app that we got the message, kind of boilerplate
export function respondAttributesReceived(origin: string, rawMessage: UnknownFrameMessage): void {
  const message = createMessageToFrame('ReceiveAttributesConfirmation', rawMessage.correlationToken, () => {
    return {
      success: true,
    };
  });
  sendMessageToParentFrame(origin, message);
  return;
}

export async function processMessage(
  origin: string,
  rawMessage: UnknownFrameMessage,
  updateAttrCallback: (m: AttributesMessage) => any
) {
  // TODO: Make this type safe (require every message to be handled)
  if (rawMessage.command === 'CommitToken') {
    const serverResponse = await tokenizeField();
    respondWithTokenizedValue(origin, rawMessage, serverResponse);
    return;
  }
  if (rawMessage.command === 'Attributes') {
    updateAttrCallback(rawMessage.data as AttributesMessage);
    respondAttributesReceived(origin, rawMessage);
    return;
  }

  throw new Error('Secure frame unable to process message of command type: ' + rawMessage.command);
}

// TODO: Passing a callback here that only gets called in certain situations kind of stinks
export function listenForRPCMessages(origin: string, updateAttrCallback: (m: AttributesMessage) => any) {
  window.addEventListener('message', (event) => {
    // TODO: Is this a security problem?
    if (origin !== event.origin) {
      console.log('rejected origin', event.origin, origin);
      return;
    }

    const rawMessage = safeParseJson<UnknownFrameMessage>(event.data);
    if (!rawMessage) {
      console.error('Invalid message received by secure frame.');
      return;
    }
    void processMessage(origin, rawMessage, updateAttrCallback);
  });
}
