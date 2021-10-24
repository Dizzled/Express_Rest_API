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

/* GET File Read Page */
router.get('/fileread', user.fileread);

/* GET Profile Page */
router.get('/profile', user.profileGET);

/* POST Profile Page */
router.post('/profile', user.profilePOST);

/* GET Login Page */
router.get('/login', user.loginGET)

/* POST Login Page */
router.post('/login', user.loginPOST)

/* GET img Page */
router.get('/img', user.img)


module.exports = router;