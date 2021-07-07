import { TOKEN_PREFIX } from '../constants';

export function isToken(s: string) {
  const r = new RegExp('^' + TOKEN_PREFIX);
  return r.test(s);
}
