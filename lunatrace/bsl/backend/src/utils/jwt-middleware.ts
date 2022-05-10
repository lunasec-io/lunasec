/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

import { getJwksConfig } from '../config';

import { log } from './log';

const jwksConfig = getJwksConfig();

export const jwtMiddleware = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: jwksConfig.jwksUri,
  }),

  issuer: jwksConfig.jwksIssuer,
  algorithms: ['RS256'],
  credentialsRequired: false,
});
