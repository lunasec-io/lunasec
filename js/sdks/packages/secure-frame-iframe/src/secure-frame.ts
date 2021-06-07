import { AttributesMessage, patchStyle, safeParseJson, StyleInfo } from '@lunasec/browser-common';
import { AllowedElements } from '@lunasec/react-sdk';

import { initializeUploader } from './initialize-uploader';
import { detokenize, listenForRPCMessages, notifyParentOfEvent } from './rpc';
import { handleDownload } from './secure-download';
export type SupportedElement = AllowedElements[keyof AllowedElements];

// Would be nice if class could take <element type parameter> but couldn't quite get it working
export class SecureFrame<e extends keyof AllowedElements> {
  private readonly elementType: e;
  private readonly loadingText: Element;
  private initialized = false;
  readonly frameNonce: string;
  readonly origin: string;
  readonly secureElement: AllowedElements[e];

  constructor(elementType: e, loadingText: Element) {
    this.elementType = elementType;
    this.loadingText = loadingText;
    this.secureElement = this.insertSecureElement(elementType);
    this.origin = this.getURLSearchParam('origin');
    this.frameNonce = this.getURLSearchParam('n');
    listenForRPCMessages(this.origin, (attrs) => {
      void this.setAttributesFromRPC(attrs);
    });
    notifyParentOfEvent('NotifyOnStart', this.origin, this.frameNonce, {});
  }

  insertSecureElement(elementName: e) {
    const body = document.getElementsByTagName('BODY')[0];
    const secureElement = document.createElement(elementName);
    secureElement.className = 'secure-input d-none';
    body.appendChild(secureElement);
    return secureElement;
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
    // First time setup
    if (!this.initialized) {
      this.loadingText.classList.add('d-none');
      this.secureElement.classList.remove('d-none');
      if (!attrs.style) {
        console.error('Attribute frame message missing necessary style parameter for first time frame startup', attrs);
        return;
      }
    }

    if (attrs.style) {
      patchStyle(this.secureElement, safeParseJson<StyleInfo>(attrs.style));
    }

    if (attrs.type && this.elementType === 'input') {
      this.secureElement.setAttribute('type', attrs.type);
    }

    if (this.elementType === 'input' && attrs.type === 'file' && attrs.fileTokens) {
      initializeUploader(this, attrs.fileTokens);
    } else if (attrs.token) {
      await this.handleToken(attrs.token, attrs);
    }

    if (this.elementType === 'input') {
      this.attachOnBlurNotifier();
    }

    this.initialized = true;
    return;
  }

  // TODO: This is getting pretty branchy.  Considering a different architecture where each element type is a separate webpack entrypoint with shared logic from a /common.ts module
  async handleToken(token: string, attrs: AttributesMessage) {
    if (this.elementType === 'a') {
      // anchor elements mean we are doing an s3 secure download
      // Figure out why this type casting is necessary
      await handleDownload(token, this.secureElement as HTMLAnchorElement, attrs.hidden || false);
    } else {
      const value = await detokenize(token);
      if (this.elementType === 'input' || this.elementType === 'textarea') {
        const input = this.secureElement as HTMLInputElement;
        input.value = value;
      }
      if (this.elementType === 'span') {
        this.secureElement.textContent = value;
      }
    }
  }

  attachOnBlurNotifier() {
    this.secureElement.addEventListener('blur', () => {
      notifyParentOfEvent('NotifyOnBlur', this.origin, this.frameNonce, {});
    });
  }
}
