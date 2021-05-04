import {
  FrameMessage,
  InboundFrameMessageMap,
  UnknownFrameMessage
} from '@lunasec/secure-frame-common/build/main/rpc/types';

interface TokenizerResponse {
  success: boolean,
  tokenId: string
  // and definitely other fields we don't access, assuming that's okay
}

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

async function tokenizeField(): Promise<any> {
  const secureInput = document.querySelector('.secure-input');

  if (!secureInput) {
    throw new Error('Unable to read value to tokenize');
  }

  // TODO: Move this info a function
  const rawResponse = await fetch('/tokenize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      value: (secureInput as HTMLInputElement).value
    })
  });

  // TODO: Handle error case
  return rawResponse.json();
}

function respondToMessage(origin: string, rawMessage: UnknownFrameMessage, response: TokenizerResponse): void {
  const message = createMessageToFrame('ReceiveCommittedToken', rawMessage.correlationToken, () => {
    if (!response || !response.success) {
      return {
        success: false
      };
    }

    return {
      success: true,
      token: response.tokenId
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