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
import { InputAttr, ReadElementStyle } from '@lunasec/browser-common';
import { defineComponent, InputHTMLAttributes, Ref } from 'vue';

import { setupSecureComponent } from '../secure-tools';

export interface SecureInputProps extends InputHTMLAttributes {
  token?: string;
  customMetadata?: Record<string, any>;
}

export default defineComponent<SecureInputProps>({
  name: 'SecureInput',

  setup(props) {
    function styleCustomizer(clonedStyle: ReadElementStyle) {
      const { parentStyle, width, height } = clonedStyle;
      clonedStyle.parentStyle = {
        ...parentStyle,
        display: 'block',
        width: width,
        height: height,
      };
      return clonedStyle;
    }

    let lastToken: string;
    function attributeCustomizer(dummyElement: HTMLElement, { id, style }: { id: string; style: string }): InputAttr {
      const attrs: InputAttr = { id, style, component: 'Input' };

      const inputType = dummyElement.getAttribute('type');
      if (inputType) {
        attrs.type = inputType;
      }

      if (props.customMetadata) {
        attrs.customMetadata = props.customMetadata;
      }

      if (props.token && props.token !== lastToken) {
        lastToken = props.token;
        attrs.token = props.token;
      }

      if (props.placeholder) {
        attrs.placeholder = props.placeholder;
      }

      return attrs;
    }

    function setValueCustomizer(el: HTMLElement, token: string) {
      // Todo: make fancy generics that avoid all casting like this
      const input = el as HTMLInputElement;
      input.value = token; // CHECK IF THIS TRIGGERS ONCHANGE LISTENERS OR WHATEVER VUE USES
    }

    const renderData = setupSecureComponent('Input', true, styleCustomizer, attributeCustomizer, setValueCustomizer);
    console.log('lunaSecRenderData is ', renderData);

    return () => {
      return (
        <div style={renderData.containerStyle} class="secure-input-container">
          {renderData.shouldRenderFrame.value && (
            <iframe ref={renderData.frameRef} style={renderData.clonedStyle.parentStyle} src={renderData.frameUrl} />
          )}
          <input class="dummy-input-ref" ref={renderData.dummyElementRef} style={renderData.dummyElementStyle} />
          <input class="dummy-style-ref" ref={renderData.dummyStyleRef} style={renderData.dummyElementStyle} />
        </div>
      );
    };
  },
  methods: {},
});
