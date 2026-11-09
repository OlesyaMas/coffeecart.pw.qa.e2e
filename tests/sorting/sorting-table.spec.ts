import { test, expect } from '@playwright/test';

test('default state of checkbox counter is 0', async ({ page }) => {
    await page.goto('http://104.168.59.50/laboratory/interactions');
    await expect(page.locator("//span[@data-testid='interactions-selected-count']")).toHaveText('Вибрано: 0');
});

test('checkbox state is changed and counter is updated', async ({ page }) => {
    await page.goto('http://104.168.59.50/laboratory/interactions');
    await page.locator("//input[@data-testid='interactions-row-select-1']").check();
    await expect(page.locator("//span[@data-testid='interactions-selected-count']")).toHaveText('Вибрано: 1');
});

test('counter is changed when checkbox is unchecked', async ({ page }) => {
    await page.goto('http://104.168.59.50/laboratory/interactions');
    await page.locator("//input[@data-testid='interactions-row-select-1']").check();
    await page.locator("//input[@data-testid='interactions-row-select-4']").check();
    await page.locator("//input[@data-testid='interactions-row-select-3']").check();
    await page.locator("//input[@data-testid='interactions-row-select-2']").check();

    await expect(page.locator("//span[@data-testid='interactions-selected-count']")).toHaveText('Вибрано: 4');
    await page.locator("//input[@data-testid='interactions-row-select-2']").uncheck();

    await expect(page.locator("//span[@data-testid='interactions-selected-count']")).toHaveText('Вибрано: 3');
});

test('sorting by name', async ({ page }) => {
    await page.goto('http://104.168.59.50/laboratory/interactions');
    await page.locator("//button[@data-testid='interactions-sort-name']").click();
    await expect(page.locator("//tbody/tr/td[2]")).toHaveText(['Створення статті', 'Пошук за тегом', 'Завантаження файлу', 'Авторизація']);
    
    await page.locator("//button[@data-testid='interactions-sort-name']").click();
    await expect(page.locator("//tbody/tr/td[2]")).toHaveText(['Авторизація', 'Завантаження файлу', 'Пошук за тегом', 'Створення статті']);
});

test('sorting by status', async ({page}) => {
    await page.goto('http://104.168.59.50/laboratory/interactions');
    await page.locator("//button[@data-testid='interactions-sort-status']").click();
    await expect(page.locator("//tbody/tr/td[3]")).toHaveText(['Failed', 'Passed', 'Passed', 'Skipped']);

    await page.locator("//button[@data-testid='interactions-sort-status']").click();
    await expect(page.locator("//tbody/tr/td[3]")).toHaveText(['Skipped', 'Passed', 'Passed', 'Failed']);
});

test('sorting by duration', async ({page}) => {
    await page.goto('http://104.168.59.50/laboratory/interactions');
    await page.locator("//button[@data-testid='interactions-sort-duration']").click();
    await expect(page.locator("//tbody/tr/td[4]")).toHaveText(['0.0 s', '5.7 s', '8.4 s', '12.1 s']);

    await page.locator("//button[@data-testid='interactions-sort-duration']").click();
    await expect(page.locator("//tbody/tr/td[4]")).toHaveText(['12.1 s', '8.4 s', '5.7 s', '0.0 s']);
});