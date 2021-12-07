<template>
  <iframe v-if="shouldRenderFrame"></iframe>
  <input ref="dummyElementRef" />
  <input ref="dummyStyleRef" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { SecureTools } from '../secure-tools';

export default defineComponent({
  name: 'SecureInput',
  props: {
    msg: String,
  },
  setup() {
    const secureTools = new SecureTools();
    return secureTools.setupSecureComponent();
  },
  methods: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
