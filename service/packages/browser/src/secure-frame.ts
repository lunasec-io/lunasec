import {safeParseJson} from '@lunasec/services-common/build/utils/json';
import {StyleInfo} from '@lunasec/secure-frame-common/build/main/style-patcher/types';
import {patchStyle} from '@lunasec/secure-frame-common/build/main/style-patcher/write';
import {detokenize, notifyParentOfEvent, listenForRPCMessages} from './rpc';
import {__SECURE_FRAME_URL__} from "../../../../sdks/packages/secure-frame/common";
import {AttributesMessage} from "../../../../sdks/packages/secure-frame/common/src/rpc/types";
// import { GenericIframeElement } from './generic-iframe-element'

export interface ElementTypes {
    input: HTMLInputElement,
    span: HTMLSpanElement,
    textarea: HTMLTextAreaElement
}

export type SupportedElement = ElementTypes[keyof ElementTypes]

// Would be nice if class could take <element type parameter> but couldn't quite get it working
export class SecureFrame {

    private readonly secureElement: SupportedElement;
    private readonly elementType: keyof ElementTypes;
    private readonly loadingText: Element;
    private readonly frameNonce: string;
    private readonly origin: string;
    private initialized: boolean;
    constructor(elementName: keyof ElementTypes, loadingText: Element) {
        this.initialized = false;
        this.elementType = elementName;
        this.loadingText = loadingText;
        const body = document.getElementsByTagName("BODY")[0];
        const secureElement = document.createElement(elementName);
        secureElement.className = 'secure-input d-none';
        body.appendChild(secureElement);
        this.secureElement = secureElement;


        if (!this.secureElement || !this.loadingText) {
            throw new Error('Unable to select secure input node');
        }

        const searchParams = (new URL(document.location.href)).searchParams;

        this.origin = searchParams.get('origin') as string;
        if (!searchParams.get('origin')) {
            throw new Error('Unable to read origin of the parent page');
        }

        this.frameNonce = searchParams.get('n') as string;
        if (!this.frameNonce) {
            throw new Error('Unable to read frame nonce of the parent page');
        }

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

        if (attrs.token) {
            const value = await detokenize(attrs.token)
            if (this.elementType === 'input' || this.elementType ==='textarea'){
                const input = this.secureElement as HTMLInputElement
                input.value = value;
            }
            if (this.elementType === 'span'){
                this.secureElement.textContent = value;
            }
        }
        if (this.elementType === 'input'){
            this.attachOnBlurNotifier();
        }
        this.initialized = true;
        return;
    }

    attachOnBlurNotifier() {
        this.secureElement.addEventListener('blur', () => {
            notifyParentOfEvent('NotifyOnBlur', this.origin, this.frameNonce);
        });
    }
}

