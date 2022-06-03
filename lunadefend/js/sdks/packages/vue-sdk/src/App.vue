<template>
  <LunaSecConfigProvider luna-sec-domain="http://localhost:37766">
    <DemoComponent />
  </LunaSecConfigProvider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import DemoComponent from './components/DemoComponent.vue';
import LunaSecConfigProvider from './secure-components/LunaSec-Config-Provider';
export default defineComponent({
  name: 'App',
  components: {
    DemoComponent,
    LunaSecConfigProvider,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
