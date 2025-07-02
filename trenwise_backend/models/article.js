
const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  meta: {
    title: String,
    description: String,
    ogImage: String,
    tag: [String]
  },
  content: { type: String, required: true },
  media: {
    images: [String],
    tweets: [String],
    videos: [String],
  },
  sourceLinks: [String],
  createdAt: { type: Date, default: Date.now },
  comments:[{author: String, comment: String}],
  likes: Number

});

module.exports = mongoose.model('Article', ArticleSchema);
