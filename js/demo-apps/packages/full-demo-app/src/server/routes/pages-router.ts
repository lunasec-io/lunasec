import { Router } from 'express';
import { getManifest } from './manifest-manager';

export function pagesRouter() {
  const router = Router();

  router.get(`/**`, async (_, res) => {
    const manifest = await getManifest();
    res.render('page.ejs', { manifest });
  });

  return router;
}
