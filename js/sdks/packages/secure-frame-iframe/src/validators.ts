import { ValidatorName } from '@lunasec/browser-common';
import validator from 'validator';

export function validate(validatorName: ValidatorName, value: string): boolean {
  switch (validatorName) {
    case 'Email':
      return validator.isEmail(value);
    case 'SSN':
      return validator.isISSN(value);
    case 'EIN':
      // @ts-ignore
      return validator.isTaxID(value);
    case 'SSN_EIN':
      // @ts-ignore
      return validator.isISSN(value) || validator.isTaxID(value);
  }
}
