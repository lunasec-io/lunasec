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

import { Models } from '../../common/models';

export function userRouter(models: Models) {
  const router = Router();

  router.use(bodyParser.json());

  /* GET users listing. */

  router.get('/me', async (_req, res) => {
    const user = await models.user.getUser('1'); // Just get the pre-created user from the db migration
    res.json({
      success: true,
      user,
    });
  });

  router.post('/set-ssn', async (req, res) => {
    try {
      // Note the lack of grant checking.  There are no grants in the simple-tokenizer.  If you have the token you can get the data, simple.
      await models.user.setSsn('1', req.body.ssn_token); // just set the ssn on our pre-created user(that was created in db migration), this is a really simple demo
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
