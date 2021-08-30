import bodyParser from 'body-parser';
import { Router } from 'express';

import { lunaSec } from '../../../configure-lunasec';
import { ensureLoggedIn } from '../config/auth-helpers';
import { getDb } from '../config/db';

export function userRouter() {
  const router = Router();

  router.use(ensureLoggedIn);
  router.use(bodyParser.json());

  /* GET users listing. */
  router.get('/me', ensureLoggedIn, async (req, res) => {
    const user = req.user;
    console.log('/me fetched user');
    if (user.ssn_token) {
      await lunaSec.grants.create(req.user.id, user.ssn_token);
      console.log('created grant from token');
    }
    res.json({
      success: true,
      user,
    });
  });

  router.post('/me', ensureLoggedIn, async (req, res) => {
    if (!req.user) {
      return res.json({
        success: false,
      });
    }
    const db = await getDb();
    await db.run('UPDATE users SET ssn_token = ? WHERE rowid = ?', [req.body.ssnToken, req.user.id]).catch((err) => {
      return res.json({
        success: false,
        error: err,
      });
    });

    return res.json({
      success: true,
    });
  });

  return router;
}
