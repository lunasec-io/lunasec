require('dotenv').config()
import Queue from 'queue';
import {Session, setupPuppeteerSession} from './setup-puppeteer';

import {SqliteCache} from './sqlite-cache';

async function getUrlsToScrape(): Promise<string[]> {
  // STUBBED
  return Promise.resolve(['https://snyk.io/vuln/SNYK-JAVA-ORGWEBJARSNPM-1568506']);
}

function scrapeElementText(el:Element): string {

  if (!(el instanceof HTMLElement)){
    return ''
  }
  return el.innerText;
}

function timeout(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const sqliteCache = new SqliteCache('cache.db');

  const session = await setupPuppeteerSession();

  const queue = new Queue({
    concurrency: 8,
    autostart: true,
    timeout: 10000
  });

  const urlsToScrape = await getUrlsToScrape();

  urlsToScrape.forEach( async (url) => {
    queue.push(() => {
      return scrape(url, session)
    })
    queue.on('success', (result, job) => {
      console.log('queue resolved with ', result)
    })

  });
})();

async function scrape(url:string, session: Session):Promise<string>{
  try {
    const page = await session.browser.newPage()
    await page.setUserAgent("Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)");
    await page.goto(url, {waitUntil: "networkidle0"})
    await timeout(2000)
    return await page.$eval('*', scrapeElementText) as string;

  } catch (e) {
    console.log(`failed to scrape url ${url} with error ${String(e)}`)
    throw e
  }
}




