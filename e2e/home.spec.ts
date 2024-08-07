import { test, expect } from '@playwright/test';

test('homepage has correct title and form', async ({ page }) => {
  await page.goto('/');

  // Check the title
  await expect(page).toHaveTitle(/Recipe Generator/);
  await expect(page.getByRole('button', { name: 'Get Recipes' })).toBeVisible();
});

test('can submit form and see recipe', async ({ page }) => {
  await page.goto('/recipe');

  // Fill and submit the form
  await page.fill('input[name="ingredients"]', 'tomato, cheese, bread');
  await page.click('button[type="submit"]');

  // Wait for the recipe to be generated
  await expect(page.locator('text=Thinking...')).toBeVisible();
  await expect(page.locator('text=Thinking...')).toBeHidden();

  // Check if the recipe is displayed
  await expect(page.locator('text=Ingredients:')).toBeVisible();
  await expect(page.locator('text=Instructions:')).toBeVisible();
});
