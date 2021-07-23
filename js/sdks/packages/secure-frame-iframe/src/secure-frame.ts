import { AttributesMessage, patchStyle, safeParseJson, StyleInfo, ValidatorName } from '@lunasec/browser-common';
import { ClassLookup, TagLookup } from '@lunasec/react-sdk';

import { initializeUploader } from './initialize-uploader';
import { iFrameRPC } from './rpc';
import { handleDownload } from './secure-download';
import { validate } from './validators';
export type SupportedElement = TagLookup[keyof TagLookup];

export function timeout(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Would be nice if class could take <element type parameter> but couldn't quite get it working
export class SecureFrame<E extends keyof ClassLookup> {
  private readonly componentName: E;
  private readonly loadingText: Element;
  private initialized = false;
  readonly frameNonce: string;
  readonly origin: string;
  readonly secureElement: HTMLElementTagNameMap[TagLookup[E]];
  readonly form: HTMLFormElement;
  private token?: string;
  private validatorName?: ValidatorName = undefined;
  public readonly rpc: iFrameRPC;

  constructor(componentName: E, loadingText: Element) {
    this.componentName = componentName;
    this.loadingText = loadingText;
    [this.secureElement, this.form] = this.insertSecureElement(componentName);
    this.origin = this.getURLSearchParam('origin');
    this.frameNonce = this.getURLSearchParam('n');
    this.rpc = new iFrameRPC(this.origin, { host: window.location.origin });
    this.startRPC();
  }

  startRPC() {
    this.rpc.listenForRPCMessages((attrs) => {
      void this.setAttributesFromRPC(attrs);
    });
    this.rpc.sendMessageToParentFrame({
      command: 'NotifyOnStart',
      data: {},
      frameNonce: this.frameNonce,
    });
  }

  insertSecureElement(elementName: E): [HTMLElementTagNameMap[TagLookup[E]], HTMLFormElement] {
    const body = document.getElementsByTagName('BODY')[0];
    const secureElement = document.createElement(elementName) as HTMLElementTagNameMap[TagLookup[E]];
    secureElement.className = 'secure-input d-none';

    const form = document.createElement('form');
    form.appendChild(secureElement);
    body.appendChild(form);
    return [secureElement, form];
  }

  getURLSearchParam(paramName: string) {
    const searchParams = new URL(document.location.href).searchParams;
    const param = searchParams.get(paramName);
    if (!param) {
      throw new Error(`Missing parameter from iframe url ${paramName}`);
    }
    return param;
  }

  // Set up the iframe attributes, used on both page load and on any subsequent changes
  async setAttributesFromRPC(attrs: AttributesMessage) {
    if (attrs.component !== this.componentName) {
      throw new Error(
        'Received an attribute message with a different componentName than the iframe was initialized with'
      );
    }
    // First time setup
    if (!this.initialized) {
      this.loadingText.classList.add('d-none');
      this.secureElement.classList.remove('d-none');
      if (!attrs.style) {
        throw new Error(
          `Attribute frame message missing necessary style parameter for first time frame startup.  Component: ${attrs.component}`
        );
      }

      if (attrs.component === 'Uploader') {
        initializeUploader(this, attrs.fileTokens || []);
      }

      if (attrs.component === 'Input' || attrs.component === 'TextArea') {
        this.attachOnBlurNotifier();
        this.attachOnSubmitNotifier();
      }

      if (attrs.component === 'Input' && attrs.validator) {
        this.validatorName = attrs.validator;
        this.attachValidator();
      }
    }

    if (attrs.style) {
      patchStyle(this.secureElement, safeParseJson<StyleInfo>(attrs.style));
    }

    if (attrs.component === 'Input') {
      if (attrs.type) {
        this.secureElement.setAttribute('type', attrs.type);
      }
      if (attrs.placeholder) {
        this.secureElement.setAttribute('placeholder', attrs.placeholder);
      }
    }

    if (attrs.token && attrs.token !== this.token) {
      this.token = attrs.token;
      await this.handleToken(attrs.token, attrs);
    }

    if (!this.initialized) {
      this.rpc.sendMessageToParentFrame({
        command: 'NotifyOnFullyLoaded',
        data: {},
        frameNonce: this.frameNonce,
      });
    }
    this.initialized = true;

    return;
  }

  // TODO: This is getting pretty branchy.  Considering a different architecture where each element type is a separate webpack entrypoint with shared logic from a /common.ts module
  async handleToken(token: string, attrs: AttributesMessage) {
    if (attrs.component === 'Downloader') {
      // Figure out why this type casting is necessary
      try {
        await handleDownload(token, this.secureElement as HTMLAnchorElement, attrs.hidden || false);
      } catch (e) {
        // TODO: Make this less ugly (it's blue atm and garbage lol)
        this.secureElement.textContent = 'Error: Missing File';
      }
    } else {
      const value = await this.rpc.detokenize(token);
      if (attrs.component === 'Input') {
        const input = this.secureElement as HTMLInputElement;
        input.value = value;
      }
      if (attrs.component === 'Paragraph' || attrs.component === 'TextArea') {
        this.secureElement.textContent = value;
      }
    }
  }

  attachOnBlurNotifier() {
    this.secureElement.addEventListener('blur', () => {
      this.rpc.sendMessageToParentFrame({ command: 'NotifyOnBlur', frameNonce: this.frameNonce, data: {} });
    });
  }

  attachValidator() {
    if (!this.secureElement.isConnected) {
      throw new Error('Attempted to attach validator to an unmounted secure element');
    }

    this.secureElement.addEventListener('blur', () => {
      this.sendValidationMessage();
    });
  }

  sendValidationMessage() {
    if (!this.validatorName) {
      throw new Error('Attempted to do validation but the validator name wasnt assigned');
    }
    const isValid = validate(this.validatorName, (this.secureElement as HTMLInputElement).value);
    this.rpc.sendMessageToParentFrame({
      command: 'NotifyOnValidate',
      frameNonce: this.frameNonce,
      data: { isValid },
    });
  }

  attachOnSubmitNotifier() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (this.validatorName) {
        this.sendValidationMessage();
        await timeout(50);
      }
      this.rpc.sendMessageToParentFrame({ command: 'NotifyOnSubmit', frameNonce: this.frameNonce, data: {} });
    });
  }
}
