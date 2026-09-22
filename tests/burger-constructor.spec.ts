import { test, expect } from '@playwright/test';

test.describe('Burger Constructor functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/network.har', {
      url: /.*\/api\/ingredients/,
      update: false
    });
    
    await page.goto('/');
  });

  test('should open ingredient modal and close it via cross and overlay', async ({ page }) => {
    // Open modal
    const ingredient = page.locator('[data-cy="ingredient-item"]').first();
    await ingredient.click();

    // Verify modal is visible and contains ingredient name
    const modal = page.locator('[data-cy="modal"]'); // need to add data-cy or use text
    // Wait for a text in modal
    await expect(modal.getByText('Детали ингредиента')).toBeVisible();
    await expect(modal.getByText('Краторная булка N-200i')).toBeVisible();

    // Close via cross
    const closeButton = page.locator('[data-cy="modal-close-button"]');
    await closeButton.click();
    await expect(page.getByText('Детали ингредиента')).toBeHidden();

    // Open again to test overlay
    await ingredient.click();
    await expect(page.getByText('Детали ингредиента')).toBeVisible();

    // Click overlay
    const overlay = page.locator('[data-cy="modal-overlay"]');
    await overlay.click({ position: { x: 10, y: 10 } }); // click outside modal content
    await expect(page.getByText('Детали ингредиента')).toBeHidden();
  });

  test('should add ingredients to constructor', async ({ page }) => {
    // Click "Добавить" button for bun
    const bun = page.locator('[data-cy="ingredient-item"]').filter({ hasText: 'Булка' }).first();
    await bun.locator('..').getByRole('button', { name: 'Добавить' }).click();

    // Click "Добавить" button for main ingredient
    const main = page.locator('[data-cy="ingredient-item"]').filter({ hasText: 'Филе' }).first();
    await main.locator('..').getByRole('button', { name: 'Добавить' }).click();

    // Verify they are added (top bun, bottom bun, and main ingredient)
    const constructorBuns = page.locator('.constructor-element_pos_top');
    await expect(constructorBuns).toBeVisible();
  });
});

test.describe('Order Creation functionality', () => {
  test.beforeEach(async ({ page, context }) => {
    // Mock local storage and cookies
    await context.addCookies([
      { name: 'accessToken', value: 'Bearer fake-token', domain: 'localhost', path: '/' }
    ]);
    
    await page.addInitScript(() => {
      window.localStorage.setItem('refreshToken', 'fake-refresh-token');
    });

    await page.routeFromHAR('tests/hars/network.har', {
      url: /.*\/api\/auth\/user/,
      update: false
    });

    await page.routeFromHAR('tests/hars/network.har', {
      url: /.*\/api\/orders/,
      update: false
    });

    await page.routeFromHAR('tests/hars/network.har', {
      url: /.*\/api\/ingredients/,
      update: false
    });

    await page.goto('/');
  });

  test('should place order and show order modal', async ({ page }) => {
    // Click "Добавить" button for bun
    const bun = page.locator('[data-cy="ingredient-item"]').filter({ hasText: 'Булка' }).first();
    await bun.locator('..').getByRole('button', { name: 'Добавить' }).click();

    // Click "Добавить" button for main ingredient
    const main = page.locator('[data-cy="ingredient-item"]').filter({ hasText: 'Филе' }).first();
    await main.locator('..').getByRole('button', { name: 'Добавить' }).click();

    // Click order button
    const orderButton = page.getByRole('button', { name: 'Оформить заказ' });
    await orderButton.click();

    // Verify modal is opened
    await expect(page.getByText('123456')).toBeVisible();

    // Close modal
    const closeButton = page.locator('[data-cy="modal-close-button"]');
    await closeButton.click();
    await expect(page.getByText('123456')).toBeHidden();
  });
});
