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
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import expressSession from 'express-session';

import { initDb } from '../../common/database/db';
import { SQLiteStore } from '../../common/database/sessions';
import { createModels } from '../../common/models';

import { lunaSec } from './config/configure-lunasec';
import { configurePassport } from './config/configure-passport';
import { authRouter } from './routes/auth-router';
import { documentsRouter } from './routes/documents-router';
import { userRouter } from './routes/user-router';

export async function setupDedicatedPassPortExpressApp() {
  const db = await initDb('dedicated-passport-express');

  const models = createModels(db);
  const passport = configurePassport(models);

  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cookieParser());
  app.use(
    cors({
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200,
      methods: ['GET', 'PUT', 'POST'],
      credentials: true,
    })
  );
  app.use(
    expressSession({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new SQLiteStore({
        db: 'sessions.sqlite3',
        table: 'sessions',
        secret: 'keyboard cat',
      }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(passport.authenticate('session'));

  app.use('/user', userRouter(models));
  app.use('/auth', authRouter(models, passport));
  app.use('/documents', documentsRouter(models));

  // Attach the LunaSec authentication plugin
  lunaSec.expressAuthPlugin.register(app);
  // todo: add an error handler
  return app;
}
