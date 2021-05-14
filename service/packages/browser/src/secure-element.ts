import {safeParseJson} from '@lunasec/services-common/build/utils/json';
import {StyleInfo} from '@lunasec/secure-frame-common/build/main/style-patcher/types';
import {patchStyle} from '@lunasec/secure-frame-common/build/main/style-patcher/write';
import {detokenize, notifyParentOfEvent, listenForRPCMessages} from './rpc';
import {__SECURE_FRAME_URL__} from "../../../../sdks/packages/secure-frame/common";
import {AttributesMessage} from "../../../../sdks/packages/secure-frame/common/src/rpc/types";
// import { GenericIframeElement } from './generic-iframe-element'

interface ElementTypes {
    input: HTMLInputElement,
    span: HTMLSpanElement
}

type SupportedElement<t extends keyof ElementTypes> = ElementTypes[t]


export class SecureElement<e extends keyof ElementTypes> {
    secureElement: SupportedElement<e>;
    elementType: keyof ElementTypes;
    loadingText: string;
    frameNonce: string;
    origin: string;
    initialized: boolean;

    constructor(elementName: keyof ElementTypes) {
        this.initialized = false;
        this.elementType = elementName;

        const body = document.getElementsByTagName("BODY")[0];
        const secureElement = document.createElement(elementName);
        secureElement.className = 'secure-input d-none';
        body.appendChild(secureElement);
        this.secureElement = secureElement;

        this.loadingText = document.querySelector('.loading-text') as Element;

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

        listenForRPCMessages(this.origin, (attrs) => {this.setAttributesFromRPC(attrs)});
        notifyParentOfEvent('NotifyOnStart', this.origin, this.frameNonce);
    }

    // Set up the iframe attributes, used on both page load and on any subsequent changes
    setAttributesFromRPC(attrs: AttributesMessage) {
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

        if (attrs.type) {
            this.secureElement.setAttribute('type', attrs.type);
        }

        if (attrs.token) {
            detokenize(attrs.token).then((value) => {
                if (value){
                    if ()
                    this.secureElement.value = value;
                }
                return;
            })
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

