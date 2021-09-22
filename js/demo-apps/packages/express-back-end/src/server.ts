/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
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
import { config } from 'dotenv';
config();

import express from 'express';

import { lunaSec } from './configure-lunasec';
import { attachApolloServer } from './graphql/graphql-apollo-server';
import { createRoutes } from './routes';

import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST'],
    credentials: true,
  })
);
app.use(cookieParser());

// Attach the LunaSec authentication plugin
lunaSec.expressAuthPlugin.register(app);
// Attach the Simple Tokenizer Backend to your app if you dont want to use the full containerized backend and instead
// just want to use an express plugin in this app as a backend
lunaSec.simpleTokenizerBackend.register(app);

app.use(createRoutes());

attachApolloServer(app).then(() => {
  app.listen(3001, () => {
    console.log('listening on http://localhost:3001/');
  });
});
