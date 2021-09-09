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
