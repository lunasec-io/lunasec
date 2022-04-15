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
import { randomUUID } from 'crypto';

import { createNodeMiddleware } from '@octokit/webhooks';
import cors from 'cors';
import Express, {NextFunction, Request, Response } from 'express';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

import {getJwksConfig, getServerConfig} from "./config";
import { webhooks } from './github/webhooks';
import { lookupAccessTokenRouter } from './routes/auth-routes';
import { githubApiRouter } from './routes/github-routes';
import { manifestPresignerRouter } from './routes/manifest-presigner';
import { sbomPresignerRouter } from './routes/sbom-presigner';
import {asyncLocalStorage, defaultLogger} from './utils/logger';

const jwksConfig = getJwksConfig();
const serverConfig = getServerConfig();

const app = Express();
app.use(cors());
app.use(Express.json());

app.get('/health', (_req: Express.Request, res: Express.Response) => {
  res.send({
    status: 'ok',
  });
});

app.use(Express.json());

app.use((req, res, next) => {
  const requestId: string = randomUUID();
  const logger = defaultLogger.child({loggerName: 'express-logger',requestId, route: req.route})
    // This will now be accessible anywhere in this callstack by doing asyncLocalStorage.getStore() as we do in getLogger() in utils.
    // This has a serious performance hit to promises so if it's bad we should remove it
  asyncLocalStorage.run({ logger }, next);
});

app.use(
  createNodeMiddleware(webhooks, {
    path: '/github/webhook/events',
    onUnhandledRequest: (request, response) => {
      defaultLogger.error('Unhandled request in GitHub WebHook handler', request);
      response.status(400).json({
        error: true,
        message: 'Unhandled request',
      });
    },
    log: console,
  })
);

function debugRequest(req: Request, res: Response, next: NextFunction) {
  defaultLogger.info('request', req.method, req.path);
  next();
}

if (serverConfig.isProduction) {
  app.use(debugRequest);
}

app.get('/', (_req: Express.Request, res: Express.Response) => {
  res.send('LunaTrace Backend');
});

// Unauthenticated Routes (implement custom auth)
app.use(lookupAccessTokenRouter);
app.use(githubApiRouter);

// Routes Authenticated via JWT
app.use(
  jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: jwksConfig.jwksUri,
    }),

    issuer: jwksConfig.jwksIssuer,
    algorithms: ['RS256'],
  })
);

app.use(manifestPresignerRouter);
app.use(sbomPresignerRouter);

export { app };
