import cors from 'cors';
import express from 'express';

import { getDb } from '../common/database/db';

import { simpleTokenizerBackend } from './config/configure-lunasec';
import { userRouter } from './routes/user-router';

export async function setupSimpleExpressApp() {
  await getDb();
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

  app.use('/user', userRouter());

  // Attach the LunaSec authentication plugin
  simpleTokenizerBackend.register(app);
  return app;
}
