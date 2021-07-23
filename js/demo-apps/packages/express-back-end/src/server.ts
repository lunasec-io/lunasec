import { config } from 'dotenv';
config();

import express from 'express';

import { lunaSec } from './configure-lunasec';
import { attachApolloServer } from './graphql/graphql-apollo-server';
import { createRoutes } from './routes';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fromIni } from '@aws-sdk/credential-provider-ini';
import { registerS3Tokenizer, S3TokenizerBackend } from '@lunasec/node-sdk';

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

const tokenizerBackend = new S3TokenizerBackend({
  awsRegion: 'us-west-2',
  s3Bucket: 'lunasec-test-dev-bucket',
  // @ts-ignore
  getAwsCredentials: async () => {
    return await fromIni();
  },
});

registerS3Tokenizer(app, tokenizerBackend);

attachApolloServer(app).then(() => {
  app.listen(3001, () => {
    console.log('listening on http://localhost:3001/');
  });
});
