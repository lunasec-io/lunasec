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
import { fromIni } from '@aws-sdk/credential-provider-ini';
import { LunaSec } from '@lunasec/node-sdk';

import { readSessionFromRequest } from './read-session-from-request';

if (!process.env.SECURE_FRAME_URL) {
  throw new Error('Secure frame url env var is not set');
}

export const lunaSec = new LunaSec({
  secureFrameURL: process.env.SECURE_FRAME_URL,
  auth: {
    secrets: { source: 'environment' },
    payloadClaims: [],
    // Provide a small middleware(ours is called readSessionFromRequest) that takes in the req object and returns a promise containing a session token
    // or null if a user is not logged in.  LunaSec uses this to automatically create and verify token grants
    sessionIdProvider: readSessionFromRequest,
  },
  simpleTokenizerBackendConfig: {
    // Only needed if you want to register the simple-express-tokenizer-backend
    awsRegion: 'us-west-2',
    s3Bucket: process.env.CIPHERTEXT_S3_BUCKET || 'YOU MUST SPECIFY A BUCKET',
    getAwsCredentials: () => {
      return Promise.resolve(fromIni());
    },
  },
});
