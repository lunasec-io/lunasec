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
