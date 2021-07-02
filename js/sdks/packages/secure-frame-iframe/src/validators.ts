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
      // @ts-ignore
      return isSSN(value) || validator.isTaxID(value);
  }
  throw new Error(`Failed to find a validator of the supplied name`);
}

function isSSN(value: string) {
  return /^(?!000|666)[0-9]{3}([ -]?)(?!00)[0-9]{2}\1(?!0000)[0-9]{4}$/.test(value);
}
