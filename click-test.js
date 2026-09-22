const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4000/feed');
  await page.waitForSelector('a[href^="/feed/"]');
  
  // Click the first order
  await page.click('a[href^="/feed/"]');
  await page.waitForSelector('[data-cy="modal"]');
  
  // Try to click the second order
  const links = await page.$$('a[href^="/feed/"]');
  if (links.length > 1) {
    try {
      await links[1].click({ timeout: 1000, force: false }); // Should fail if covered
      console.log('SUCCESS_CLICKED_BEHIND_MODAL');
    } catch (e) {
      console.log('BLOCKED_AS_EXPECTED');
    }
  }
  await browser.close();
})();
