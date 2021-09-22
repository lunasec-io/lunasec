/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
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
