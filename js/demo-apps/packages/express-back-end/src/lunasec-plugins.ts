import { LunaSecExpressAuthPlugin, LunaSecTokenAuthService, SecretProviders } from '@lunasec/node-sdk';
import { Request } from 'express';

export const tokenService = new LunaSecTokenAuthService({
  secretProvider: {
    type: SecretProviders.environment,
  },
});

export const authPlugin = new LunaSecExpressAuthPlugin({
  tokenService: tokenService,
  // this claims callback will be useful when we have centralized authorization
  // and we can use those claims to verify if a user can access a token
  authContextCallback: (req: Request) => {
    const idToken = req.cookies['id_token'];

    if (idToken === undefined) {
      console.error('id_token is not set in request');
      return null;
    }
    // TODO (cthompson) validate the jwt and pull relevant claims from payload
    return {};
  },
});
