<template>
  <input ref="wrappedElementRef" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import setupSecureComponent from "@/setupSecureComponent";
export default defineComponent({
  name: "Demo",
  props: {
    msg: String,
  },
  setup() {
    return setupSecureComponent();
  },
  methods: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
