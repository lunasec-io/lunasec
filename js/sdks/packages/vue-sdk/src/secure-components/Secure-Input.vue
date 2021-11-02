<template>
  <p v-if="shouldRenderFrame">
    TEST PARAGRAPH
  </p>
  <iframe v-if="shouldRenderFrame" :style="frameStyle">
    THIS IS A FRAME
  </iframe>
  <input ref="dummyElementRef" />
  <input ref="dummyStyleRef" />
</template>
<script lang="ts">
import {defineComponent, CSSProperties} from 'vue';

import { setupSecureComponent } from '../secure-tools';

export default defineComponent({
  name: 'SecureInput',
  props: {
    token: String,
  },
  computed: {
    frameStyle() {
      console.log('frame style computed hook fired')
      console.log('should render frame is ', this.shouldRenderFrame)
      const clonedStyle = this.clonedStyle;
      if (clonedStyle === null){
        console.log('computed framestyle returning empty')
        return {};
      }
      // todo: MAKE SURE THIS WORKS
      const { parentStyle, width, height } = clonedStyle
      const iframeStyle: CSSProperties = {
        ...parentStyle,
        display: 'block',
        width: width,
        height: height,
      };
      console.log('computed framestyle as  ', iframeStyle);
      return iframeStyle;
    },
  },

  setup() {
    const lunaSecRenderData = setupSecureComponent();
    console.log('lunaSecRenderData is ', lunaSecRenderData)

    return lunaSecRenderData
  },
  methods: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
