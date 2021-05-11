import {safeParseJson} from '@lunasec/services-common/build/utils/json';
import {UnknownFrameMessage} from '@lunasec/secure-frame-common/build/main/rpc/types';
import {StyleInfo} from '@lunasec/secure-frame-common/build/main/style-patcher/types';
import {patchStyle} from '@lunasec/secure-frame-common/build/main/style-patcher/write';
import {notifyParentOfOnBlurEvent, processMessage} from './rpc';

/**
 * Sends a message whenever an "on blur" event occurs (when the user clicks away from the secure frame).
 * @param origin Target origin to send the request to.
 * @param frameNonce Nonce of the current iframe.
 * @param inputElement The input element to attach the blur event listener to.
 */
function attachOnBlurNotifier(origin: string, frameNonce: string, inputElement: HTMLInputElement) {
  inputElement.addEventListener('blur', () => {
    notifyParentOfOnBlurEvent(origin, frameNonce);
  });
}

function setupPage(origin: string, frameNonce: string, secureInput: Element, loadingText: Element) {
  loadingText.classList.add('d-none');
  secureInput.classList.remove('d-none');

  if (window.location.hash && window.location.hash !== '') {
    const stylingInfo = safeParseJson<StyleInfo>(decodeURIComponent(window.location.hash).substring(1));

    // TODO: Add schema validation to JSON
    if (stylingInfo !== null) {
      patchStyle(secureInput as HTMLElement, stylingInfo);
    }
  }

  const URLParams = new URLSearchParams(window.location.search);
  const typeParam = URLParams.get('type');

  if (typeParam) {
    secureInput.setAttribute('type', typeParam);
  }

  attachOnBlurNotifier(origin, frameNonce, secureInput as HTMLInputElement);

  return secureInput;
}


/**
 * This code runs in the context of the secure frame origin and handles passing RPC back/forth between origins.
 */
async function onLoad() {
  const secureInput = document.querySelector('.secure-input');
  const loadingText = document.querySelector('.loading-text');

  if (!secureInput || !loadingText) {
    throw new Error('Unable to select secure input node');
  }

  const origin = secureInput.getAttribute('data-origin');

  if (!origin) {
    throw new Error('Unable to read origin of the parent page');
  }

  const frameNonce = secureInput.getAttribute('data-nonce');

  if (!frameNonce) {
    throw new Error('Unable to read frame nonce of the parent page');
  }

  // TODO: Create a class that holds origin and frameNonce so that we don't have to pass them down the call tree.
  setupPage(origin, frameNonce, secureInput, loadingText);

  if (!origin) {
    throw new Error('Unable to read origin data of parent frame');
  }

  window.addEventListener('message', (event) => {

    // TODO: Is this a security problem?
    if (!origin.startsWith(event.origin + '/')) {
      console.log('rejected origin', event.origin, origin);
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
