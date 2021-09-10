import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { buildContext as buildPassportContext, PassportContext } from 'graphql-passport';

import { UserModel } from '../../../common/models/user';

import { resolvers, schemaDirectives, typeDefs } from './schema';

export async function attachApolloServer(app: Express): Promise<void> {
  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers,
    schemaDirectives,
    context: buildPassportContext,
  });
  await server.start();

  server.applyMiddleware({ app, cors: false });
}

export type AppContext = PassportContext<UserModel, { username: string; password: string }>;

// export interface ContextWithSessionId {
//   sessionId: string | null;
//   req: Express.Request; // Request has req.user declared in the global.d.ts file for use with passport
//   res: Express.Response;
// }
//
// // Adds the session ID to the context object for easy access in resolvers
// // This is kind of like Apollo's version of a middleware
// async function addSessionToContext(context: { req: Request; res: Response }): Promise<ContextWithSessionId> {
//   const sessionId = await readSessionFromRequest(context.req);
//
//   return { sessionId: sessionId, req: context.req, res: context.res };
// }
