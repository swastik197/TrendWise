const Article = require('../models/article');

async function saveToDB(articleData) {
  try {
    // Avoid duplicates based on slug
    const existing = await Article.findOne({ slug: articleData.slug });
    if (existing) {
      console.log(`⚠️ Article already exists: ${articleData.slug}`);
      return;
    }

    const article = new Article(articleData);
    await article.save();
    console.log(`✅ Article saved: ${articleData.title}`);
  } catch (err) {
    console.error('❌ Error saving article:', err);
  }
}

module.exports = {saveToDB}