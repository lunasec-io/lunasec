import bodyParser from 'body-parser';
import { Router } from 'express';

import { ensureLoggedIn } from '../config/auth-helpers';
import { getDb } from '../config/db';

export function userRouter() {
  const router = Router();

  router.use(ensureLoggedIn);
  router.use(bodyParser.json());

  /* GET users listing. */
  router.get('/me', ensureLoggedIn, async (req, res, next) => {
    const db = await getDb();
    const row = await db
      .get('SELECT rowid AS id, username, name FROM users WHERE rowid = ?', [req.user.id])
      .catch((err) => next(err));
    // TODO: Handle undefined row.
    res.json({
      success: true,
      user: {
        id: row.id.toString(),
        username: row.username,
        displayName: row.name,
      },
    });
  });

  router.post('/me', ensureLoggedIn, async (req, res) => {
    if (!req.user) {
      return res.json({
        success: false,
      });
    }
    const db = await getDb();
    return db.run('UPDATE users SET ssn_token = ? WHERE rowid = ?', [req.body.ssnToken, req.user.id]).catch((err) => {
      if (err) {
        return res.json({
          success: false,
          error: err,
        });
      }
      return res.json({
        success: true,
      });
    });
  });

  return router;
}
