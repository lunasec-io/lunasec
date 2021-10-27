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
// eslint-disable-next-line import/order
import { config } from 'dotenv';
config();

import express, { Express } from 'express';
import expressSession from 'express-session';

import { initDb } from '../../common/database/db';
import { SQLiteStore } from '../../common/database/sessions';
import { createModels } from '../../common/models';

import { lunaSec } from './config/configure-lunasec';
import configurePassport from './config/configure-passport';
import { attachApolloServer } from './graphql/graphql-apollo-server';

// eslint-disable-next-line import/order
import cors from 'cors';
// eslint-disable-next-line import/order
import cookieParser from 'cookie-parser';

export async function setupDedicatedPassPortGraphQLApp(): Promise<Express> {
  const db = await initDb('dedicated-passport-graphql');

  const models = createModels(db);
  const passport = configurePassport(models);
  const app = express();

  app.use(express.json());
  app.use(
    // This needs to be set both here AND when graphql is initialized in order for passport to work
    cors({
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200,
      methods: ['GET', 'PUT', 'POST'],
      credentials: true,
    })
  );
  app.use(cookieParser());

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

  // Attach the LunaSec authentication plugin
  lunaSec.expressAuthPlugin.register(app);

  await attachApolloServer(app, models);
  return app;
}
