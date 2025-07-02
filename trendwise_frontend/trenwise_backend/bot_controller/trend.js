const axios = require('axios');
const cheerio = require('cheerio');

async function fetchTwitterTrendsIndia() {
  const url = 'https://trends24.in/india/';
  const res = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
  });

  const $ = cheerio.load(res.data);

  const trends = [];
  $('.trend-card__list li a').each((i, el) => {
    trends.push($(el).text().trim());
  });

  return trends.slice(0, 5); // Top 5
}

// Run the function
fetchTwitterTrendsIndia().then(console.log).catch(console.error);
