import util from 'util';

import { Request } from 'express';
import jwt from 'jsonwebtoken';
const __PUBLIC_KEY__ = process.env.SESSION_JWT_PUBLIC_KEY as string;

// Pull the public key to verify the session JWT from an environment variable and turn it into a keyobject, then use it to decode the session
export async function readSessionFromRequest(req: Request) {
  if (__PUBLIC_KEY__ === undefined) {
    throw new Error('Unable to read secret from environment variable: SESSION_JWT_PUBLIC_KEY');
  }
  const pubKey = Buffer.from(__PUBLIC_KEY__, 'base64').toString();
  // Get the JWT from the cookie
  const cookie = req.cookies['id_token'];
  // @ts-ignore util.promisify is not handling typing correctly
  const jwtData = (await util.promisify(jwt.verify)(cookie, pubKey, { algorithms: ['RS256'] })) as {
    session: { id: string };
  };
  if (!('session' in jwtData) || !('id' in jwtData.session)) {
    throw new Error('session info missing from JWT');
  }
  return jwtData.session.id;
}
