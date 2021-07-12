import { config } from 'dotenv';
config();

import express from 'express';

import { attachApolloServer } from './graphql/graphql-apollo-server';
import { authPlugin } from './lunasec-plugins';
import { createRoutes } from './routes';

import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST'],
  })
);

app.use(cookieParser());
// Attach the LunaSec authentication plugin
authPlugin.register(app);

app.use(createRoutes());

attachApolloServer(app);

app.listen(3001, () => {
  console.log('listening on http://localhost:3001/');
});
