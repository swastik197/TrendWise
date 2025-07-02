const Article = require('../models/article');

// Express Controller
async function toppicks(req, res) {

    try {
        const blogs = await Article.find({})
        res.json(blogs)

    } catch (err) {
        console.log('error in trending', err)
    }
}


async function recent(req, res) {
    try {
        const blogs = await Article.find()
            .sort({ createdAt: -1 }) // Newest first
            .limit(3); // Only 3
        res.json(blogs)
    } catch (err) {
        console.log('error in toppicks', err)
    }
}
async function trending(req, res) {
    try {
        const randomFive = await Article.aggregate([
            { $sample: { size: 5 } }
        ]);
        res.json(randomFive)
    } catch (err) {
        console.log('error in trending', err)
    }
}
async function articleDetails(req, res) {
    try {
        const { slug } = req.params
        const details = await Article.findOne({ slug: slug });
        if(!details){
            res.error('unable to find the details')
        }
        res.json(details)

    } catch (err) {
        console.log('error in finding article details', err)
    }
}

async function searchBlog(req, res){
    const { query } = req.body;

  try {
    const articles = await Article.find({
      title: { $regex: query, $options: 'i' } // case-insensitive search
    });
if(!articles){
    res.send('no result found')
}
    res.json(articles);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function addcomment(req, res){
    try{
const {slug} = req.params
const { author , content } = req.body
const result = await Article.updateOne(
      { slug: slug}, // match project and specific task
      {
        $push: {
          comments: { author, comment: content }
        }
      }

    );
     res.status(200).json({ message: 'Comment added', result });
    }catch(err){
        console.log('errror while commenting', err)
    }
}

async function addLike(req, res) {
  try {
    const { slug } = req.params;

    const result = await Article.findOneAndUpdate(
      { slug },
      { $inc: { likes: 1 } },
      { new: true } // return updated doc
    );

    res.status(200).json({ message: 'Liked!', likes: result.likes });
  } catch (err) {
    console.log('Error while liking', err);
    res.status(500).json({ error: 'Failed to like project' });
  }
}

module.exports = { trending, toppicks, recent, articleDetails,searchBlog, addcomment, addLike};


