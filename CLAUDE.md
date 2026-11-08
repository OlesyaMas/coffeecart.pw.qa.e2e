# CLAUDE.md

## What this is

A Playwright (TypeScript) UI test suite written as QA automation homework. There is no application code here, only tests against external sites. `package.json` has no npm scripts, so everything runs through `npx playwright`.

## Commands

## Structure and config

`playwright.config.ts` defines two Chrome projects. Each has its own `baseURL`, and both set `testIdAttribute: 'data-test'`:

- **coffee-cart**: `baseURL` is `https://coffee-cart.app/`. It sets no `testDir`, so it inherits the root `./tests`. That means it **also picks up `tests/aria-attributes/`**, so a plain `npx playwright test` runs the aria tests twice, once against the wrong base URL. Use `--project` or set `testIgnore`/`testDir` when this matters.
- **aria-attributes**: `testDir` is `tests/aria-attributes`, and `baseURL` is `http://104.168.59.50/laboratory/aria` (a course lab server).

## Conventions in the tests

- The current homework (branch `homework-3`) has you rewrite tests to use **CSS selectors via `page.locator(...)`**, for example `[data-test="Espresso_Macchiato"]`, `input[name="email"]`, `#submit-payment`. These replace `getByRole` and other built-in locators. `tests/coffee-purchase.spec.ts` is the CSS-selector version. `tests/coffe-purchase-old.spec.ts` (the filename typo is in the repo) keeps the original `getByRole`-based version for reference.
- Coffee-cart tests currently call `page.goto('https://coffee-cart.app/')` with the full URL, even though `baseURL` is configured.
- Assertions use `expect` with `toHaveCount(1)`, `toBeVisible`, `toContainText`, and `toBeChecked`.
