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
import { createNodeMiddleware } from '@octokit/webhooks';
import cors from 'cors';
import dotenv from 'dotenv';
import EventSource from 'eventsource';
import Express from 'express';

import { githubApiRouter } from './github/projects';
import { webhooks } from './github/webhooks';
import { lookupAccessTokenRouter } from './routes/auth-routes';
import { manifestPresignerRouter } from './routes/manifest-presigner';
import { sbomPresignerRouter } from './routes/sbom-presigner';

const webhookProxyUrl = 'https://smee.io/hVHR69JytEbLgEjU';
const source = new EventSource(webhookProxyUrl);

dotenv.config();

source.onmessage = (event) => {
  const webhookEvent = JSON.parse(event.data);
  webhooks
    .verifyAndReceive({
      id: webhookEvent['x-request-id'],
      name: webhookEvent['x-github-event'],
      signature: webhookEvent['x-hub-signature'],
      payload: webhookEvent.body,
    })
    .catch(console.error);
};

const app = Express();
app.use(cors());
app.use(Express.json());

app.get('/health', (_req: Express.Request, res: Express.Response) => {
  res.send({
    status: 'ok',
  });
});

app.use(Express.json());

app.use(
  createNodeMiddleware(webhooks, {
    path: '/github/webhook/events',
  })
);

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log('REQUEST RECEIVED ', req.path);
    console.log('WITH BODY: ', req.body);
    next();
  });
}

app.get('/', (_req: Express.Request, res: Express.Response) => {
  res.send('Hello World!');
});

app.use(manifestPresignerRouter);
app.use(sbomPresignerRouter);
app.use(lookupAccessTokenRouter);
app.use(githubApiRouter);
export { app };
