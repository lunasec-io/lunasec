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
  // this cookie is our session cookie that was created in our demo app when a user logged in
  const cookie = req.cookies['id_token'];
  if (!cookie) {
    return null; // returning null tells LunaSec that a session is not set
  }

  try {
    const jwtData = await decodeJWT(cookie, pubKey);

    return jwtData.session.id;
  } catch (e) {
    console.error(e);
    return null;
  }
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
    reject(new Error('unable to parse jwt due to unknown error'))
  });
}
