
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get(["/","/index"], function(req, res, next) {
  var query2 = req.query
  var name = query2['users']
  
  res.render('index', { title: name });
});

module.exports = router;

