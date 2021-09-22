import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import expressSession from 'express-session';

import { initDb } from '../../common/database/db';
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
  app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.authenticate('session'));
  // app.use((req, res, next) => {
  //   req.passport = passport;
  //   next();
  // });
  app.use('/user', userRouter(models));
  app.use('/auth', authRouter(models, passport));
  app.use('/documents', documentsRouter(models));

  // Attach the LunaSec authentication plugin
  lunaSec.expressAuthPlugin.register(app);
  return app;
}
