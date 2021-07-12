import { LunaSecApolloPlugin } from '@lunasec/node-sdk';
import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';

import { context, resolvers, schemaDirectives, typeDefs } from './schema';

export async function attachApolloServer(app: Express) {
  // @ts-ignore
  const server = new ApolloServer({
    typeDefs,
    //@ts-ignore THIS IS BAD, FIX THIS.  It doesn't like the mutations
    resolvers,
    schemaDirectives,
    plugins: [LunaSecApolloPlugin],
    context,
  });
  await server.start();

  server.applyMiddleware({ app });
}
