import bodyParser from 'body-parser';
import { Router } from 'express';
import { users, getUserById } from '../db';
import {lunaSec} from "../configure-lunasec";
import {randomUUID} from "crypto";

export function apiRouter() {
  const router = Router();
  router.use(bodyParser.json());

  // TODO currently does not set a specific user
  router.get('/api/user/login', async function (_, res) {
    const id_token = await lunaSec.auth.createAuthenticationJWT('user', {
      session: {
        id: randomUUID()
      }
    });
    res.cookie('id_token', id_token.toString())
    res.redirect('back')
  });

  router.get('/api/users', (req, res) => {
    res.json(users);
  });

  router.get('/api/user/:userId', (req, res) => {
    const userId = req.params.userId;
    res.json(getUserById(userId));
  });

  router.post('/api/set-user', (req, res) => {
    res.send(`ok`);
  });

  return router;
}
