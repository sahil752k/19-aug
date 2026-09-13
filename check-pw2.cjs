const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/root/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell' });
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const html = await page.content();
  console.log('HTML CONTENT:');
  console.log(html);
  await browser.close();
})();
