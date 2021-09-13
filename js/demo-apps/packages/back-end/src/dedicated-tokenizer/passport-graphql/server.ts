import { config } from 'dotenv';
config();

import express, { Express } from 'express';
import expressSession from 'express-session';
import passport from 'passport';

import { getDb } from '../../common/database/db';

import { lunaSec } from './config/configure-lunasec';
import configurePassport from './config/configure-passport';
import { attachApolloServer } from './graphql/graphql-apollo-server';

import cors from 'cors';
import cookieParser from 'cookie-parser';

export async function setupDedicatedPassPortGraphQLApp(): Promise<Express> {
  await getDb();
  await configurePassport();
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

  app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(passport.authenticate('session'));

  // Attach the LunaSec authentication plugin
  lunaSec.expressAuthPlugin.register(app);

  await attachApolloServer(app);
  return app;
}
