import { createPrivateKey, createPublicKey, KeyObject } from 'crypto';

import { safeParseJson } from '@lunasec/server-common';

interface JsonKeyPairBundle {
  public_key: string;
  private_key: string;
}

export interface SecretKeyPairBundle {
  publicKey: KeyObject;
  privateKey: KeyObject;
}

export function decodeSecretKeyPairBundle(encodedSecretBundle: string): SecretKeyPairBundle {
  const decodedSecretBundle = safeParseJson<JsonKeyPairBundle>(encodedSecretBundle);

  if (!decodedSecretBundle) {
    throw new Error('Unable to decode LunaSec secret keys from key bundle');
  }

  if (!decodedSecretBundle.public_key) {
    throw new Error('Unable to read LunaSec public key from key bundle');
  }

  if (!decodedSecretBundle.private_key) {
    throw new Error('Unable to read LunaSec private key from key bundle');
  }

  const publicKeyPem = Buffer.from(decodedSecretBundle.public_key, 'base64');
  const privateKeyPem = Buffer.from(decodedSecretBundle.private_key, 'base64');

  return {
    publicKey: createPublicKey(publicKeyPem),
    privateKey: createPrivateKey(privateKeyPem),
  };
}
