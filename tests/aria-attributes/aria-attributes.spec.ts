import { test, expect } from '@playwright/test';

test('Go to local website', async ({ page }) => {
    await page.goto("");
});