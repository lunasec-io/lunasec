const prefix = 'lunasec-'; // We need to get this from an environment variable or something

export function isToken(s: string) {
  const r = new RegExp('^' + prefix);
  return r.test(s);
}
