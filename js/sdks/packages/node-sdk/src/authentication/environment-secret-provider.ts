import { createPrivateKey, KeyObject } from 'crypto';

import { __SIGNING_KEY__ } from '../constants';

export function environmentSecretProvider() {
  if (__SIGNING_KEY__ === undefined) {
    throw new Error('Unable to read secret from environment variable: LUNASEC_SIGNING_KEY');
  }

  let secretKey: KeyObject;
  try {
    const signingKey = Buffer.from(__SIGNING_KEY__, 'base64');
    secretKey = createPrivateKey(signingKey);
  } catch (e) {
    throw new Error('Error loading Session Signing Key from environment, check your environment keys ');
  }

  return Promise.resolve(secretKey);
}
