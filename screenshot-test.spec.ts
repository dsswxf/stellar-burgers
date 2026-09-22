import { test, expect } from '@playwright/test';

test('take screenshot of modal', async ({ page }) => {
  await page.goto('http://localhost:4000/feed');
  // Wait for orders to load
  await page.waitForSelector('a[href^="/feed/"]');
  const links = page.locator('a[href^="/feed/"]');
  await links.first().click();
  // Wait for modal
  await expect(page.locator('[data-cy="modal"]')).toBeVisible();
  await page.screenshot({ path: 'modal-open.png' });
});
