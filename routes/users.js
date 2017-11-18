const express = require('express');
const router  = express.Router();
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const request = require('request');
const moment = require('moment');

const ejsLayout = require('express-ejs-layouts');
const db = require('../database/init');

//Session
router.use(session({
  secret: '2033',
  resave: false,
  saveUninitialized: true,
}));

router.get('/home', (req, res) => {
  let url = 'http://quotes.stormconsultancy.co.uk/random.json';

  request(url, (error, response, body) => {
    res.render('home', {user: req.session.user, layout: 'layouts/_user', message: JSON.parse(body)});
  })
});

router.get('/profil', (req, res) => {
  res.render('profil', {user: req.session.user, layout: 'layouts/_user', moment: moment})
});

router.get('/module', (req, res) => {
  let modules = db.module.findAll()
  .then(modules => {
    res.render('module', {modules, layout: 'layouts/_user'});
  });

router.get('/edit', (req, res) => {
  res.render('edit', {user: req.session.user, layout: 'layouts/_user'});
  });

  });

module.exports = router;
