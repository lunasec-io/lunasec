
export function generateSecureNonce() {
  if (typeof crypto === "undefined") {
    // TODO: Figure out how to do this isomorphically
    return '12341234';
  }
  const r = crypto.getRandomValues(new Uint32Array(4));

  return Array.from(r)
    .map((i) => i.toString(16))
    .join('');
}
