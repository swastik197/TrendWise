const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function fetchGoogleTrends() {
  const browser = await puppeteer.launch({ headless: true }); // Set to true to hide browser window
  const page = await browser.newPage();

  // Set a user agent to reduce bot detection
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  const url = 'https://trends.google.com/trending?geo=IN';
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

  // Extra wait for dynamic content
  await new Promise(resolve => setTimeout(resolve, 5000));

  try {
    // Wait until at least 5 trend title containers are present
    await page.waitForFunction(() => {
      return document.querySelectorAll('div.mZ3RIc').length >= 5;
    }, { timeout: 60000 });
  } catch (e) {
    console.error('At least 5 div.mZ3RIc not found!');
    await browser.close();
    throw e;
  }

  const trends = await page.evaluate(() => {
    const items = document.querySelectorAll('div.mZ3RIc');
    return Array.from(items).slice(0, 5).map(el => el.innerText.trim());
  });

  // Debug: print number of elements found
  console.log('Number of trends found:', trends.length);

  await browser.close();
  return trends;
}

// Run and print
fetchGoogleTrends().then(console.log).catch(console.error);


module.exports={fetchGoogleTrends}






















// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// async function fetchGoogleTrends() {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   await page.setUserAgent(
//     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
//   );

//   const url = 'https://trends.google.com/trending?geo=IN';
//   await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

//   await new Promise(resolve => setTimeout(resolve, 5000));

//   try {
//     await page.waitForFunction(() => {
//       return (
//         document.querySelectorAll('div.mZ3RIc').length >= 5 &&
//         document.querySelectorAll('img.QtVIpe').length >= 5
//       );
//     }, { timeout: 60000 });
//   } catch (e) {
//     console.error('Trends or images not found. Possibly a structure change.');
//     await browser.close();
//     throw e;
//   }

//   const trends = await page.evaluate(() => {
//     const titles = document.querySelectorAll('div.mZ3RIc');
//     const images = document.querySelectorAll('img.QtVIpe');

//     const result = [];

//     for (let i = 0; i < Math.min(titles.length, images.length, 5); i++) {
//       const title = titles[i]?.innerText.trim();
//       const imageUrl = images[i]?.src || images[i]?.getAttribute('src');
//       result.push({ title, imageUrl });
//     }

//     return result;
//   });

//   console.log('Number of trends found:', trends.length);

//   await browser.close();
//   return trends;
// }

// // Run and print
// fetchGoogleTrends().then(console.log).catch(console.error);

// module.exports = { fetchGoogleTrends };





