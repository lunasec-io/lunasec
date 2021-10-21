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
import { onMounted, ref, Ref } from "vue";
import { getStyleInfo } from "@lunasec/browser-common";
function cloneStyle(ref: Ref) {
  return getStyleInfo(ref.value);
}
export default function setupSecureComponent(
  dummyRefName: string,
  dummyStyleRefName: string
) {
  const wrappedElementRef = ref(null);

  onMounted(() => {
    // console.log("value of ref is ", wrappedElementRef.value);
    // todo: handle the need to pass a different ref for inputs
    cloneStyle(wrappedElementRef);
  });

  return {
    wrappedElementRef,
  };
}
