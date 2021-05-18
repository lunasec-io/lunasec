import {safeParseJson} from '@lunasec/services-common/build/utils/json';
import {StyleInfo} from '@lunasec/secure-frame-common/build/main/style-patcher/types';
import {patchStyle} from '@lunasec/secure-frame-common/build/main/style-patcher/write';
import {detokenize, notifyParentOfEvent, listenForRPCMessages} from './rpc';
import {__SECURE_FRAME_URL__} from "../../../../sdks/packages/secure-frame/common";
import {AttributesMessage} from "@lunasec/secure-frame-common/src/rpc/types";


class SecureInput {
  secureInput: HTMLInputElement;
  loadingText: Element;
  frameNonce: string;
  origin: string;
  initialized: boolean;

  constructor() {
    this.initialized = false;

    this.secureInput = document.querySelector('.secure-input') as HTMLInputElement;
    this.loadingText = document.querySelector('.loading-text') as Element;

    if (!this.secureInput || !this.loadingText) {
      throw new Error('Unable to select secure input node');
    }

    const searchParams = (new URL(document.location.href)).searchParams;


    const origin = searchParams.get('origin')
    if (!origin) {
      throw new Error('Unable to read origin of the parent page');
    }
    this.origin = origin

    const frameNonce = searchParams.get('n')
    if (!frameNonce) {
      throw new Error('Unable to read frame nonce of the parent page');
    }
    this.frameNonce = frameNonce

    if (!this.origin) {
      throw new Error('Unable to read origin data of parent frame');
    }

    listenForRPCMessages(this.origin, (attrs) => {void this.setAttributesFromRPC(attrs)});
    notifyParentOfEvent('NotifyOnStart', this.origin, this.frameNonce);
  }

  // Set up the iframe attributes, used on both page load and on any subsequent changes
  async setAttributesFromRPC(attrs: AttributesMessage) {
    // First time setup
    if (!this.initialized) {
      this.loadingText.classList.add('d-none');
      this.secureInput.classList.remove('d-none');
      if (!attrs.style) {
        throw new Error('Attribute frame message missing necessary style parameter for first time frame startup');
      }
    }

    if (attrs.style) {
      patchStyle(this.secureInput, safeParseJson<StyleInfo>(attrs.style));
    }

    if (attrs.type) {
      this.secureInput.setAttribute('type', attrs.type);
    }

    if (attrs.token) {
      this.secureInput.value = await detokenize(attrs.token)
    }

    this.attachOnBlurNotifier();
    this.initialized = true;
    return;
  }

  attachOnBlurNotifier() {
    this.secureInput.addEventListener('blur', () => {
      notifyParentOfEvent('NotifyOnBlur', this.origin, this.frameNonce);
    });
  }
}

new SecureInput();
