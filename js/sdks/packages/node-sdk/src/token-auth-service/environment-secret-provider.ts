import { createPrivateKey } from 'crypto';

import { __SIGNING_KEY__ } from '../constants';

import { EnvironmentSecretProvider } from './types';

export function environmentSecretProvider(_provider: EnvironmentSecretProvider) {
  if (__SIGNING_KEY__ === undefined) {
    throw new Error('Unable to read secret from environment variable: LUNASEC_SIGNING_KEY');
  }

  const signingKey = Buffer.from(__SIGNING_KEY__, 'base64');

  const secretKey = createPrivateKey(signingKey);

  return Promise.resolve(secretKey);
}
