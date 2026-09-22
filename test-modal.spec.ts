import { test, expect } from '@playwright/test';
test('test modal blocking', async ({ page }) => {
  await page.goto('http://localhost:4000/feed');
  // Wait for orders to load
  await page.waitForSelector('.text_type_digits-default');
  const links = page.locator('a[href^="/feed/"]');
  // Click first order
  await links.first().click();
  // Wait for modal
  await expect(page.locator('[data-cy="modal"]')).toBeVisible();
  
  // Try to click second order
  const secondLink = links.nth(1);
  const isClickable = await secondLink.isVisible();
  console.log("Is clickable?", isClickable);
  try {
    await secondLink.click({ timeout: 2000 });
    console.log("Clicked second order while modal open!");
  } catch(e) {
    console.log("Could not click second order");
  }
});
