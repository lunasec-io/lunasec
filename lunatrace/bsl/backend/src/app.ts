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
import {randomUUID} from 'crypto';

import {createNodeMiddleware as githubWebhooksMiddleware} from '@octokit/webhooks';
import cors from 'cors';
import Express, {NextFunction, Request, Response} from 'express';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

import {getJwksConfig,getServerConfig} from "./config";
import {lookupAccessTokenRouter} from './express-routes/auth-routes';
import {githubApiRouter} from './express-routes/github-routes';
import {webhooks} from './github/webhooks';
import {registerYoga} from "./graphql-yoga";
import {jwtMiddleware} from "./utils/jwt-middleware";
import {log} from './utils/log';



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
    const loggerFields = {loggerName: 'express-logger', requestId, path: req.path};
    log.log(loggerFields, 'Request Received')
    // This will now be accessible anywhere in this callstack by doing asyncLocalStorage.getStore() which the logger does internally
    // This has a serious performance hit to promises so if it's bad we should remove it
  void log.provideFields(loggerFields , next);
});

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

function debugRequest(req: Request, res: Response, next: NextFunction) {
  log.info('request', req.method, req.path);
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


// app.use((req,res,next) => {
//   log.log(req.headers, 'headers are ')
//   next()
// })

app.use(jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: jwksConfig.jwksUri,
  }),

  issuer: jwksConfig.jwksIssuer,
  algorithms: ['RS256'],
  credentialsRequired:true
}));

// Add graphql routes to the server
registerYoga(app);

// The old rest routes that have been converted to graphql
// app.use(manifestPresignerRouter);
// app.use(sbomPresignerRouter);

const errorLogger: Express.ErrorRequestHandler = (err,req,res,next) => {
  log.error(err, 'Error caught in global express error handler')
  next(err)
}
app.use(errorLogger)

export {app};
