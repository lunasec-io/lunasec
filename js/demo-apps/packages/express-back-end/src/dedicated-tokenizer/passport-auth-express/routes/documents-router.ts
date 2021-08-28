import bodyParser from 'body-parser';
import { Router } from 'express';

import { ensureLoggedIn } from '../config/auth-helpers';
import { getDb } from '../config/db';

export function documentsRouter() {
  const router = Router();

  router.use(ensureLoggedIn);
  router.use(bodyParser.json());

  router.get('/', ensureLoggedIn, async (req, res, next) => {
    const db = await getDb();
    if (!req.user) {
      throw new Error('not logged in and not caught by middleware');
    }
    const rows = await db.all('SELECT token FROM documents WHERE user_id = ?', [req.user.id]).catch((e) => next(e));

    if (!rows) {
      return res.json({ success: true, documents: [] });
    }

    const documents = rows.map((r) => r.token);
    return res.json({
      success: true,
      documents: documents,
    });
  });

  router.post('/', ensureLoggedIn, async (req, res, next) => {
    const db = await getDb();
    const documentTokens = req.body.documents as string[];
    documentTokens.forEach((documentToken) => {
      db.run('INSERT INTO documents (user_id, token) VALUES (?, ?)', [req.user.id, documentToken]).catch((e) => {
        next(e);
      });
    });
    return res.json({
      success: true,
    });
  });

  return router;
}
