



require('dotenv').config();
const slugify = require('slugify');
const cron = require('node-cron');
const { fetchGoogleTrends } = require('./bot_controller/gtrend');
const { generate } = require('./bot_controller/gemini');
const { connectDB } = require('./connectDB');
const { saveToDB } = require('./bot_controller/savearticledata');
const { fetchImages } = require('./bot_controller/unsplash')
connectDB(process.env.MONGO_URL);

async function handlebot() {
  try {
    const trends = await fetchGoogleTrends();
    if (!trends || trends.length === 0) {
      console.warn('⚠️ No trending topics found.');
      return;
    }

    for (const trend of trends) {
      console.log(` Processing trend: ${trend}`);

      const article = await generate(trend); // generate blog using Gemini

      if (!article || !article.content) {
        console.error(`Failed to generate content for: ${trend}`);
        continue;
      }

      const slug = slugify(article.title || trend, { lower: true });
     
      const generatedimage = await fetchImages(trend)


      const articleData = {
        title: article.title || trend,
        slug,
        meta: {
          title: article.title || trend,
          description: article.meta?.description || `An SEO-optimized blog about ${trend}`,
          tag:article.meta?.tags
        },
        content: article.content,
        media: {
          images: generatedimage ? [generatedimage] : [],
          tweets: "", // optional
          videos: "", // optional
        },
        sourceLinks: "", // optional
        createdAt: article.createdAt || new Date()
      };

      try {
        await saveToDB(articleData);
        console.log(`✅ Successfully saved article: ${articleData.title}`);
      } catch (dbErr) {
        console.error(`❌ Failed to save article for: ${trend}`, dbErr);
      }
    }

  } catch (err) {
    console.error('❌ Error in handlebot():', err);
  }
}

handlebot();
