const express = require('express');
const router = express.Router();
const session = require('express-session');
const db = require('../database/init');
// const bodyParser = require('body-parser');
//
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({extended: true}));

//Session
let idUser = 0;

router.use(session({
  secret: '2033',
  resave: false,
  saveUninitialized: true,
}));

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/sign-in', (req, res) => {
  res.render('sign-in');
});

router.post('/sign-in', (req, res) => {
  let user =  {
    username: req.body.username,
    password: req.body.password,
  };

  db.user.findOne({where: {username: user.username}})
  .then(userDB => {
    if (!userDB) {
      console.log('No user');
      res.redirect('/sign-in');
    } else if (userDB.checkPassword(user.password)) {
      console.log('Good pw');
      res.redirect('/');
    } else {
      console.log('Bad pw');
      res.redirect('/sign-in');
    }
  })
})

router.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

router.post('/add-user', (req, res) => {
  console.log(req.body);

  let user =  {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthdate: req.body.birthdate,
    email: req.body.email,
    password: req.body.password,
    password_confirmation: req.body.password_confirmation,
  };

  let session = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthdate: req.body.birthdate,
    email: req.body.email,
  }

  db.user.create(user)
  .then(user => {

    if (!req.session.users) {
      req.session.users = [];
    }
    session.id = idUser++;
    req.session.users.push(session);

    console.log(req.session.users);

    res.redirect('/');
  })
  .catch(err => {
    throw err;
    res.redirect('/sign-in');
  });

});

module.exports = router;
