
var express = require('express');
var router = express.Router();
var user = require('./handler');

/* GET home page. */
router.get(["/","/index"], function(req, res, next) {
  var query2 = req.query
  var name = query2['users']
  
  res.render('index', { title: name });
});


/* GET Uploads Page */
router.get('/upload', function(req,res){
  
    return res.render('upload')

});

/* POST Uploads Page */
router.post('/upload', user.uploads);


module.exports = router;