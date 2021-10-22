<script lang="ts">
export interface LunaSecConfigProviderAttrs {
  lunaSecDomain: string;
  sessionAuthProvider: string;
  authenticationErrorHandler: (e: Error) => void;
}
import { defineComponent, provide, toRefs } from 'vue';
export default defineComponent({
  name: 'Demo',
  props: {
    lunaSecDomain: {
      type: String,
      required: true,
    },
    sessionAuthProvider: String,
    authenticationErrorHandler: {
      type: Function, // as (e: Error) => void,
      default: (e: Error) => {
        throw e;
      },
    },
  },
  setup: (props) => {
    provide('lunaSecConfig', toRefs(props));
  },
});
</script>
