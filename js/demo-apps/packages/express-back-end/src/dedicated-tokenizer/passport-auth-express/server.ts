import path from 'path';

import cookieParser from 'cookie-parser';
import express from 'express';
import expressSession from 'express-session';
import passport from 'passport';

import { lunaSec } from './configure-lunasec';
import initAuth from './init/auth';
import { authRouter } from './routes/auth-router';
import { documentsRouter } from './routes/documents-router';
import { userRouter } from './routes/user-router';

export function setupDedicatedPassPortExpressApp() {
  initAuth();

  const app = express();
  app.set('view engine', 'ejs');

  app.use(express.urlencoded({extended: true}));
  app.use(express.json());

  app.use(cookieParser());
  app.use(expressSession({secret: 'keyboard cat', resave: false, saveUninitialized: false}));
  app.use(passport.initialize());
  app.use(passport.authenticate('session'));

  app.use('/api/user', userRouter());
  app.use('/api/auth', authRouter());
  app.use('/api/documents', documentsRouter());

// Attach the LunaSec authentication plugin
  lunaSec.expressAuthPlugin.register(app);
  return app;
}
