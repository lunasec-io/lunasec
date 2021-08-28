import crypto from 'crypto';

import { Router } from 'express';
import passport from 'passport';

import { getDb } from '../config/db';

export function authRouter() {
  const router = Router();

  router.post('/login', (req, res, next) => {
    passport.authenticate('json', (err, user) => {
      if (err) {
        return res.json({
          success: false,
          error: err,
        });
      }
      return req.login(user, function (err) {
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
    })(req, res, next);
  });

  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  router.post('/signup', async (req, res) => {
    const db = await getDb();
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 10000, 32, 'sha256', async function (err, hashedPassword) {
      if (err) {
        return res.json({
          success: false,
          error: err,
        });
      }

      return db
        .run('INSERT INTO users (username, hashed_password, salt, name) VALUES (?, ?, ?, ?)', [
          req.body.username,
          hashedPassword,
          salt,
          req.body.name,
        ])
        .then((result) => {
          if (!result.lastID) {
            throw new Error('db error');
          }
          const user = {
            id: result.lastID.toString(),
            username: req.body.username,
            displayName: req.body.name,
          };
          return req.login(user, function (err) {
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
        })
        .catch((err) => {
          return res.json({
            success: false,
            error: err,
          });
        });
    });
  });

  return router;
}
