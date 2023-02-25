import {Browser, Page} from 'puppeteer';
import Queue from 'queue';
import {setupPuppeteerSession} from './setup-puppeteer';

import SqliteCache from './sqlite-cache';

async function getUrlsToScrape(): Promise<string[]> {
  // STUBBED
  return [];
}

(async () => {
  const sqliteCache = new SqliteCache('cache.db');

  const session = await setupPuppeteerSession();

  const queue = new Queue({
    concurrency: 8,
    autostart: true
  });

  const urlsToScrape = await getUrlsToScrape();

  urlsToScrape.forEach(url => {
    session.
  });
})();
return [];
