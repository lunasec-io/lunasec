<template>
  <iframe v-if="shouldRenderFrame" :style="frameStyle"></iframe>
  <input ref="dummyElementRef" />
  <input ref="dummyStyleRef" />
</template>

<script lang="ts">
import {defineComponent, CSSProperties} from 'vue';

import { SecureTools } from '../secure-tools';

export default defineComponent({
  name: 'SecureInput',
  props: {
    token: String,
  },
  computed: {
    frameStyle() {
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
    const secureTools = new SecureTools();
    const lunaSecRenderData = secureTools.setupSecureComponent();
    console.log('lunaSecRenderData is ', lunaSecRenderData)

    return lunaSecRenderData
  },
  methods: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
