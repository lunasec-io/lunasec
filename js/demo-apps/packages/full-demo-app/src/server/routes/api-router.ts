import bodyParser from 'body-parser';
import { Router } from 'express';
import { users, getUserById } from '../db';

export function apiRouter() {
  const router = Router();
  router.use(bodyParser.json());

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
