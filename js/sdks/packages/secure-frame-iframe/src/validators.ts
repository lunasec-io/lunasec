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

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ValidatorName } from '@lunasec/browser-common';
import validator from 'validator';

export function validate(validatorName: ValidatorName, value: string): boolean {
  switch (validatorName) {
    case 'Email':
      return validator.isEmail(value);
    case 'SSN':
      return isSSN(value);
    case 'EIN':
      // @ts-ignore
      return validator.isTaxID(value);
    case 'SSN_EIN':
      if (isSSN(value)) {
        return true;
      }

      // @ts-ignore
      return validator.isTaxID(value);
  }
  throw new Error(`Failed to find a validator of the supplied name`);
}

function isSSN(value: string) {
  return /^(?!000|666)[0-9]{3}([ -]?)(?!00)[0-9]{2}\1(?!0000)[0-9]{4}$/.test(value);
}
