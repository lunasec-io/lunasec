import { LunaSec } from '@lunasec/node-sdk';

import { lunaSecSessionIdProvider } from './auth-helpers';

if (!process.env.SECURE_FRAME_URL) {
  throw new Error('Secure frame url env var is not set');
}

export const lunaSec = new LunaSec({
  secureFrameURL: process.env.SECURE_FRAME_URL,
  auth: {
    secrets: { source: 'environment' },
    payloadClaims: [],
    // pluginBaseUrl: '/api', This prepends the .lunasec routes with any string you wish

    // Provide a small middleware that takes in the req object and returns a promise containing a session token
    // or null if a user is not logged in.  LunaSec uses this to automatically create and verify token grants
    // and to bootstrap a session if you are using the express-auth-plugin
    sessionIdProvider: lunaSecSessionIdProvider,
  },
});
