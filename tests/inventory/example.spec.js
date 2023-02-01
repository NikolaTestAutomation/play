// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Inventory', () => {
  test.describe('Verify that [Add to Cart] is vissible', () => {
    test('for backpack', async ({ page, context }) => {
      //await context.tracing.start({ screenshots: true, snapshots: true });
      await page.goto('/inventory.html');
      await page.click('#add-to-cart-sauce-labs-backpack')
      //await context.tracing.stop({ path: 'trace.zip' });
    })
    test('for t-shirt', async ({ page, context }) => {
      //await context.tracing.start({ screenshots: true, snapshots: true });
      await page.goto('/inventory.html');
      await page.click('#add-to-cart-sauce-labs-bolt-t-shirt')
      //await context.tracing.stop({ path: 'trace.zip' });
    })
  })
});