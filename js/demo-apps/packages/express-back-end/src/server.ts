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
lunaSec.expressPlugin.register(app);

app.use(createRoutes());

attachApolloServer(app).then(() => {
  app.listen(3001, () => {
    console.log('listening on http://localhost:3001/');
  });
});
