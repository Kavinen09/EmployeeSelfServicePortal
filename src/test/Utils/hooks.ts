import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';

// Set default timeout for Cucumber steps (in milliseconds)
setDefaultTimeout(60000);

let browser: Browser;
let page: Page;

Before(async function () {
  browser = await chromium.launch({ headless: false }); // Launch browser
  page = await browser.newPage(); // Open a new page

  // Set viewport size to maximize the window
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Attach page to context for use in steps
  this.page = page;  // Assign page to this context
});

After(async function () {
  await page.close(); // Close the page after each test
  await browser.close(); // Close the browser after all tests
});
