import { test, expect } from '@playwright/test';

const baseURL = 'https://coffee-cart.app/';

test('Verify default Total value is zero', async ({ page }) => {
  await page.goto(baseURL);

  const checkout = page.locator('[data-test="checkout"]');

  await expect(checkout).toHaveCount(1);
  await expect(checkout).toContainText('Total: $0.00');
});

test('Verify adding item to cart and successful payment', async ({ page }) => {
  let macchiatoCoffee = page.locator('[data-test="Espresso_Macchiato"]');
  let checkoutButton = page.locator('[data-test="checkout"]');
  let nameInput = page.locator('input[name="name"]');
  let emailInput = page.locator('input[name="email"]');
  let namePromotion = page.locator('input[name="promotion"]');
  const submitPaymentButton = page.locator('#submit-payment');
  let confirmationMessage = page.locator('#app');

  await page.goto(baseURL);

  await expect(macchiatoCoffee).toBeVisible();
  await expect(macchiatoCoffee).toHaveCount(1);
  await macchiatoCoffee.click();

  await checkoutButton.click();
  await expect(checkoutButton).toHaveCount(1);

  await nameInput.fill('Olesya');
  await expect(nameInput).toHaveCount(1);

  await emailInput.fill('mail@gmail.com');
  await expect(emailInput).toHaveCount(1);

  await namePromotion.check();
  await expect(namePromotion).toBeChecked();

  await submitPaymentButton.click();
  await expect(submitPaymentButton).toHaveCount(1);

  await expect(confirmationMessage).toContainText('Thanks for your purchase. Please check your email for payment.');
  await expect(confirmationMessage).toHaveCount(1);
});

test('Verify promo after adding 3 items to cart', async ({ page }) => {
  await page.goto(baseURL);
  const flatWhiteCoffee = page.locator('[data-test="Flat_White"]');
  const cappuccinoCoffee = page.locator('[data-test="Cappuccino"]');
  const cafeBreveCoffee = page.locator('[data-test="Cafe_Breve"]');
  const cartLabelPage = page.locator('a[aria-label="Cart page"]');
  let confirmationMessage = page.locator('#app');

  await flatWhiteCoffee.click();
  await expect(flatWhiteCoffee).toHaveCount(1);

  await cappuccinoCoffee.click();
  await expect(cappuccinoCoffee).toHaveCount(1);

  await cafeBreveCoffee.click();
  await expect(cafeBreveCoffee).toHaveCount(1);

  await expect(page.locator('.yes')).toHaveCount(1);
  await page.locator('.yes').click();

  await cartLabelPage.filter({ hasText: 'cart (4)' }).click();
  await expect(cartLabelPage).toHaveCount(1);

  //await page.getByRole('link', { name: 'Cart page' }).click();
  await expect(confirmationMessage).toContainText('(Discounted)');
  await expect(confirmationMessage).toHaveCount(1);

});

test('Verify manipulation of cart items', async ({ page }) => {
  await page.goto(baseURL);
  const mochaCoffee = page.locator('[data-test="Mocha"]');
  const flatWhiteCoffee = page.locator('[data-test="Flat_White"]');
  const addMochaToCart = page.locator('ul:not(.cart-preview) .unit-controller > [aria-label="Add one Mocha"]');
  const addFlatWhiteToCart = page.locator('ul:not(.cart-preview) .unit-controller > [aria-label="Add one Flat White"]');
  const removeFlatWhiteFromCart = page.locator('ul:not(.cart-preview) .unit-controller > [aria-label="Remove one Flat White"]');
  const removeAllFlatWhiteFromCart = page.locator('button[aria-label="Remove all Flat White"]');
  const checkout = page.locator('[data-test="checkout"]');

  await mochaCoffee.click();
  await expect(mochaCoffee).toHaveCount(1);

  await flatWhiteCoffee.click();
  await expect(flatWhiteCoffee).toHaveCount(1);

  await page.locator('a[aria-label="Cart page"]').click();

  await addMochaToCart.click();
  await expect(addMochaToCart).toHaveCount(1);

  await addFlatWhiteToCart.click();
  await expect(addFlatWhiteToCart).toHaveCount(1);

  await addMochaToCart.click();

  await removeFlatWhiteFromCart.click();
  await expect(removeFlatWhiteFromCart).toHaveCount(1);

  await expect(removeAllFlatWhiteFromCart).toHaveCount(1);
  await removeAllFlatWhiteFromCart.click();

  await expect(checkout).toContainText('Total: $24.00');
  await expect(checkout).toHaveCount(1);

});

test('Verify input name and email fields for submitting order', async ({ page }) => {
  await page.goto(baseURL);
  const checkout = page.locator('[data-test="checkout"]');
  const inputName = page.locator('input[name="name"]');
  const inputEmail = page.locator('input[name="email"]');

  await page.locator('[data-test="Espresso_Macchiato"]').click();

  await checkout.click();
  await expect(checkout).toHaveCount(1);

  await expect(inputName).toBeEmpty();
  await expect(inputName).toHaveCount(1);

  await page.locator('div').filter({ hasText: /^Name$/ }).click();

  await expect(inputEmail).toBeEmpty();
  await expect(inputEmail).toHaveCount(1);

  await inputName.fill('Olesya');
  await inputEmail.fill('test@mail.com');

  await page.locator('#submit-payment').click();
});

