import {safeParseJson} from '@lunasec/services-common/build/utils/json';
import {UnknownFrameMessage} from '@lunasec/secure-frame-common/build/main/rpc/types';
import {StyleInfo} from '@lunasec/secure-frame-common/build/main/style-patcher/types';
import {patchStyle} from '@lunasec/secure-frame-common/build/main/style-patcher/write';
import {processMessage} from './rpc';

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

  const URLParams = new URLSearchParams(window.location.search);
  const typeParam = URLParams.get('type');

  if (typeParam) {
    secureInput.setAttribute('type', typeParam);
  }

  // attachOnBlurNotifier(secureInput as HTMLInputElement);

  return secureInput;
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
