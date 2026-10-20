import { test, expect } from '@playwright/test';

test('Verify default Total value is zero', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  const checkout = page.locator('[data-test="checkout"]');

  await expect(checkout).toHaveCount(1);
  await expect(checkout).toContainText('Total: $0.00');
});

test('Verify adding item to cart and successful payment', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  await expect(page.locator('[data-test="Espresso_Macchiato"]')).toBeVisible();
  await expect(page.locator('[data-test="Espresso_Macchiato"]')).toHaveCount(1);
  await page.locator('[data-test="Espresso_Macchiato"]').click();

  await page.locator('[data-test="checkout"]').click();
  await expect(page.locator('[data-test="checkout"]')).toHaveCount(1);

  await page.locator('input[name="name"]').fill('Olesya');
  await expect(page.locator('input[name="name"]')).toHaveCount(1);

  await page.locator('input[name="email"]').fill('mail@gmail.com');
  await expect(page.locator('input[name="email"]')).toHaveCount(1);

  await page.locator('input[name="promotion"]').check();
  await expect(page.locator('input[name="promotion"]')).toBeChecked();

  await page.locator('#submit-payment').click();
  await expect(page.locator('#submit-payment')).toHaveCount(1);

  await expect(page.locator('#app')).toContainText('Thanks for your purchase. Please check your email for payment.');
  await expect(page.locator('#app')).toHaveCount(1);
});

test('Verify promo after adding 3 items to cart', async ({ page }) => {

  await page.goto('https://coffee-cart.app/');

  await page.locator('[data-test="Flat_White"]').click();
  await expect(page.locator('[data-test="Flat_White"]')).toHaveCount(1);

  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.locator('[data-test="Cappuccino"]')).toHaveCount(1);

  await page.locator('[data-test="Cafe_Breve"]').click();
  await expect(page.locator('[data-test="Cafe_Breve"]')).toHaveCount(1);

  await expect(page.locator('.yes')).toHaveCount(1);
  await page.locator('.yes').click();

  await page.locator('a[aria-label="Cart page"]').filter({ hasText: 'cart (4)' }).click();
  await expect(page.locator('a[aria-label="Cart page"]')).toHaveCount(1);

  //await page.getByRole('link', { name: 'Cart page' }).click();
  await expect(page.locator('#app')).toContainText('(Discounted)');
  await expect(page.locator('#app')).toHaveCount(1);

});

test('Verify manipulation of cart items', async ({ page }) => {

  await page.goto('https://coffee-cart.app/');

  await page.locator('[data-test="Mocha"]').click();
  await expect(page.locator('[data-test="Mocha"]')).toHaveCount(1);

  await page.locator('[data-test="Flat_White"]').click();
  await expect(page.locator('[data-test="Flat_White"]')).toHaveCount(1);

  await page.locator('a[aria-label="Cart page"]').click();

  await page.locator('ul:not(.cart-preview) .unit-controller > [aria-label="Add one Mocha"]').click();
  await expect(page.locator('ul:not(.cart-preview) .unit-controller > [aria-label="Add one Mocha"]')).toHaveCount(1);

  await page.locator('ul:not(.cart-preview) .unit-controller > [aria-label="Add one Flat White"]').click();
  await expect(page.locator('ul:not(.cart-preview) .unit-controller > [aria-label="Add one Flat White"]')).toHaveCount(1);

  await page.locator('ul:not(.cart-preview) .unit-controller > [aria-label="Add one Mocha"]').click();

  await page.locator('ul:not(.cart-preview) .unit-controller > [aria-label="Remove one Flat White"]').click();
  await expect(page.locator('ul:not(.cart-preview) .unit-controller > [aria-label="Remove one Flat White"]')).toHaveCount(1);

  await expect(page.locator('button[aria-label="Remove all Flat White"]')).toHaveCount(1);
  await page.locator('button[aria-label="Remove all Flat White"]').click();

  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $24.00');
  await expect(page.locator('[data-test="checkout"]')).toHaveCount(1);

});

test('Verify input name and email fields for submitting order', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  await page.locator('[data-test="Espresso_Macchiato"]').click();

  await page.locator('[data-test="checkout"]').click();
  await expect(page.locator('[data-test="checkout"]')).toHaveCount(1);

  await expect(page.locator('input[name="name"]')).toBeEmpty();
  await expect(page.locator('input[name="name"]')).toHaveCount(1);
  
  await page.locator('div').filter({ hasText: /^Name$/ }).click();

  await expect(page.locator('input[name="email"]')).toBeEmpty();
  await expect(page.locator('input[name="email"]')).toHaveCount(1);

  await page.locator('input[name="name"]').fill('Olesya');
  await page.locator('input[name="email"]').fill('test@mail.com');

  await page.locator('#submit-payment').click();
});

