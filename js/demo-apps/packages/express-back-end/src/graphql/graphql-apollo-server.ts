import { ApolloServer } from 'apollo-server-express';
import { Express, Request, Response } from 'express';

import { readSessionFromRequest } from '../read-session-from-request';

import { resolvers, schemaDirectives, typeDefs } from './schema';

export async function attachApolloServer(app: Express) {
  // @ts-ignore
  const server = new ApolloServer({
    typeDefs,
    //@ts-ignore THIS IS BAD, FIX THIS.  It doesn't like the mutations (they work fine of course)
    resolvers,
    schemaDirectives,
    // plugins: [LunaSecApolloPlugin],
    context: addSessionToContext,
  });
  await server.start();

  server.applyMiddleware({ app, cors: false });
}

// USER AUTH
// Verifies the users session cookie and adds the session ID to the context object for easy access in resolvers
async function addSessionToContext(context: { req: Request; res: Response }): Promise<Record<string, any>> {
  const sessionId = await readSessionFromRequest(context.req);

  return { sessionId: sessionId, req: context.req, res: context.res };
}
