<template>
  <input ref="dummyElementRef" />
  <input ref="dummyStyleRef" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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
