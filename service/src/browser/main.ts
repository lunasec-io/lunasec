import {FrameMessage, InboundFrameMessageMap, patchStyle, StyleInfo, UnknownFrameMessage} from '@esluna/browser-sdk';
import {safeParseJson} from '../common/utils/json';

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

function processMessage(origin: string, rawMessage: UnknownFrameMessage) {

  // TODO: Make this type safe (require every message to be handled)
  if (rawMessage.command === 'CommitToken') {
    const message = createMessageToFrame('ReceiveCommittedToken', rawMessage.correlationToken, () => {
      return {
        token: 'some-public-token'
      };
    });

    window.parent.postMessage(JSON.stringify(message), origin);
    return;
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
