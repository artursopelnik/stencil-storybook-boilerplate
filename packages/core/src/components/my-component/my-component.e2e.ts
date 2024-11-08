import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('my-component', () => {
  test('should render the correct name', async ({ page }) => {
    // The path here is the path to the www output relative to the dev server root directory
    // await page.goto('/components/my-component/my-component.e2e.html');
    await page.goto('/components/my-component/');

    // Rest of test
    const component = await page.locator('my-component');
    await expect(component).toHaveText(`Hello World! I'm Stencil 'Don't call me a framework' JS`);
  });
});
