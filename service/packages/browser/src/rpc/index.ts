import {
  FrameMessage,
  InboundFrameMessageMap,
  UnknownFrameMessage
} from '@lunasec/secure-frame-common/build/main/rpc/types';
import {Tokenizer} from "@lunasec/tokenizer-sdk";

function createMessageToFrame<K extends keyof InboundFrameMessageMap>(s: K, nonce: string, createMessage: () => InboundFrameMessageMap[K]): FrameMessage<InboundFrameMessageMap, K> | null {

  const innerMessage = createMessage();

  if (innerMessage === null) {
    return null;
  }

  return {
    command: s,
    correlationToken: nonce,
    data: innerMessage
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
    console.error("tokenizer error:", resp);
    return null;
  }
  return resp.tokenId
}

function respondToMessage(origin: string, rawMessage: UnknownFrameMessage, token: string | null): void {
  const message = createMessageToFrame('ReceiveCommittedToken', rawMessage.correlationToken, () => {
    if (token === null) {
      return {
        success: false,
        error: "tokenizer failed to tokenize data"
      };
    }

    return {
      success: true,
      token: token
    };
  });

  window.parent.postMessage(JSON.stringify(message), origin);
  return;
}

export async function processMessage(origin: string, rawMessage: UnknownFrameMessage) {

  // TODO: Make this type safe (require every message to be handled)
  if (rawMessage.command === 'CommitToken') {
    const serverResponse = await tokenizeField();
    respondToMessage(origin, rawMessage, serverResponse);
    return;
  }

  throw new Error('Secure frame unable to process message of command type: ' + rawMessage.command);
}