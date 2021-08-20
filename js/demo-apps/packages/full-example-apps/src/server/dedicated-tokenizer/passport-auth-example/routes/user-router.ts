import bodyParser from 'body-parser';
import { Router } from 'express';
import {db} from '../db';
import {ensureLoggedIn} from "../auth";

export function userRouter() {
  const router = Router();

  router.use(ensureLoggedIn);
  router.use(bodyParser.json());

  /* GET users listing. */
  router.get('/me',
      (req, res, next) => {
        db.get('SELECT rowid AS id, username, name FROM users WHERE rowid = ?', [ req.user.id ], function(err, row) {
          if (err) { return next(err); }

          // TODO: Handle undefined row.

          const user = {
            id: row.id.toString(),
            username: row.username,
            displayName: row.name
          };
          res.json({
              success: true,
              user: user
          });
        });
      });

  router.post('/me',
    (req, res, next) => {
      db.run('UPDATE users SET ssn_token = ? WHERE rowid = ?', [
        req.body.ssnToken,
        req.user.id
      ], function(err) {
        if (err) {
          return res.json({
            success: false,
            error: err
          });
        }
        return res.json({
          success: true
        });
      });
    });

  return router;
}
