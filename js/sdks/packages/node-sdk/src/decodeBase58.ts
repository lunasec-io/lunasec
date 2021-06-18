/**
 * This file contains utilities to encode and decode from Base58.
 * On Arch you can use the python-base58 package to decode the data, like this:
 * $ echo 'asdfasdf' | base58
 * > 2EwmxNEnD4veV
 * $ echo '2EwmxNEnD4veV' | base58 -d
 * > asdfasdf
 */
const B58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

function bytesToHex(uint8a: Uint8Array) {
  // pre-caching chars could speed this up 6x.
  let hex = '';
  for (let i = 0; i < uint8a.length; i++) {
    hex += uint8a[i].toString(16).padStart(2, '0');
  }
  return hex;
}

export function encodeBase58(source: Uint8Array) {
  if (source.length === 0) {
    return '';
  }

  // Convert Uint8Array to BigInt, Big Endian.
  let x = BigInt('0x' + bytesToHex(source));
  const output = [];

  const fiftyEight = BigInt(58);

  while (x > 0) {
    const mod = Number(x % fiftyEight);
    x = x / fiftyEight;
    output.push(B58_ALPHABET[mod]);
  }

  for (let i = 0; source[i] === 0; i++) {
    output.push(B58_ALPHABET[0]);
  }

  return output.reverse().join('');
}

export function decodeBase58(output: string) {
  if (output.length === 0) {
    return new Uint8Array([]);
  }

  const bytes = [0];
  for (let i = 0; i < output.length; i++) {
    const char = output[i];
    const value = B58_ALPHABET.indexOf(char);
    if (value === undefined) {
      throw new Error(`base58.decode received invalid input. Character '${char}' is not in the base58 alphabet.`);
    }
    for (let j = 0; j < bytes.length; j++) {
      bytes[j] *= 58;
    }
    bytes[0] += value;
    let carry = 0;
    for (let j = 0; j < bytes.length; j++) {
      bytes[j] += carry;
      carry = bytes[j] >> 8;
      bytes[j] &= 0xff;
    }
    while (carry > 0) {
      bytes.push(carry & 0xff);
      carry >>= 8;
    }
  }

  for (let i = 0; i < output.length && output[i] === '1'; i++) {
    bytes.push(0);
  }

  return new Uint8Array(bytes.reverse());
}
