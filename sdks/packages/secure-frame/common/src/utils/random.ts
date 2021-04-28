export function generateSecureNonce() {
  const r = crypto.getRandomValues(new Uint32Array(4));

  return Array.from(r)
    .map((i) => i.toString(16))
    .join('');
}
