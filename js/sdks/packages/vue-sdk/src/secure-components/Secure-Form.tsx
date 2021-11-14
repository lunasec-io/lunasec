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
import { timeout } from '@lunasec/browser-common';
import { defineComponent, FormHTMLAttributes, provide, reactive, ref } from 'vue';
export interface LunaSecSecureFormProviderAttrs {
  tokenCommitCallbacks: Record<string, () => void>;
  triggerSubmit: () => void;
}
export default defineComponent<FormHTMLAttributes>({
  name: 'SecureForm',
  setup: (props, context) => {
    const formRef = ref();
    //not sure if this needs to be reactive
    const providerAttrs = reactive<LunaSecSecureFormProviderAttrs>({
      tokenCommitCallbacks: {},
      triggerSubmit: () => {
        console.log('form submit called');
        if (!formRef.value) {
          throw new Error('attempted to submit an unmounted form');
        }
        // Trigger all inputs to
        formRef.value.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      },
    });
    provide('lunaSecSecureForm', providerAttrs);

    async function onSubmit(e: Event) {
      e.preventDefault();
      const commitPromises = Object.keys(providerAttrs.tokenCommitCallbacks).map((frameId) => {
        const triggerCommit = providerAttrs.tokenCommitCallbacks[frameId];
        return triggerCommit();
      });

      // Now just wait for side effects to happen
      // TODO: Catch and display errors here in some clean way
      await Promise.all(commitPromises);

      // This timeout is an attempt to give the above events time to propagate and any user code time to execute,
      // like it would have in a normal form where the user pressed submit.  That's right, we are hacking now
      await timeout(5);
      if (props.onSubmit) {
        props.onSubmit(e);
      }
    }
    const { slots } = context;
    // render function
    return () => {
      return (
        <form {...props} onSubmit={onSubmit} ref={formRef}>
          <p> Secure Form</p>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*
          // @ts-ignore */}
          {slots.default()}
        </form>
      );
    };
  },
});
