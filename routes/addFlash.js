var express = require('express');
var router = express.Router();
const db = require('../database');

router.get('/addFlash', function (req, res) {
  req.flash('info', 'Please Login');
  res.redirect('/login');
});


module.exports = router;