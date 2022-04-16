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
import { NextFunction, Request, Response } from 'express';

export function ensureLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    return next();
  }
  return res.json({
    success: false,
    error: 'user is not logged in',
  });
}

// Tell LunaSec how to read a user identifier out of the request object.  Technically any ID will work, but the sessionId is often a good choice.
// If you'd like to allow users to use LunaSec elements without being logged in, consider generating a temporary session for them.
export function lunaSecSessionIdProvider(req: Request): Promise<string | null> {
  // LunaSec expects this to return a promise in case we need to do something async
  return new Promise((resolve) => {
    console.log(`creating LunaSec session with session id: ${req.session.id}`);
    if (req.session.id) {
      return resolve(req.session.id);
    }
    return resolve(null); // LunaSec Elements will not work in this case
  });
}
