/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
export interface LunaSecConfigProviderAttrs {
  lunaSecDomain: string;
  sessionAuthProvider: string;
  authenticationErrorHandler: (e: Error) => void;
}
import { defineComponent, provide } from 'vue';
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
    provide('lunaSecConfig', props);
  },
  render() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.$slots.default();
  },
});
