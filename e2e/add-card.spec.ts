import { test, expect } from '@playwright/test';

test('elements added by add button click', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.getByTestId('card-0').isVisible();

  const addButton = await page.getByTestId('add-button');
  await expect(addButton).toBeVisible();
  await addButton.click();

  const secondCard = await page.getByTestId('card-1');
  await expect(secondCard).toBeVisible();
});

test('elements added by delay', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.evaluate('window.app.setAutoLoadInterval(1000)');
  await page.getByTestId('card-0').isVisible();
  await page.waitForTimeout(3100);

  const thirdCard = await page.getByTestId('card-2');
  await expect(thirdCard).toBeVisible({ timeout: 1 });
});
