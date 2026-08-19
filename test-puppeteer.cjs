const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto('http://localhost:8081/test-bw.html');
  await new Promise(r => setTimeout(r, 1000));
  const content = await page.content();
  console.log(content);
  await browser.close();
})();
