/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
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
