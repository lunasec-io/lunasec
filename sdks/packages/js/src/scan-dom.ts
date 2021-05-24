import { generateSecureNonce, getStyleInfo } from '@lunasec/common';

export function queryDomForForms(domInstance: Document) {
  const secureFrameInputNodes = domInstance.querySelectorAll('form.secure-frame-form input');

  const secureInputElements = Array.prototype.slice.apply(secureFrameInputNodes);

  // Holds all input elements temporarily
  const containerDiv = domInstance.createElement('div');

  secureInputElements.forEach((input) => {
    containerDiv.appendChild(input);
  });

  // console.log(secureInputElements);
  // console.log(containerDiv.innerHTML);
}

function validateElementAsSecureTarget(record: MutationRecord) {
  if (!record.target) {
    console.error('Unable to check DOM Observation element');
    return null;
  }

  const element = record.target as Element;

  if (!element.classList) {
    console.warn('DOM mutation of element without classList');
    return null;
  }

  if (!element.classList.contains('secure-frame-form')) {
    return null;
  }

  return element;
}

type SecureFormInputConfig = {
  readonly formElement: Element;
  readonly children: readonly HTMLInputElement[];
};

export function setupElementWithSecureFrame(domInstance: Document, frameUrl: string, input: HTMLInputElement) {
  const containerNonce = generateSecureNonce();

  const container = domInstance.createElement('span');
  container.setAttribute('data-secure-frame-nonce', containerNonce);

  const secureFrameForm = domInstance.createElement('iframe');

  secureFrameForm.src = frameUrl + '?n=' + containerNonce;
  secureFrameForm.setAttribute('frameBorder', '0');

  if (!input.parentElement) {
    console.error('Invalid element without parent attempted to have secure frame attached');
    return;
  }

  // @ts-ignore
  window.SECURE_FORM_ORIGINAL_ELEMENTS = window.SECURE_FORM_ORIGINAL_ELEMENTS || {};

  // @ts-ignore
  window.SECURE_FORM_ORIGINAL_ELEMENTS[containerNonce] = getStyleInfo(input);

  container.appendChild(secureFrameForm);

  input.replaceWith(container);

  // TODO: Get element size and styling, pass that into the secure frame
}

export function createDomWatcher(domInstance: Document, frameUrl: string, rootRecord: Node) {
  const config: MutationObserverInit = {
    subtree: true,
    childList: true,
    attributes: true,
  };

  function domCallback(mutations: readonly MutationRecord[], observer: MutationObserver) {
    if (!observer) {
      return;
    }

    // TODO: Hook callback to unwrap token values.

    const secureForms = mutations
      .filter((record) => record.type === 'childList')
      .reduce((inputs, record) => {
        const element = validateElementAsSecureTarget(record);

        if (!element) {
          return inputs;
        }

        const elementsToSecure = element.querySelectorAll('input[type="text"]');

        inputs.push({
          formElement: element,
          children: Array.from(elementsToSecure),
        });

        return inputs;
      }, [] as SecureFormInputConfig[]); //eslint-disable-line

    if (secureForms.length === 0) {
      return;
    }

    secureForms.map((config) => {
      config.children.map((child) => setupElementWithSecureFrame(domInstance, frameUrl, child));
      return true;
    });
  }

  const observer = new MutationObserver(domCallback);

  observer.observe(rootRecord, config);

  return observer;
}
