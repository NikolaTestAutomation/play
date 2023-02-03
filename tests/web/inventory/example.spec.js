// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('@Smoke-suite > Inventory', () => {
  test.describe('Verify product data', () => {
    test('for backpack', async ({ page, context }) => {
      //await context.tracing.start({ screenshots: true, snapshots: true });
      await page.goto('/inventory.html');
      //wanted to grab entire investory tile and not be restricted by products order
      const elementParent = page.locator(`${'#add-to-cart-sauce-labs-backpack'} >> xpath=..`)
      const parent = elementParent.locator('xpath=..');
      //now i can run validations by searching elements under defined parent
      await expect.soft(parent.locator('.inventory_item_name'), 'Backback product title is not correct').toHaveText('Sauce Labs Backpack');
      await expect.soft(parent.locator('.inventory_item_desc')).toHaveText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
      await expect.soft(parent.locator('.inventory_item_price')).toHaveText('$29.99');
      await expect.soft(parent.locator('.inventory_item_price')).not.toContainText("text");
      await expect.soft(page.locator('[alt="Sauce Labs Backpack"]')).toHaveScreenshot('inventoryBackpack.png');
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