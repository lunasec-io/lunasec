require('source-map-support/register');
import serverlessExpress from '@vendia/serverless-express';
import app from './app';

exports.handler = serverlessExpress({ app });
