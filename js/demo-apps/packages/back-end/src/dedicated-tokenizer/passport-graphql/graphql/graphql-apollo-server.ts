import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { buildContext as buildPassportContext, PassportContext } from 'graphql-passport';

import { UserModel } from '../../../common/models/user';

import { resolvers, schemaDirectives, typeDefs } from './schema';

export async function attachApolloServer(app: Express): Promise<void> {
  console.log('attaching apollo server to express');
  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers,
    schemaDirectives,
    context: buildPassportContext,
  });
  await server.start();

  server.applyMiddleware({ app, cors: false });
}

export type AppContext = PassportContext<UserModel, { username: string; password?: string; id?: string }>;
