import { Router } from 'express';
import passport from 'passport';

import { UserMethods } from '../../../common/models/user';

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
          user: user,
        });
      });
    })(req, res, next);
  });

  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  router.post('/signup', async (req, res) => {
    try {
      const user = await UserMethods.createNewUser(req.body);
      return req.login(user, function (err: Error) {
        if (err) {
          throw err;
        }
        return res.json({
          success: true,
          user: user,
        });
      });
    } catch (err) {
      return res.json({
        success: false,
        error: err,
      });
    }
  });

  return router;
}
