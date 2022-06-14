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
// Used by SecureForm to write tokens to hidden inputs
// This madness is necessary to set a value on a react element in a way that will trigger the onChange listener.  As of
// 2021, setting the value by ref will not trigger onChange listeners.

// TODO: make this work with typescript and eslint
// export default function setNativeValue(element: HTMLInputElement, value: string) {
//   // @ts-ignore
//   const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
//   const prototype = Object.getPrototypeOf(element);
//   // @ts-ignore
//   const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
//
//   if (valueSetter && valueSetter !== prototypeValueSetter) {
//     // @ts-ignore
//     prototypeValueSetter.call(element, value);
//   } else {
//     // @ts-ignore
//     valueSetter.call(element, value);
//   }
// }

export default function setNativeValue(componentName: 'Input' | 'TextArea', element: HTMLElement, value: string) {
  const nativePropertyDescriptor = getNativeProp(componentName);
  if (nativePropertyDescriptor === undefined) {
    throw new Error('Could not get native value property for setting token');
  }
  if (nativePropertyDescriptor.set === undefined) {
    throw new Error('Unable to set native property descriptor value for element');
  }

  nativePropertyDescriptor.set.call(element, value);
  const e = new Event('input', { bubbles: true });
  element.dispatchEvent(e);
}

function getNativeProp(elementType: 'Input' | 'TextArea') {
  if (elementType === 'Input') {
    return Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
  } else {
    return Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value');
  }
}
