<template>
  <div :style="containerStyle" class="secure-input-container">
    <iframe v-if="shouldRenderFrame" :style="frameStyle" :src="frameUrl"/>
    <input ref="dummyElementRef" :style="dummyStyle"/>
    <input ref="dummyStyleRef" :style="dummyStyle"/>
  </div>
</template>

<script lang="ts">
import { ReadElementStyle } from '@lunasec/browser-common';
import {defineComponent} from 'vue';

import { setupSecureComponent } from '../secure-tools';

export default defineComponent({
  name: 'SecureInput',

  props: {
    token: String,
    style: Object
  },

  computed: {
    frameStyle() {
      return this.clonedStyle.parentStyle
    },
    dummyStyle() {
      return Object.assign({}, this.dummyElementStyle,  this.$props.style)
    }
  },

  setup() {
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
    const lunaSecRenderData = setupSecureComponent('Input', styleCustomizer);
    console.log('lunaSecRenderData is ', lunaSecRenderData)

    return lunaSecRenderData
  },
  methods: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
