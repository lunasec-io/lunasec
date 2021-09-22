import { Router } from 'express';

import { Models } from '../../../common/models';
import { ensureLoggedIn } from '../config/auth-helpers';
import { configurePassport } from '../config/configure-passport';

export function authRouter(models: Models, passport: ReturnType<typeof configurePassport>) {
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

  router.get('/logout', ensureLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/');
  });

  router.post('/signup', async (req, res) => {
    try {
      const user = await models.user.createNewUser(req.body);
      console.log('created new user ', user);
      return req.login(user, function (err: Error) {
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
    } catch (err) {
      return res.json({
        success: false,
        error: err,
      });
    }
  });

  return router;
}
