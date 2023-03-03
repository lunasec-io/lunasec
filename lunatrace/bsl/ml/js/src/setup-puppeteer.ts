import {Browser, Page} from 'puppeteer';
import puppeteer from 'puppeteer-extra'
// import  from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
puppeteer.use(StealthPlugin())


export interface Session {
    page: Page;
    browser: Browser
}
export async function setupPuppeteerSession(): Promise<Session> {
    const browser = await puppeteer.launch({
        headless: true,
        args: [

        ]
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 920 });
    await page.setRequestInterception(true);

    page.on('request', (req) => {
        if (req.resourceType() === 'stylesheet' || req.resourceType() === 'image'){
            req.abort();
        }
        else {
            req.continue();
        }
    });

    // TODO: Figure out status code response filtering?

    const username = process.env.PROXY_USER
    const password = process.env.PROXY_PASSWORD
    if (!username || !password){
        throw new Error('No Username or password env vars for proxy')
    }
    await page.authenticate({
        username,
        password
    });

    return {
        page,
        browser
    };
}
