<template>
  <div class="test-app"></div>
  <SecureInput></SecureInput>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import SecureInput from '../secure-components/Secure-Input.vue';

export default defineComponent({
  name: 'DemoComponent',
  props: {
    msg: String,
  },
  components: {
    SecureInput,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
