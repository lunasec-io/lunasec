import { Request } from 'express';
import jwt from 'jsonwebtoken';
const __PUBLIC_KEY__ = process.env.SESSION_JWT_PUBLIC_KEY as string;

interface TokenData {
  session: { id: string };
}
// Pull the public key to verify the session JWT from an environment variable and turn it into a keyobject, then use it to decode the session
export async function readSessionFromRequest(req: Request) {
  if (__PUBLIC_KEY__ === undefined) {
    throw new Error('Unable to read secret from environment variable: SESSION_JWT_PUBLIC_KEY');
  }
  const pubKey = Buffer.from(__PUBLIC_KEY__, 'base64').toString();
  const cookie = req.cookies['id_token'];
  if (!cookie) {
    throw new Error('Session cookie not set');
  }

  const jwtData = await decodeJWT(cookie, pubKey);
  // This is a good place to catch errors and redirect to a login flow if your user does not have their cookie set
  return jwtData.session.id;
}

function decodeJWT(encodedJwt: string, pubKey: string): Promise<TokenData> {
  return new Promise((resolve, reject) => {
    jwt.verify(encodedJwt, pubKey, { algorithms: ['RS256'] }, (err, data) => {
      if (err) {
        return reject(err);
      }
      if (!data || !('session' in data) || !('id' in data.session)) {
        return reject(new Error('session info missing from JWT'));
      }
      resolve(data as TokenData);
    });
  });
}
