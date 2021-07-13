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
    sessionIdProvider: (req) => readSessionFromRequest(req),
  },
});
