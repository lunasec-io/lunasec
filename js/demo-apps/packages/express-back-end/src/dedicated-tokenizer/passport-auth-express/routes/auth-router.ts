import crypto from 'crypto';

import { Router } from 'express';
import passport from 'passport';

import { db } from '../db';

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
      req.login(user, function (err) {
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

  router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
  });

  router.post('/signup', function (req, res, next) {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 10000, 32, 'sha256', function (err, hashedPassword) {
      if (err) {
        return res.json({
          success: false,
          error: err,
        });
      }

      db.run(
        'INSERT INTO users (username, hashed_password, salt, name) VALUES (?, ?, ?, ?)',
        [req.body.username, hashedPassword, salt, req.body.name],
        function (err) {
          if (err) {
            return res.json({
              success: false,
              error: err,
            });
          }

          const user = {
            id: this.lastID.toString(),
            username: req.body.username,
            displayName: req.body.name,
          };
          req.login(user, function (err) {
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
        },
      );
    });
  });

  return router;
}
