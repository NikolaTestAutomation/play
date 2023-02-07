// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const records = parse(fs.readFileSync(path.resolve(__dirname, '../testData/inventoryProductData.csv')), {
  columns: true,
  skip_empty_lines: true
});


test.describe('@Smoke-suite > Inventory', () => {
  test.describe('Verify product data', () => {
    for (const record of records) {
      test(`for ${String(record.id).replace("add-to-cart-", "")}`, async ({ page }) => {
        await page.goto('/inventory.html');
        //wanted to grab entire investory tile and not be restricted by products order
        const elementParent = page.locator(`${'[id="' + record.id + '"]'} >> xpath=..`)
        const parent = elementParent.locator('xpath=..');
        //now i can run validations by searching elements under defined parent
        await expect.soft(parent.locator('.inventory_item_name'), 'Product title is not correct').toHaveText(record.title);
        await expect.soft(parent.locator('.inventory_item_desc'), 'Product description is not correct').toHaveText(record.description);
        await expect.soft(parent.locator('.inventory_item_price'), 'Product price is not correct').toHaveText(record.price);
      })
    }
  })


  test('Compare screenshot for entire page', async ({ page }) => {
    //await context.tracing.start({ screenshots: true, snapshots: true });
    await page.goto('/inventory.html');
    //await expect(page.locator('[alt="Sauce Labs Backpack"]')).toHaveScreenshot('inventoryBackpack.png', {  });
    await expect(page).toHaveScreenshot();
    //await context.tracing.stop({ path: 'trace.zip' });
  })
});

