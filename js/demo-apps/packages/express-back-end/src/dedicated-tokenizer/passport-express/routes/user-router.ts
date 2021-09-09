import bodyParser from 'body-parser';
import { Router } from 'express';

import { UserMethods } from '../../../common/models/user';
import { lunaSec } from '../../../configure-lunasec';
import { ensureLoggedIn } from '../config/auth-helpers';

export function userRouter() {
  const router = Router();

  router.use(ensureLoggedIn);
  router.use(bodyParser.json());

  /* GET users listing. */
  router.get('/me', ensureLoggedIn, async (req, res) => {
    const user = req.user;
    if (user.ssn_token) {
      await lunaSec.grants.create(req.session.id, user.ssn_token);
    }
    res.json({
      success: true,
      user,
    });
  });

  router.post('/set-ssn', ensureLoggedIn, async (req, res) => {
    if (!req.user) {
      return res.json({
        success: false,
      });
    }

    try {
      await lunaSec.grants.verify(req.session.id, req.body.ssnToken);
      await UserMethods.setSsn(req.user.id, req.body.ssnToken);
    } catch (e) {
      return res.json({
        success: false,
        error: e,
      });
    }

    return res.json({
      success: true,
    });
  });

  return router;
}
