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
import {
  AttributesMessage,
  FrameMessenger,
  FrameNotification,
  generateSecureNonce,
  getStyleInfo,
  ReadElementStyle,
} from '@lunasec/browser-common';
import { CSSProperties, inject, onMounted, onUnmounted, reactive, Ref, ref } from 'vue';

import { LunaSecConfigProviderAttrs } from './secure-components/LunaSec-Config-Provider';
import { LunaSecSecureFormProviderAttrs } from './secure-components/Secure-Form';

/**
 * A bag of properties that get passed back to the Secure Component when it calls our setup function below
 * The object itself is not reactive, but note that we manually make the values reactive where needed
 */
export interface RenderData {
  shouldRenderFrame: Ref<boolean>;
  frameFullyLoaded: Ref<boolean>;
  clonedStyle: ReadElementStyle | Record<string | number, never>;
  dummyElementRef: Ref;
  dummyStyleRef: Ref;
  frameRef: Ref;
  containerStyle: CSSProperties;
  dummyElementStyle: CSSProperties;
  frameUrl: string;
}

/**
 * A callback passed in by the secure component to modify the style object however it needs to
 * Easier to have this logic passed in a callback than sorting out our render cycle and handling null refs and so-on in every component
 */
export type StyleCustomizer = (clonedStyle: ReadElementStyle) => ReadElementStyle;
export type AttributeCustomizer = (el: HTMLElement, attrs: { id: string; style: string }) => AttributesMessage;
export type SetValueCustomizer = (el: HTMLElement, token: string) => void;

