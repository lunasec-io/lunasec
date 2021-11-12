<template>
  <div class="test-app"></div>
  <SecureForm onSubmit="handleSubmit">
    <SecureInput></SecureInput>
  </SecureForm>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import SecureInput from '../secure-components/Secure-Input.vue';
import SecureForm from '../secure-components/Secure-Form';

export default defineComponent({
  name: 'Demo',
  props: {
    msg: String,
  },
  components: {
    SecureInput,
    SecureForm
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
