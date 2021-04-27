import {safeParseJson} from '@esluna/services-common/build/utils/json';
import {InboundFrameMessageMap, FrameMessage, UnknownFrameMessage} from '@esluna/secure-frame-common/build/main/rpc/types';
import {StyleInfo} from '@esluna/secure-frame-common/build/main/style-patcher/types';
import {patchStyle} from '@esluna/secure-frame-common/build/main/style-patcher/write';

interface tokenizerResponse {
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

function setupPage() {
  const secureInput = document.querySelector('.secure-input');
  const loadingText = document.querySelector('.loading-text');

  if (!secureInput || !loadingText) {
    throw new Error('Unable to select secure input node');
  }

  loadingText.classList.add('d-none');
  secureInput.classList.remove('d-none');

  if (window.location.hash && window.location.hash !== '') {
    const stylingInfo = safeParseJson<StyleInfo>(decodeURIComponent(window.location.hash).substring(1));

    // TODO: Add schema validation to JSON
    if (stylingInfo !== null) {
      patchStyle(secureInput as HTMLElement, stylingInfo);
    }
  }

  return secureInput;
}

async function tokenizeField() : Promise<any> {
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


function respondToMessage(origin: string, rawMessage: UnknownFrameMessage, response: tokenizerResponse) : void {
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

async function processMessage(origin: string, rawMessage: UnknownFrameMessage) {

  // TODO: Make this type safe (require every message to be handled)
  if (rawMessage.command === 'CommitToken') {
    const serverResponse = await tokenizeField()
    respondToMessage(origin, rawMessage, serverResponse)
  }

  if (rawMessage.command === 'Resize') {

  }

  throw new Error('Secure frame unable to process message of command type: ' + rawMessage.command);
}


/**
 * This code runs in the context of the secure frame origin and handles passing RPC back/forth between origins.
 */
function onLoad() {
  const secureInput = setupPage();

  const origin = secureInput.getAttribute('data-origin');

  if (!origin) {
    throw new Error('Unable to read origin data of parent frame');
  }

  window.addEventListener("message", (event) => {

    // TODO: Is this a security problem?
    if (!origin.startsWith(event.origin + '/')) {
      console.log('rejected origin', event.origin, origin)
      return;
    }

    const rawMessage = safeParseJson<UnknownFrameMessage>(event.data);

    if (!rawMessage) {
      console.error('Invalid message received by secure frame.');
      return;
    }

    processMessage(origin, rawMessage);
  });

  // window.parent.postMessage(nonce, origin);
}

onLoad();
