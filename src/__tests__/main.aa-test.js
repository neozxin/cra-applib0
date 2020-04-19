import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

let browser, page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.setViewport({ width: 960, height: 1080 });
  return page;
});

describe('For image regression:', () => {
  it('default view', async () => {
    await page.goto(
      'http://localhost:8881' /*, { waitUntil: 'networkidle2' }*/
    );
    // console.log('[xxxxx] page content:', await page.content());
    const image = await page.screenshot(/*{ path: 'test.png' }*/);
    // await page.pdf({ path: 'test.pdf', format: 'A4' });
    // expect(image).toMatchImageSnapshot(/*{ failureThreshold: '5' }*/);
    // await page.click('a.App-link');
  });
});
