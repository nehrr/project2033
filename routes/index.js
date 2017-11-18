const express = require('express');
const router = express.Router();
const session = require('express-session');

const db = require('../database/init');

//Session
router.use(session({
  secret: '2033',
  resave: false,
  saveUninitialized: true,
}));

router.get('/', (req, res) => {
  console.log(req.session.user);
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

      res.redirect('/sign-in');

    } else if (userDB.checkPassword(user.password)) {

      let session = {
        id: userDB.id,
        username: userDB.username,
        firstname: userDB.firstname,
        lastname: userDB.lastname,
        birthdate: userDB.birthdate,
        email: userDB.email,
      }

      if (!req.session.user) {
        req.session.user = {};
      }

      req.session.user = session;
      res.redirect('/user/home');

    } else {

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

  db.user.create(user)
  .then(user => {
    res.redirect('/');
  })
  .catch(err => {
    throw err;
    res.redirect('/sign-in');
  });

});

module.exports = router;
