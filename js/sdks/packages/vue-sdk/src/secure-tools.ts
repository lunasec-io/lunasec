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
import { FrameMessageCreator, generateSecureNonce, getStyleInfo, ReadElementStyle } from '@lunasec/browser-common';
import { inject, onMounted, reactive, ref, Ref } from 'vue';

import { LunaSecConfigProviderAttrs } from './secure-components/LunaSec-Config-Provider';

export interface RenderData {
  shouldRenderFrame: Ref<boolean>;
  clonedStyle: ReadElementStyle | Record<string | number, never>;
  dummyElementRef: Ref;
}

// This is a reactive bag of properties used by the secure components
// renderData: RenderData;
//
// private messageCreator: FrameMessageCreator;
// private lunaSecConfig: LunaSecConfigProviderAttrs;

// constructor() {
//   console.log('built an instance of SecureTools');
//
//   const renderData: RenderData = {
//     frameId,
//     shouldRenderFrame: false,
//     clonedStyle: null,
//     dummyElementRef: ref(null),
//   };
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   this.renderData = renderData;
// }

function cloneStyle(ref: Ref) {
  if (!ref.value) {
    throw new Error('attempted to clone styles for element that didnt exist');
  }
  return getStyleInfo(ref.value);
}

export function setupSecureComponent(): RenderData {
  const providerConf = inject<LunaSecConfigProviderAttrs>('lunaSecConfig');
  if (!providerConf) {
    throw new Error('Must register LunaSecConfigProvider above Secure Component');
  }
  const lunaSecConfig = providerConf;

  const frameId = generateSecureNonce();
  const messageCreator = new FrameMessageCreator(providerConf.lunaSecDomain, frameId, (notification) => {
    // this.frameNotificationCallback(notification)
    console.log('frame notification received ', notification);
  });
  // Set up default reactive variables
  const shouldRenderFrame = ref(false);
  const dummyElementRef = ref(null);
  const clonedStyle = reactive({});

  onMounted(() => {
    // todo: handle the need to pass a different ref for inputs
    const style = cloneStyle(dummyElementRef);
    console.log('cloned style is ', style);
    if (!style) {
      throw new Error('read null style from dummy element');
    }
    Object.assign(clonedStyle, style);
    shouldRenderFrame.value = true;
    console.log('mounted hook complete, frame should render');
  });

  // console.log('setupSecureComponent returning ', this.renderData);
  return {
    clonedStyle,
    dummyElementRef,
    shouldRenderFrame,
  };
}
