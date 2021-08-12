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
