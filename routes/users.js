const express = require('express');
const router  = express.Router();
const session = require('express-session');

const db = require('../database/init');

//Session
router.use(session({
  secret: '2033',
  resave: false,
  saveUninitialized: true,
}));

router.get('/profil', (req, res) => {
  res.render('profil', {user: req.session.user})
});

module.exports = router;
