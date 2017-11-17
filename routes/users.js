const express = require('express');
const router  = express.Router();
const session = require('express-session');
const fs = require('fs');
const path = require('path');

const db = require('../database/init');

//Session
router.use(session({
  secret: '2033',
  resave: false,
  saveUninitialized: true,
}));

//Modules JSON
// let modules = fs.readFileSync(path.join(__dirname, '..', 'public', 'modules.json'), 'utf-8')
let modules = {
  "modules": [
    {
      "name" : "Introduction au Javascript",
      "teacher" : "Majdi Toumi"
    },
    {
      "name" : "Javascript avancee",
      "teacher" : "Majdi Toumi"
    },
    {
      "name" : "Node js",
      "teacher" : "Majdi Toumi"
    },
    {
      "name" : "Javascript user interfaces",
      "teacher" : "Majdi Toumi"
    },
    {
      "name" : "Algorithmie avancée",
      "teacher" : "Marc Boussoulade"
    },
    {
      "name" : "Bases de données relationnelle + NoSQL",
      "teacher" : "Christophe Ollivier"
    },
    {
      "name" : "Architectures n-tiers",
      "teacher" : "Sami Radi"
    },
    {
      "name" : "Sécurite informatique",
      "teacher" : "Majdi Toumi"
    },
    {
      "name" : "iOS",
      "teacher" : "Pierre-Yves Touzain"
    },
    {
      "name" : "Cross-platforme",
      "teacher" : "Majdi Toumi"
    },
    {
      "name" : "Ui/x design",
      "teacher" : "Gui Perrier"
    },
    {
      "name" : "Management & communication",
      "teacher" : "Caroline Richshoffer Dagorne"
    },
    {
      "name" : "Scrum",
      "teacher" : "Alexandra Tritz"
    },
    {
      "name" : "Cahier des charges fonctionnel",
      "teacher" : "Julie Poupat"
    },
    {
      "name" : "Cahier des charges technique",
      "teacher" : "Majdi Toumi"
    },
    {
      "name" : "Prototypage et MVP",
      "teacher" : "Julie Poupat"
    },
  ]
}


router.get('/home', (req, res) => {
  console.log(req.session.user);
  res.render('home', {user: req.session.user});
});

router.get('/profil', (req, res) => {
  res.render('profil', {user: req.session.user})
});

router.get('/module', (req, res) => {
  console.log(modules);
  res.render('module', {modules: modules})
})

module.exports = router;
