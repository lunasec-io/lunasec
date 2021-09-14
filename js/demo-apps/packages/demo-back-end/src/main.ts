import { config } from 'dotenv';
config();

import { setupDedicatedPassPortExpressApp } from './dedicated-tokenizer/passport-express/server';
import { setupDedicatedPassPortGraphQLApp } from './dedicated-tokenizer/passport-graphql/server';
import { setupSimpleExpressApp } from './simple-tokenizer/server';

void setupDedicatedPassPortExpressApp().then((app) => {
  app.listen(3001, () => {
    console.log('Dedicated PassPort Express Server running on 3001');
  });
});

void setupDedicatedPassPortGraphQLApp().then((app) => {
  app.listen(3002, () => {
    console.log('Dedicated PassPort GraphQL Server running on 3002');
  });
});

void setupSimpleExpressApp().then((app) => {
  app.listen(3003, () => {
    console.log('Simple Server running on 3003 ');
  });
});
