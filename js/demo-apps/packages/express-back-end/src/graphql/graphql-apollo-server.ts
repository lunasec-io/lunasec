// import { LunaSecApolloPlugin } from '@lunasec/node-sdk';
import util from 'util';

import { ApolloServer } from 'apollo-server-express';
import { Express, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { resolvers, schemaDirectives, typeDefs } from './schema';

const __PUBLIC_KEY__ = process.env.SESSION_JWT_PUBLIC_KEY as string;

export async function attachApolloServer(app: Express) {
  // @ts-ignore
  const server = new ApolloServer({
    typeDefs,
    //@ts-ignore THIS IS BAD, FIX THIS.  It doesn't like the mutations
    resolvers,
    schemaDirectives,
    // plugins: [LunaSecApolloPlugin],
    context: addSessionToContext,
  });
  await server.start();

  server.applyMiddleware({ app });
}

// USER AUTH
// Verifies the users session cookie and adds the session ID to the context object for easy access in resolvers
async function addSessionToContext(context: { req: Request; res: Response }): Promise<Record<string, any>> {
  // Pull the public key to verify the session JWT from an environment variable and turn it into a keyobject
  if (__PUBLIC_KEY__ === undefined) {
    throw new Error('Unable to read secret from environment variable: SESSION_JWT_PUBLIC_KEY');
  }
  const pubKey = Buffer.from(__PUBLIC_KEY__, 'base64').toString();
  // Get the JWT from the cookie
  const cookie = context.req.cookies['id_token'];
  // @ts-ignore util.promisify is not handling typing correctly
  const jwtData = (await util.promisify(jwt.verify)(cookie, pubKey, { algorithms: ['RS256'] })) as {
    session: { id: string };
  };
  if (!('session' in jwtData) || !('id' in jwtData.session)) {
    throw new Error('session info missing from JWT');
  }
  return { sessionId: jwtData.session.id, req: context.req, res: context.res };
}
