import { test, expect } from '@playwright/test';

test('homepage has correct title, form, and animations', async ({ page }) => {
  await page.goto('/');

  // Check the title
  await expect(page).toHaveTitle(/Recipe Generator/);

  // Check for the main container with Framer Motion animation
  const mainContainer = page.locator('div[style*="opacity: 1"]');
  await expect(mainContainer).toBeVisible();

  // Check for the button with animation
  const button = page.getByRole('button', { name: 'Get Recipes' });
  await expect(button).toBeVisible();
  
  // Check if the button has the expected animation class
  await expect(button).toHaveClass(/animate-in/);
});

test('can submit form and see recipe with animations', async ({ page }) => {
  await page.goto('/recipe');

  // Fill and submit the form
  await page.fill('input[name="ingredients"]', 'tomato, cheese, bread');
  await page.click('button[type="submit"]');

  // Wait for the loading indicator with animation
  const loadingIndicator = page.locator('div.animate-pulse');
  await expect(loadingIndicator).toBeVisible();
  await expect(loadingIndicator).toBeHidden({ timeout: 30000 });

  // Check if the recipe content appears with animation
  const recipeContent = page.locator('section[style*="opacity: 1"]');
  await expect(recipeContent).toBeVisible();

  // Check if the recipe details are displayed
  await expect(page.locator('text=Ingredients:')).toBeVisible();
  await expect(page.locator('text=Instructions:')).toBeVisible();

  // Check if the image container has animation
  const imageContainer = page.locator('div[style*="opacity: 1"] img');
  await expect(imageContainer).toBeVisible();
});
