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
  FrameMessenger,
  FrameNotification,
  generateSecureNonce,
  getStyleInfo,
  ReadElementStyle,
} from '@lunasec/browser-common';
import { CSSProperties, inject, onMounted, reactive, ref, Ref, unref } from 'vue';

import { LunaSecError } from '../../isomorphic-common';

import { LunaSecConfigProviderAttrs } from './secure-components/LunaSec-Config-Provider';

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
  containerStyle: CSSProperties;
  dummyElementStyle: CSSProperties;
  frameUrl: string;
}

/**
 * A callback passed in by the secure component to modify the style object however it needs to
 * Easier to have this logic passed in a callback than sorting out our render cycle and handling null refs and so-on in every component
 */
export type StyleCustomizer = (clonedStyle: ReadElementStyle) => ReadElementStyle;

function cloneStyle(ref: Ref) {
  if (!ref.value) {
    throw new Error('attempted to clone styles for element that didnt exist');
  }
  return getStyleInfo(ref.value);
}

export function setupSecureComponent(componentName: string, styleCustomizer: StyleCustomizer): RenderData {
  // Get configuration from provider
  const providerConf = inject<LunaSecConfigProviderAttrs>('lunaSecConfig');
  if (!providerConf) {
    throw new Error('Must register LunaSecConfigProvider above Secure Component');
  }
  const lunaSecConfig = providerConf;

  const frameId = generateSecureNonce();
  const frameMessenger = new FrameMessenger(providerConf.lunaSecDomain, frameId, (notification) => {
    // this.frameNotificationCallback(notification)
    console.log('frame notification received ', notification);
  });
  // Set up default reactive variables
  const shouldRenderFrame = ref(false);
  const frameFullyLoaded = ref(false);
  const dummyElementRef = ref(null);
  const dummyStyleRef = ref(null);
  const clonedStyle = reactive({});

  const abortController = new AbortController();

  function frameNotificationHandler(notification: FrameNotification) {
    switch (notification.command) {
      case 'NotifyOnStart':
        sendIFrameAttributes();
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
        this.formContext.submit();
        break;
      case 'NotifyOnError':
        this.props.errorHandler(new LunaSecError(notification.data)); // Call the application's provided error handler
        break;
    }
  }

  onMounted(() => {
    // Clones style from the styleRef if provided, otherwise use elementRef
    const elementToClone = dummyStyleRef.value !== null ? dummyStyleRef : dummyElementRef;
    const style = cloneStyle(elementToClone);
    console.log('cloned style is ', style);
    if (!style) {
      throw new Error('read null style from dummy element');
    }
    const customizedStyle = styleCustomizer(style);
    Object.assign(clonedStyle, customizedStyle); // Put the style into the reactive object
    frameMessenger.listen(window, abortController);

    shouldRenderFrame.value = true;
    console.log('mounted hook complete, frame should render');
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

  function generateFrameUrl() {
    const frameURL = new URL('frame', lunaSecConfig.lunaSecDomain);
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
    shouldRenderFrame,
    frameFullyLoaded,
    containerStyle,
    dummyElementStyle,
    frameUrl,
  };
}
