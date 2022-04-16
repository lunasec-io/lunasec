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
import { Router } from 'express';

import { Models } from '../../../common/models';
import { ensureLoggedIn } from '../config/auth-helpers';
import { configurePassport } from '../config/configure-passport';

export function authRouter(models: Models, passport: ReturnType<typeof configurePassport>) {
  const router = Router();

  router.post('/login', (req, res, next) => {
    passport.authenticate('json', (err, user: Express.User) => {
      if (err) {
        return res.json({
          success: false,
          error: err,
        });
      }
      return req.login(user, function (err) {
        if (err) {
          return res.json({
            success: false,
            error: err,
          });
        }
        return res.json({
          success: true,
          user: user,
        });
      });
    })(req, res, next);
  });

  router.get('/logout', ensureLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/');
  });

  router.post('/signup', async (req, res) => {
    try {
      const body = req.body as { username: string; password: string };
      const user = await models.user.createNewUser(body);
      return req.login(user, function (err: Error) {
        if (err) {
          return res.json({
            success: false,
            error: err,
          });
        }
        return res.json({
          success: true,
          user: user,
        });
      });
    } catch (err) {
      return res.json({
        success: false,
        error: err,
      });
    }
  });

  return router;
}
