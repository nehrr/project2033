const express = require('express');
const router  = express.Router();

const db = require('../database/init');

router.get('profil/:id', (req, res) => {
  response.render('profil', {user: req.session.user[req.params.id]})
});

module.exports = router;
