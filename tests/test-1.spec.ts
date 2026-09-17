import { test, expect } from '@playwright/test';

test('Verify default Total value is zero', async ({ page }) => {
await page.goto('https://coffee-cart.app/');
await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $0.00');
});

test('Verify adding item to cart and successful payment', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Olesya');
  await page.getByRole('textbox', { name: 'Name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Email' }).fill('test@mail.com');
  await page.getByRole('checkbox', { name: 'Promotion checkbox' }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
});

test('Verify promo after adding 3 items to cart', async ({ page }) => {

await page.goto('https://coffee-cart.app/');
await page.locator('[data-test="Flat_White"]').click();
await page.locator('[data-test="Cappuccino"]').click();
await page.locator('[data-test="Cafe_Breve"]').click();
await page.getByRole('button', { name: 'Yes, of course!' }).click();
await page.getByRole('listitem').filter({ hasText: 'cart (4)' }).click();
//await page.getByRole('link', { name: 'Cart page' }).click();
await expect(page.locator('#app')).toContainText('(Discounted)');
});

test('Verify manipulation of cart items', async ({ page }) => {

await page.goto('https://coffee-cart.app/');
await page.locator('[data-test="Mocha"]').click();
await page.locator('[data-test="Flat_White"]').click();
await page.getByRole('link', { name: 'Cart page' }).click();
await page.getByRole('button', { name: 'Add one Flat White' }).click();
await page.getByRole('button', { name: 'Add one Flat White' }).click();
await page.getByRole('button', { name: 'Add one Mocha' }).click();
await page.getByRole('button', { name: 'Remove one Flat White' }).click();
await page.getByRole('button', { name: 'Remove all Mocha' }).click();
await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $36.00');
});

test('Verify input name and email fields for submitting order', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="checkout"]').click();
  await expect(page.getByRole('textbox', { name: 'Name' })).toBeEmpty();
  await page.locator('div').filter({ hasText: /^Name$/ }).click();
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeEmpty();
  await page.getByRole('textbox', { name: 'Name' }).fill('Olesya');
  await page.getByRole('textbox', { name: 'Email' }).fill('test@mail.com');
  await page.getByRole('button', { name: 'Submit' }).click();
});