
var express = require('express');
var router = express.Router();

/* GET Login page. */
router.get('/', function(req, res, next) {
  var name = req.body.username
  res.render('profile', { username: name });

});


module.exports = router;

