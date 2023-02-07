// global-setup.js
const { chromium } = require('@playwright/test');
require('dotenv').config();

module.exports = async config => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill(process.env.WEB_USERNAME);
  await page.locator('#password').fill(process.env.WEB_PASSWORD);
  await page.locator('#login-button').click();
  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
};