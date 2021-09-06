import bodyParser from 'body-parser';
import { Router } from 'express';

import { ensureLoggedIn } from '../config/auth-helpers';
import { lunaSec } from '../config/configure-lunasec';
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
    await lunaSec.grants.create(req.user.id, documents);
    return res.json({
      success: true,
      documents: documents,
    });
  });

  router.post('/', ensureLoggedIn, async (req, res, next) => {
    const db = await getDb();
    const documentTokens = req.body.documents as string[];
    await db.run('DELETE FROM documents WHERE user_id = (?)', req.user.id); // clear out any old documents
    const insertionPromises: Promise<any>[] = [];
    documentTokens.forEach((documentToken) => {
      insertionPromises.push(
        db.run('INSERT INTO documents (user_id, token) VALUES (?, ?)', [req.user.id, documentToken]).catch((e) => {
          next(e);
        })
      );
    });
    await Promise.all(insertionPromises);
    return res.json({
      success: true,
    });
  });

  return router;
}
