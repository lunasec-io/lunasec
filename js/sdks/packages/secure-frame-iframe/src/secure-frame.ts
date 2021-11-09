/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { AttributesMessage, patchStyle, safeParseJson, StyleInfo, ValidatorName } from '@lunasec/browser-common';
import { LunaSecError } from '@lunasec/isomorphic-common';
import { ClassLookup, TagLookup } from '@lunasec/react-sdk';
import { Tokenizer } from '@lunasec/tokenizer-sdk';

import { initializeUploader } from './initialize-uploader';
import { iFrameRPC } from './rpc';
import { handleDownload } from './secure-download';
import { validate } from './validators';

export type SupportedElement = TagLookup[keyof TagLookup];

declare global {
  interface Window {
    LUNASEC_BACKEND_URL: string;
  }
}

type CustomMetadata = Record<string, unknown>;
export function timeout(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const componentNameToElementMap: TagLookup = {
  Paragraph: 'p',
  Downloader: 'a',
  Uploader: 'input',
  TextArea: 'textarea',
  Input: 'input',
};

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
  readonly tokenizer: Tokenizer;
  public readonly rpc: iFrameRPC;
  public customMetadata?: CustomMetadata;

  constructor(componentName: E, loadingText: Element) {
    this.componentName = componentName;
    this.loadingText = loadingText;
    [this.secureElement, this.form] = this.insertSecureElement(componentName);
    this.origin = this.getURLSearchParam('origin');
    this.frameNonce = this.getURLSearchParam('n');
    this.tokenizer = new Tokenizer({ host: window.LUNASEC_BACKEND_URL || window.location.origin, lockToSession: true });
    this.rpc = new iFrameRPC(this.origin, () => this.tokenizeField());
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
    console.log('sent start notification');
  }

  insertSecureElement(componentName: E): [HTMLElementTagNameMap[TagLookup[E]], HTMLFormElement] {
    const body = document.getElementsByTagName('BODY')[0];
    const elementName = componentNameToElementMap[componentName];
    const secureElement = document.createElement(elementName);
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
    // end first time setup

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

    if ('customMetadata' in attrs && attrs.customMetadata) {
      this.customMetadata = attrs.customMetadata;
    }

    if ('token' in attrs && attrs.token && attrs.token !== this.token) {
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
        await handleDownload(token, this.secureElement as HTMLAnchorElement, this.tokenizer, attrs.hidden || false);
      } catch (e) {
        if (e instanceof LunaSecError) {
          return this.sendErrorMessage(e);
        }
        if (e instanceof Error) {
          return this.sendErrorMessage(new LunaSecError(e));
        }
        throw e;
      }
    } else {
      const value = await this.detokenize(token); // handles errors
      if (!value) {
        return;
      }
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

  handleError(e: LunaSecError | Error | unknown) {
    // I'd like to do this check inside the LunaSecError class but this works for now
    if (e instanceof LunaSecError) {
      this.sendErrorMessage(e);
    }
    if (e instanceof Error) {
      this.sendErrorMessage(new LunaSecError(e));
      console.error('Caught a raw error in iframe: ', e);
    }
    throw e;
  }

  sendErrorMessage(e: LunaSecError) {
    this.rpc.sendMessageToParentFrame({
      command: 'NotifyOnError',
      frameNonce: this.frameNonce,
      data: e, // should call toJSON nicely and then we reconstruct the error on the other end
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

  async tokenizeField(): Promise<string | null> {
    const value = (this.secureElement as HTMLInputElement).value;
    if (value.length === 0) {
      return '';
    }

    const res = await this.tokenizer.tokenize(value, { dataType: 'string', customFields: this.customMetadata });

    if (!res.success) {
      this.sendErrorMessage(res.error);
      return null;
    }
    this.token = res.tokenId;
    return res.tokenId;
  }

  async detokenize(token: string) {
    const res = await this.tokenizer.detokenize(token);
    if (!res.success) {
      return this.sendErrorMessage(res.error);
    }
    return res.value;
  }
}
