const express = require('express');
const router = express.Router();
const session = require('express-session');
const db = require('../database/init');

let idUser = 0;

//Session
router.use(session({
  secret: '2033',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

router.get('/', (req, res) => {
  res.render('index');
})

router.get('/sign-in', (req, res) => {
  res.render('sign-in');
})

router.get('/sign-up', (req, res) => {
  res.render('sign-up');
})

router.post('/add-user'), (req, res) => {
  if (!req.session.users) {
    req.session.users = [];
  }
  req.body.id = idUser++;
  req.session.users.push(req.body);

  console.log(req.session.users);

  // db.user.create({
  //   username: req.session.username,
  //   firstname: req.session.firstname,
  //   lastname: req.session.lastname,
  //   birthdate: req.session.birthdate,
  //   email: req.session.email,
  //   password: req.session.password,
  // }).then(() => {
  //   res.redirect('/');
  // });
}

module.exports = router;
