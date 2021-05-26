import {safeParseJson} from '@lunasec/services-common/build/utils/json';
import {StyleInfo} from "@lunasec/browser-common";
import {patchStyle} from"@lunasec/browser-common"
import {detokenize, notifyParentOfEvent, listenForRPCMessages} from './rpc';
import {__SECURE_FRAME_URL__} from "@lunasec/browser-common";
import {AttributesMessage} from "@lunasec/browser-common";
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
    private initialized = false;
    constructor(elementName: keyof ElementTypes, loadingText: Element) {
        this.elementType = elementName;
        this.loadingText = loadingText;
        this.secureElement = this.insertSecureElement(elementName);
        this.origin = this.getURLSearchParam('origin');
        this.frameNonce = this.getURLSearchParam('n');

        listenForRPCMessages(this.origin, (attrs) => {void this.setAttributesFromRPC(attrs)});
        notifyParentOfEvent('NotifyOnStart', this.origin, this.frameNonce);
    }

    insertSecureElement(elementName:keyof ElementTypes){
        const body = document.getElementsByTagName("BODY")[0];
        const secureElement = document.createElement(elementName);
        secureElement.className = 'secure-input d-none';
        body.appendChild(secureElement);
        return secureElement;
    }

    getURLSearchParam(paramName: string){
        const searchParams = (new URL(document.location.href)).searchParams;
        const param = searchParams.get(paramName)
        if(!param){
            throw new Error(`Missing parameter from iframe url ${paramName}`)
        }
        return param
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

