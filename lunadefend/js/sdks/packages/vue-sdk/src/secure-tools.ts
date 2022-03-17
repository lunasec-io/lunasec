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
import { inject, onMounted, Ref, ref } from 'vue';

import { LunaSecConfigProviderAttrs } from './secure-components/LunaSec-Config-Provider';

export class SecureTools {
  frameId: string;
  messageCreator: FrameMessageCreator;
  lunaSecConfig: LunaSecConfigProviderAttrs;
  shouldRenderFrame: Ref<boolean>;
  clonedStyle: Ref<ReadElementStyle | null>;

  constructor() {
    console.log('built an instance of SecureTools');
    this.frameId = generateSecureNonce();

    this.shouldRenderFrame = ref(false);
    this.clonedStyle = ref(null);
    const providerConf = inject<LunaSecConfigProviderAttrs>('lunaSecConfig');
    if (!providerConf) {
      throw new Error('Must register LunaSecConfigProvider above Secure Component');
    }
    this.lunaSecConfig = providerConf;
    console.log('providerConf is ', providerConf);
    this.messageCreator = new FrameMessageCreator(providerConf.lunaSecDomain, this.frameId, (notification) => {
      // this.frameNotificationCallback(notification)
      console.log('frame notification received');
    });
  }

  cloneStyle(ref: Ref) {
    if (!ref.value) {
      throw new Error('attempted to clone styles for element that didnt exist');
    }
    return getStyleInfo(ref.value);
  }

  setupSecureComponent() {
    const wrappedElementRef = ref(null);

    onMounted(() => {
      // todo: handle the need to pass a different ref for inputs
      const style = this.cloneStyle(wrappedElementRef);
      console.log('cloned style is ', style);
      this.clonedStyle.value = style;
      this.shouldRenderFrame.value = true;
    });

    return {
      dummyStyleRef: wrappedElementRef,
      shouldRenderFrame: this.shouldRenderFrame,
      clonedStyle: this.clonedStyle,
    };
  }
}
