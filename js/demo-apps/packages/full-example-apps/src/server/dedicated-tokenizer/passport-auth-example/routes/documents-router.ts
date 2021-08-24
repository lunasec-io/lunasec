import bodyParser from 'body-parser';
import { Router } from 'express';
import {db} from '../db';
import {ensureLoggedIn} from "../auth";
import {lunaSec} from "../configure-lunasec";
import {GrantType} from "@lunasec/tokenizer-sdk";

export function documentsRouter() {
  const router = Router();

  router.use(ensureLoggedIn);
  router.use(bodyParser.json());

  router.get('/',
    function(req, res, next) {
      db.all('SELECT token FROM documents WHERE user_id = ?', [ req.user.id ], async function(err, rows) {
        if (err) { return next(err); }

        const documents = rows.map((r) => r.token);

        try {
          await lunaSec.grants.create(req.user.id, documents);
        } catch (e) {
          return res.json({
            success: false,
            error: e
          })
        }

        res.json({
          success: true,
          documents: documents
        });
      });
    });

  router.post('/',
    async function(req, res, next) {
      const documentTokens = req.body.documents;

      try {
        await lunaSec.grants.verify(req.user.id, documentTokens, GrantType.StoreToken);
      } catch (e) {
        return res.json({
          success: false,
          error: e
        })
      }

      documentTokens.forEach(documentToken => {
        db.run('INSERT INTO documents (user_id, token) VALUES (?, ?)', [
          req.user.id,
          documentToken,
        ], function(err) {
          console.error(err);
        });
      });
      return res.json({
        success: true
      })
    });

  return router;
}
