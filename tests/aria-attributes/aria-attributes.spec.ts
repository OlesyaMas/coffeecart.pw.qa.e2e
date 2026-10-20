import { test, expect } from '@playwright/test';

test('Go to local website', async ({ page }) => {
    await page.goto("");

    // Знайти текстове поле через getByRole('textbox', { name }).
    await page.getByRole("textbox", { name: "Name" }).fill("Olesya");

    // Те саме поле знайти через getByLabel().
    // Заповнити email і пароль.
    // Натиснути кнопку через getByRole('button', { name }).
    // Знайти зображення через getByAltText().
    // Знайти поле через getByPlaceholder().
    // Перевірити повідомлення через getByText() із substring, regex та exact: true.
});