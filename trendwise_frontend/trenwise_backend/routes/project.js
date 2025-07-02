const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/authmiddlewares');
const { trending, toppicks, recent ,articleDetails,searchBlog,addcomment,addLike } = require('../controllers/controllers')

router.get('/me', verifyToken, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json(user);
});
router.get('/toppicks', toppicks)
router.get('/recent', recent)
router.get('/trending', trending)
router.get('/details/:slug',articleDetails)
router.post('/search',searchBlog)
router.post('/update/comment/:slug',addcomment)
router.post('/update/like/:slug',addLike)

module.exports = router