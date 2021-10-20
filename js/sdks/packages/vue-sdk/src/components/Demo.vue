<template>
  <div class="test-app"></div>
  <SecureInput></SecureInput>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SecureInput from "./SecureInput";

export default defineComponent({
  name: "Demo",
  props: {
    msg: String,
  },
  components: {
    SecureInput,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
