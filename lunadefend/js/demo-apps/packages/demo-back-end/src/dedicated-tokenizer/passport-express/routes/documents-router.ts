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

export function documentsRouter(models: Models) {
  const router = Router();

  router.use(ensureLoggedIn);
  router.use(bodyParser.json());

  router.get('/', async (req, res) => {
    if (!req.user) {
      throw new Error('not logged in and not caught by middleware');
    }
    try {
      const documentRecords = await models.documents.getUserDocuments(req.user.id);
      const documents = documentRecords.map((r) => r.token);
      await lunaSec.grants.create(req.user.id, documents);
      return res.json({
        success: true,
        documents: documents,
      });
    } catch (e) {
      return res.send({
        success: false,
        error: e,
      });
    }
  });

  router.post('/', async (req, res) => {
    const documentTokens = req.body.documents as string[];
    try {
      await lunaSec.grants.verify(req.session.id, documentTokens); // Handles arrays of tokens like this in addition to individual tokens
      await models.documents.setUserDocuments(req.user.id, documentTokens);
    } catch (e) {
      return res.send({
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
