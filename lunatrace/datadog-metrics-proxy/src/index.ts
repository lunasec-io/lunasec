/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
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
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

const validateDataDogForwardParam = (ddforward: string) => {
  const re = /https:\/\/(\d|\w|-|_)+\.browser-intake-datadoghq\.com\/.*/;
  return re.test(ddforward);
};

const proxyOptions = {
  changeOrigin: true,
  secure: false,
  xfwd: true,
};

function corsMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {

  const origin = req.headers.origin;

  if (!origin || typeof origin !== 'string' || origin === '') {
    res.status(400).send('Origin header is required');
    return;
  }

  if (process.env.DEVELOPMENT && origin.includes('localhost')) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (origin === process.env.DATADOG_RUM_ORIGIN) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Content-Length');
  next();
}

app.options('/proxy', corsMiddleware, (req: express.Request, res: express.Response) => {
  res.send();
});

app.post('/proxy', corsMiddleware, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const ddforward = req.query.ddforward;

  if (!ddforward || typeof ddforward !== 'string') {
    res.writeHead(400, 'Bad Request');
    res.end();
    return;
  }

  if (!validateDataDogForwardParam(ddforward)) {
    res.writeHead(400, 'Bad Request');
    res.end();
    return;
  }

  createProxyMiddleware({
    ...proxyOptions,
    toProxy: true,
    target: ddforward,
  })(req, res, next);
});

app.listen(5166, () => {
  console.log('Proxy server listening on port 5166');
});