export function setupSecureComponent(
  componentName: string,
  shouldSubmitTokens: boolean,
  styleCustomizer: StyleCustomizer,
  attributeCustomizer: AttributeCustomizer,
  setValueCustomizer: SetValueCustomizer
): RenderData {
  console.log('secure tools loading');
  // Get configuration from provider
  const confProvider = inject<LunaSecConfigProviderAttrs>('lunaSecConfig');
  if (!confProvider || !confProvider.lunaSecDomain) {
    throw new Error('Must register LunaSecConfigProvider above Secure Component');
  }

  const frameId = generateSecureNonce();
  const frameMessenger = new FrameMessenger(confProvider.lunaSecDomain, frameId, frameNotificationHandler);
  // Set up default reactive variables
  const shouldRenderFrame = ref(false);
  const frameFullyLoaded = ref(false);
  const dummyElementRef = ref<HTMLElement>();
  const dummyStyleRef = ref<HTMLElement>();
  const frameRef = ref<HTMLIFrameElement>();
  const clonedStyle = reactive({});

  const abortController = new AbortController();
  // todo: make being a form optional by providing a callback to trigger tokenization to the users
  const formProvider = inject<LunaSecSecureFormProviderAttrs>('lunaSecSecureForm');

  function frameNotificationHandler(notification: FrameNotification) {
    switch (notification.command) {
      case 'NotifyOnStart':
        console.log('secure tools got start msg');
        void sendIFrameAttributes();
        break;
      case 'NotifyOnToken':
        // if ('onTokenChange' in this.props && this.props.onTokenChange && 'token' in notification.data) {
        //   this.props.onTokenChange(notification.data.token);
        // }
        break;
      case 'NotifyOnFullyLoaded':
        frameFullyLoaded.value = true;
        break;
      case 'NotifyOnBlur':
        // this.blur();
        break;
      case 'NotifyOnValidate':
        // this.validationHandler(notification.data.isValid);
        break;
      case 'NotifyOnSubmit':
        if (!formProvider) {
          throw new Error('Submit event fired for secure element outside of Secure Form');
        }
        formProvider.triggerSubmit();
        break;
      case 'NotifyOnError':
        // this.props.errorHandler(new LunaSecError(notification.data)); // Call the application's provided error handler
        throw new Error(notification.data.toString());
      // break;
    }
  }

  function cloneStyle() {
    // Clones style from the styleRef if provided(like with input), otherwise use elementRef
    const styleElement = dummyStyleRef.value || dummyElementRef.value;
    if (!styleElement) {
      throw new Error('attempted to clone styles for element that didnt exist');
    }
    const clonedStyle = getStyleInfo(styleElement);
    if (!clonedStyle) {
      throw new Error('Attempted to build style for element but it wasnt populated yet');
    }
    delete clonedStyle.childStyle.style.display;
    return clonedStyle;
  }

  function generateIFrameAttributes(): AttributesMessage {
    // Build the style for the iframe
    const childStyle = JSON.stringify(cloneStyle().childStyle);
    const dummyElement = dummyElementRef.value;
    if (!dummyElement) {
      throw new Error('Attempted to generate iframe attributes for unmounted component');
    }
    // Todo: make setup function take an optional generic with a custom component name, so that this is dynamic enough for plugin use
    return attributeCustomizer(dummyElement, {
      id: frameId,
      style: childStyle,
    });

    // Pull from the "type" of an input element if we have one in our wrapped element
    // const dummyElement = this.dummyRef.current;
    // if ((attrs.component === 'Uploader' || attrs.component === 'Input') && dummyElement) {
    //   const inputType = dummyElement.getAttribute('type');
    //   if (inputType) {
    //     attrs.type = inputType;
    //   }
    // }

    // if (attrs.component === 'Uploader' || attrs.component === 'Input' || attrs.component === 'TextArea') {
    //   if ('customMetadata' in this.props) {
    //     attrs.customMetadata = this.props.customMetadata;
    //   }
    // }

    // if ('token' in this.props && 'fileTokens' in this.props) {
    //   throw new Error("Can't have both tokens and fileTokens specified in props");
    // }

    // if (attrs.component !== 'Uploader' && 'token' in this.props) {
    //   if (this.props.token !== this.lastTokenSent) {
    //     attrs.token = this.props.token;
    //     this.lastTokenSent = this.props.token;
    //   }
    // }

    // if (attrs.component === 'Uploader' && 'fileTokens' in this.props) {
    //   attrs.fileTokens = this.props.fileTokens;
    // }
    // if (attrs.component === 'Input' && 'placeholder' in this.props && this.props.placeholder) {
    //   attrs.placeholder = this.props.placeholder;
    // }

    // if ('validator' in this.props) {
    //   if (attrs.component !== 'Input') {
    //     throw new Error('Validators can only be set on SecureInputs');
    //   }
    //   if (!this.props.onValidate) {
    //     throw new Error(
    //       'Must pass onValidate() callback when a validator is specified.  Use the callback to block the form from submitting and display user feedback.'
    //     );
    //   }
    //   attrs.validator = this.props.validator;
    // }
  }

  // Give the iframe all the information it needs to exist when it wakes up
  async function sendIFrameAttributes() {
    const frameAttributes = generateIFrameAttributes();
    const message = frameMessenger.createMessageToFrame('Attributes', frameAttributes);
    if (!frameRef.value || !frameRef.value.contentWindow) {
      console.error('Frame not initialized for message sending');
      return;
    }
    await frameMessenger.sendMessageToFrameWithReply(frameRef.value.contentWindow, message);
    return;
  }

  function registerSubmitHandler() {
    if (!formProvider || !formProvider.tokenCommitCallbacks) {
      throw new Error('Attempted to register a submit handler for an element not wrapped in a secure form');
    }
    formProvider.tokenCommitCallbacks[frameId] = triggerTokenCommit;
  }

  function removeSubmitHandler() {
    if (!formProvider || !formProvider.tokenCommitCallbacks) {
      throw new Error('Attempted to remove a submit handler for an element not wrapped in a secure form');
    }
    delete formProvider.tokenCommitCallbacks[frameId];
  }

  async function triggerTokenCommit(): Promise<void> {
    if (!setValueCustomizer) {
      throw new Error('Token commit triggered for a secure element without a setValueCallback defined');
    }

    const message = frameMessenger.createMessageToFrame('CommitToken', {});

    const currentFrame = frameRef.value;
    if (!currentFrame || !currentFrame.contentWindow) {
      console.error('Attempted token commit for unmounted frame');
      return;
    }
    const response = await frameMessenger.sendMessageToFrameWithReply(currentFrame.contentWindow, message);

    // todo: improve this error handling to pass errors to the error handler prop
    if (!response) {
      return console.error('No response from frame for token commit');
    }
    if (!response.data.success) {
      return console.error('Tokenization failed: ', response.data.error);
    }
    if (response.data.token === undefined) {
      return console.error('Tokenization didnt return a token: ', response);
    }

    const dummyElement = dummyElementRef.value;
    if (!dummyElement) {
      throw new Error('Token Commit cant find dummy element to insert token into');
    }

    setValueCustomizer(dummyElement, response.data.token);

    // setNativeValue(componentName, currentDummy, response.data.token);
    // This timeout is an attempt to give the above events time to propagate and any user code time to execute,
    // like it would have in a normal form where the user pressed submit.  Yes, we are hacking hard now
    return new Promise((resolve) => {
      setTimeout(resolve, 5);
    });
  }

  onMounted(() => {
    const style = cloneStyle();
    console.log('cloned style is ', style);
    if (!style) {
      throw new Error('read null style from dummy element');
    }
    const customizedStyle = styleCustomizer(style);
    Object.assign(clonedStyle, customizedStyle); // Put the style into the reactive object
    frameMessenger.listen(window, abortController);

    shouldRenderFrame.value = true;

    if (shouldSubmitTokens) {
      registerSubmitHandler();
    }
    console.log('mounted hook complete, frame should render');
  });

  onUnmounted(() => {
    if (shouldSubmitTokens) {
      removeSubmitHandler();
    }
  });

  // some static styles all the Secure Elements will need
  const containerStyle: CSSProperties = {
    position: 'relative',
    display: 'block',
  };

  const dummyElementStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    // We can't set the "visibility" to "collapsed" or "hidden",
    // Or else the "on focus" and "on blur" events won't fire.
    // So we use zIndex instead to "hide" the input.
    zIndex: -1,
    opacity: 0,
    display: 'block',
    resize: 'none',
  };

  // typescript needs this value as a const
  const scopedConf = confProvider;
  function generateFrameUrl() {
    const frameURL = new URL('frame', scopedConf.lunaSecDomain);
    frameURL.searchParams.set('n', frameId);
    frameURL.searchParams.set('origin', window.location.origin);
    frameURL.searchParams.set('component', componentName);
    return frameURL.toString();
  }
  const frameUrl = generateFrameUrl();

  return {
    clonedStyle,
    dummyElementRef,
    dummyStyleRef, // only used by input
    frameRef,
    shouldRenderFrame,
    frameFullyLoaded,
    containerStyle,
    dummyElementStyle,
    frameUrl,
  };
}
