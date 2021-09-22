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
import bodyParser from 'body-parser';
import { Router } from 'express';

import { Models } from '../../../common/models';
import { ensureLoggedIn } from '../config/auth-helpers';
import { lunaSec } from '../config/configure-lunasec';

export function userRouter(models: Models) {
  const router = Router();

  router.use(bodyParser.json());

  /* GET users listing. */
  router.get('/me', ensureLoggedIn, async (req, res) => {
    const user = req.user;
    if (user.ssn_token) {
      await lunaSec.grants.create(req.session.id, user.ssn_token);
    }
    res.json({
      success: true,
      user,
    });
  });

  router.post('/set-ssn', ensureLoggedIn, async (req, res) => {
    if (!req.user) {
      return res.json({
        success: false,
        error: 'User not logged in',
      });
    }
    try {
      console.log('In express router session id is ', req.session.id);
      await lunaSec.grants.verify(req.session.id, req.body.ssn_token);
      await models.user.setSsn(req.user.id, req.body.ssn_token);
    } catch (e) {
      return res.json({
        success: false,
        error: e,
      });
    }

    return res.json({
      success: true,
    });
  });

  return router;
}
