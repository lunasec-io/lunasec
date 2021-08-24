import bodyParser from 'body-parser';
import { Router } from 'express';

import { ensureLoggedIn } from '../auth';
import { db } from '../db';

export function documentsRouter() {
  const router = Router();

  router.use(ensureLoggedIn);
  router.use(bodyParser.json());

  router.get('/', function (req, res, next) {
    db.all('SELECT token FROM documents WHERE user_id = ?', [req.user.id], function (err, rows) {
      if (err) {
        return next(err);
      }

      const documents = rows.map((r) => r.token);

      res.json({
        success: true,
        documents: documents,
      });
    });
  });

  router.post('/', function (req, res, next) {
    const documentTokens = req.body.documents;
    documentTokens.forEach((documentToken) => {
      db.run('INSERT INTO documents (user_id, token) VALUES (?, ?)', [req.user.id, documentToken], function (err) {
        console.error(err);
      });
    });
    return res.json({
      success: true,
    });
  });

  return router;
}
