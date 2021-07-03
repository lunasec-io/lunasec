import { TOKEN_PREFIX } from '../constants'; // We need to get this from an environment variable or something

export function isToken(s: string) {
  const r = new RegExp('^' + TOKEN_PREFIX);
  return r.test(s);
}
