import { config } from 'dotenv';
import { Express } from 'express';
config();

import { setupDedicatedPassPortExpressApp } from './dedicated-tokenizer/passport-express/server';
import { setupDedicatedPassPortGraphQLApp } from './dedicated-tokenizer/passport-graphql/server';

// Reads environment variables and decides which demo express app to launch
function getApp(): Promise<Express> {
  switch (process.env.REACT_APP_DEMO_NAME) {
    case 'dedicated-passport-express':
      return setupDedicatedPassPortExpressApp();
    case 'dedicated-passport-graphql':
      return setupDedicatedPassPortGraphQLApp();
    default:
      throw new Error('Must set DEMO_NAME env var to a suitable demo name');
  }
}

getApp().then((app) => {
  app.listen(3001, () => {
    console.log(`Demo Sever listening on port 3001 in mode ${process.env.DEMO_NAME || 'undefined mode'}`);
  });
});
