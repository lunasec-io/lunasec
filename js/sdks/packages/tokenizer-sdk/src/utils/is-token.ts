import { LUNASEC_TOKEN_REGEXP } from '../constants';

export function isToken(s: string) {
  return LUNASEC_TOKEN_REGEXP.test(s);
}
