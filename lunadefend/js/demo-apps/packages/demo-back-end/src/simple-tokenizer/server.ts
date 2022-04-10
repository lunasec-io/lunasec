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
import cors from 'cors';
import express from 'express';

import { initDb } from '../common/database/db';
import { createModels } from '../common/models';

import { simpleTokenizerBackend } from './config/configure-lunasec';
import { userRouter } from './routes/user-router';

export async function setupSimpleExpressApp() {
  const db = await initDb('simple-express');

  const models = createModels(db);
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(
    cors({
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200,
      methods: ['GET', 'PUT', 'POST'],
      credentials: true,
    })
  );

  app.use('/user', userRouter(models));

  // Attach the LunaSec authentication plugin
  simpleTokenizerBackend.register(app);
  return app;
}
