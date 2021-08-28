import cookieParser from 'cookie-parser';
import express from 'express';
import expressSession from 'express-session';
import passport from 'passport';

import { lunaSec } from './config/configure-lunasec';
import configurePassport from './config/configure-passport';
import { getDb } from './config/db';
import { authRouter } from './routes/auth-router';
import { documentsRouter } from './routes/documents-router';
import { userRouter } from './routes/user-router';

export async function setupDedicatedPassPortExpressApp() {
  await configurePassport();
  await getDb();
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cookieParser());
  app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.authenticate('session'));

  app.use('/user', userRouter());
  app.use('/auth', authRouter());
  app.use('/documents', documentsRouter());

  // Attach the LunaSec authentication plugin
  lunaSec.expressAuthPlugin.register(app);
  return app;
}
