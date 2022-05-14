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

import { createNodeMiddleware as githubWebhooksMiddleware } from '@octokit/webhooks';
import cors from 'cors';
import Express, { NextFunction, Request, Response } from 'express';

import { getServerConfig } from './config';
import { lookupAccessTokenRouter } from './express-routes/auth-routes';
import { githubApiRouter } from './express-routes/github-routes';
import { createGithubWebhookInterceptor } from './github/webhooks';
import { registerYoga } from './graphql-yoga';
import { log } from './utils/log';

const serverConfig = getServerConfig();

function debugRequest(req: Request, res: Response, next: NextFunction) {
  log.info('request', req.method, req.path);
  next();
}

export async function newApp() {
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
    const loggerFields = { trace: 'express-logger', requestId, path: req.path, method: req.method };
    log.debug('request', loggerFields);
    // This will now be accessible anywhere in this callstack by doing asyncLocalStorage.getStore() which the logger does internally
    // This has a serious performance hit to promises so if it's bad we should remove it
    void log.provideFields(loggerFields, next);
  });

  const webhooks = await createGithubWebhookInterceptor();

  if (webhooks !== null) {
    app.use(
      githubWebhooksMiddleware(webhooks, {
        path: '/github/webhook/events',
        onUnhandledRequest: (request, response) => {
          log.error('Unhandled request in GitHub WebHook handler', request);
          response.status(400).json({
            error: true,
            message: 'Unhandled request',
          });
        },
        log: log,
      })
    );
  }

  if (serverConfig.isProduction) {
    app.use(debugRequest);
  }

  app.get('/', (_req: Express.Request, res: Express.Response) => {
    res.send('LunaTrace Backend');
  });

  // Unauthenticated Routes (they implement custom auth)
  app.use(lookupAccessTokenRouter);
  app.use(githubApiRouter);

  // Add graphql routes to the server
  registerYoga(app);

  const errorLogger: Express.ErrorRequestHandler = (err, req, res, next) => {
    log.error(err, 'Error caught in global express error handler');
    next(err);
  };
  app.use(errorLogger);

  return app;
}
