import { test, expect } from '@playwright/test';
test('log request urls', async ({ page }) => {
  page.on('request', request => console.log('>>', request.method(), request.url()));
  await page.goto('/');
  await page.waitForTimeout(5000);
});
