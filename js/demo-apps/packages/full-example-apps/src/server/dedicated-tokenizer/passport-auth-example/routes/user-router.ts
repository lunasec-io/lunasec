import bodyParser from 'body-parser';
import { Router } from 'express';
import {db} from '../db';
import {ensureLoggedIn} from "../auth";
import {lunaSec} from "../configure-lunasec";
import {GrantType} from "@lunasec/tokenizer-sdk";

export function userRouter() {
  const router = Router();

  router.use(ensureLoggedIn);
  router.use(bodyParser.json());

  /* GET users listing. */
  router.get('/me',
      (req, res, next) => {
        db.get('SELECT rowid AS id, username, name, ssn_token FROM users WHERE rowid = ?', [
            req.user.id
          ], async function(err, row) {
          if (err) {
            return res.json({
              success: false,
              error: err.toString()
            });
          }

          const ssnToken = row.ssn_token;

          try {
            await lunaSec.grants.create(req.user.id, ssnToken);
          } catch (e) {
            return res.json({
              success: false,
              error: e
            })
          }

          // TODO: Handle undefined row.

          const user = {
            id: row.id.toString(),
            username: row.username,
            displayName: row.name,
            ssnToken: row.ssn_token
          };
          res.json({
              success: true,
              user: user
          });
        });
      });

  router.post('/me',
    async (req, res, next) => {
      const {properties} = req.body;

      const ssnToken = properties.ssnToken;

      try {
        await lunaSec.grants.verify(req.user.id, ssnToken, GrantType.StoreToken);
      } catch (e) {
        return res.json({
          success: false,
          error: e
        })
      }

      db.run('UPDATE users SET ssn_token = ? WHERE rowid = ?', [
        properties.ssnToken,
        req.user.id
      ], function(err) {
        if (err) {
          return res.json({
            success: false,
            error: err.toString()
          });
        }
        return res.json({
          success: true
        });
      });
    });

  return router;
}
