// require('dotenv').config();
// const fetch = require('node-fetch'); // if using Node.js < v18

// async function fetchImages(query) {
//   try {
//     const response = await fetch(
//       `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=1&order_by=relevant&client_id=${process.env.ACCESS_KEY}`
//     );

//     const data = await response.json();

//     if (data.results.length > 0) {
//       return data.results[0].urls.regular;
//     } else {
//       console.log("No relevant image found.");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching image:", error);
//     return null;
//   }
// }

// module.exports = { fetchImages };



require('dotenv').config();
const fetch = require('node-fetch'); // required only for Node.js < v18

async function fetchImages(query) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&searchType=image&imgType=photo&imgSize=xxlarge&num=1&key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CSE_ID}`
    );

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      return data.items[0].link; // Image URL
    } else {
      console.log("No relevant image found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}
fetchImages('avengers')
module.exports = { fetchImages };
