import puppeteer, {Browser, Page} from 'puppeteer';

export async function setupPuppeteerSession(): Promise<{ page: Page, browser: Browser }> {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--proxy-server=' + process.env.PROXY_SERVER
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

    await page.authenticate({
        username: process.env.PROXY_USER,
        password: process.env.PROXY_PASSWORD
    });

    return {
        page,
        browser
    };
}
