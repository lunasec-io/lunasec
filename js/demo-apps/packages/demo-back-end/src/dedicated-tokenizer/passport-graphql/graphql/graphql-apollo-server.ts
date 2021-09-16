import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { Express } from 'express';
import { buildContext as buildPassportContext, PassportContext } from 'graphql-passport';

import { Models } from '../../../common/models';
import { UserModel } from '../../../common/models/user';

import { resolvers, schemaDirectives, typeDefs } from './schema';

export async function attachApolloServer(app: Express, models: Models): Promise<void> {
  console.log('attaching apollo server to express');

  function buildContext(context: ExpressContext) {
    return {
      ...buildPassportContext(context),
      models,
    };
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers,
    schemaDirectives,
    context: buildContext,
  });
  await server.start();

  server.applyMiddleware({
    app,
    cors: {
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200,
      methods: ['GET', 'PUT', 'POST'],
      credentials: true,
    },
  });
}

export interface AppContext extends PassportContext<UserModel, { username: string; password?: string; id?: string }> {
  models: Models;
}
