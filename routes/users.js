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

router.get('/home', (req, res) => {
  console.log(req.session.user);
  res.render('home', {user: req.session.user});
});

router.get('/profil', (req, res) => {
  res.render('profil', {user: req.session.user})
});

router.get('/module', (req, res) => {
  res.render('module', {module: null})
})

module.exports = router;
