<template>
  <div :style="containerStyle" class="secure-input-container">
    <iframe v-if="shouldRenderFrame" :style="frameStyle" :src="frameUrl"/>
    <input ref="dummyElementRef" :style="dummyStyle"/>
    <input ref="dummyStyleRef" :style="dummyStyle"/>
  </div>
</template>

<script lang="ts">
import {AttributesMessage, InputAttr, ReadElementStyle } from '@lunasec/browser-common';
import {defineComponent, InputHTMLAttributes, Ref} from 'vue';

import { setupSecureComponent } from '../secure-tools';

export interface SecureInputProps extends InputHTMLAttributes {
  token?: string;
  customMetadata?: Record<string, any>;
}

export default defineComponent<SecureInputProps>({
  name: 'SecureInput',

  computed: {
    frameStyle() {
      return this.clonedStyle.parentStyle
    },
    dummyStyle() {
      return Object.assign({}, this.dummyElementStyle,  this.$props.style)
    }
  },

  setup(props, context) {
    function styleCustomizer(clonedStyle: ReadElementStyle){
      const { parentStyle, width, height } = clonedStyle
      clonedStyle.parentStyle = {
        ...parentStyle,
        display: 'block',
        width: width,
        height: height,
      };
      return clonedStyle;
    }

    let lastToken:string;
    function attributeCustomizer(dummyElement: Element, {id, style}: { id:string, style:string }): InputAttr {
      const attrs: Partial<InputAttr> = {id, style}
      attrs.component = 'Input'

      const inputType = dummyElement.getAttribute('type')
      if (inputType){
        attrs.type = inputType
      }

      if ('customMetadata' in props){
        attrs.customMetadata = props.customMetadata;
      }

      if (props.token && props.token !== lastToken){
        lastToken = props.token;
        attrs.token = props.token;
      }

      if (props.placeholder){
        attrs.placeholder = props.placeholder;
      }

    }

    const lunaSecRenderData = setupSecureComponent('Input', styleCustomizer, attributeCustomizer);
    console.log('lunaSecRenderData is ', lunaSecRenderData)

    return lunaSecRenderData
  },
  methods: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
