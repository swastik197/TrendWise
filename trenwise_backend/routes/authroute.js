const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Step 1: Start OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Step 2: Callback
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Issue JWT
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Redirect with token in query (or send JSON if SPA popup)
    res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
  }
);

module.exports = router;

