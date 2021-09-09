import { config } from 'dotenv';
import { Express } from 'express';
config();

import { setupDedicatedPassPortExpressApp } from './dedicated-tokenizer/passport-express/server';

// Reads environment variables and decides which demo express app to launch
function getApp(): Promise<Express> {
  if (process.env.DEMO_NAME === 'dedicated-passport-express') {
    return setupDedicatedPassPortExpressApp();
  }
  throw new Error('Must set DEMO_NAME env var to a suitable demo name');
}

getApp().then((app) => {
  app.listen(3001, () => {
    console.log(`Demo Sever listening on port 3001 in mode ${process.env.DEMO_NAME || 'undefined mode'}`);
  });
});
