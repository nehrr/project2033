const express = require('express');
const router = express.Router();
const session = require('express-session');
const db = require('../database/init');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//Session
// router.use(session({
//   secret: '2033',
//   resave: false,
//   saveUninitialized: true,
// }));

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
  console.log(req.body);

  // db.user.create({
  //   username: req.body.username,
  //   firstname: req.body.firstname,
  //   lastname: req.body.lastname,
  //   birthdate: req.body.birthdate,
  //   email: req.body.email,
  //   password: req.body.password,
  // }).then(() => {
  //   res.redirect('/');
  // });
}

module.exports = router;
