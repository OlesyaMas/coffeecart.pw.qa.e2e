import { test, expect } from '@playwright/test';

const baseURL = 'http://104.168.59.50/laboratory/interactions';

test('default state of checkbox counter is 0', async ({ page }) => {
    await page.goto(baseURL);
    await expect(page.locator("//span[@data-testid='interactions-selected-count']")).toHaveText('Вибрано: 0');
});

test('checkbox state is changed and counter is updated', async ({ page }) => {
    await page.goto(baseURL);
    await page.locator("//input[@data-testid='interactions-row-select-1']").check();
    await expect(page.locator("//span[@data-testid='interactions-selected-count']")).toHaveText('Вибрано: 1');
});

test('counter is changed when checkbox is unchecked', async ({ page }) => {
    let counterCheckboxes = page.locator("//span[@data-testid='interactions-selected-count']");
    let selectSecondCheckbox = page.locator("//input[@data-testid='interactions-row-select-2']"); 

    await page.goto(baseURL);
    await page.locator("//input[@data-testid='interactions-row-select-1']").check();
    await page.locator("//input[@data-testid='interactions-row-select-4']").check();
    await page.locator("//input[@data-testid='interactions-row-select-3']").check();
    await selectSecondCheckbox.check();

    await expect(counterCheckboxes).toHaveText('Вибрано: 4');
    await selectSecondCheckbox.uncheck();

    await expect(counterCheckboxes).toHaveText('Вибрано: 3');
});

test('sorting by name', async ({ page }) => {
    let nameColumn = page.locator("//tbody/tr/td[2]"); 
    const sortByNameColumn = page.locator("//button[@data-testid='interactions-sort-name']");

    await page.goto(baseURL);
    await sortByNameColumn.click();
    await expect(nameColumn).toHaveText(['Створення статті', 'Пошук за тегом', 'Завантаження файлу', 'Авторизація']);
    
    await sortByNameColumn.click();
    await expect(nameColumn).toHaveText(['Авторизація', 'Завантаження файлу', 'Пошук за тегом', 'Створення статті']);
});

test('sorting by status', async ({page}) => {
    await page.goto(baseURL);
    const sortByStatusColumn = page.locator("//button[@data-testid='interactions-sort-status']");
    const statusColumn = page.locator("//tbody/tr/td[3]");

    await sortByStatusColumn.click();
    await expect(statusColumn).toHaveText(['Failed', 'Passed', 'Passed', 'Skipped']);

    await sortByStatusColumn.click();
    await expect(statusColumn).toHaveText(['Skipped', 'Passed', 'Passed', 'Failed']);
});

test('sorting by duration', async ({page}) => {
    await page.goto(baseURL);
    const sortByDurationColumn = page.locator("//button[@data-testid='interactions-sort-duration']");
    const durationColumn = page.locator("//tbody/tr/td[4]");

    await sortByDurationColumn.click();
    await expect(durationColumn).toHaveText(['0.0 s', '5.7 s', '8.4 s', '12.1 s']);

    await sortByDurationColumn.click();
    await expect(durationColumn).toHaveText(['12.1 s', '8.4 s', '5.7 s', '0.0 s']);
});