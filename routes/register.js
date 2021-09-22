var express = require('express');
const db = require('../database');
var router = express.Router();
var md5 = require('md5');

/* GET Login page. */
router.get('/', function (req, res, next) {

  res.render('register');

});

router.post('/', function (req, res, next) {

  if (req.body.email > 0 && req.body.username > 0 && req.body.password > 0) {

    res.render('register', {
      message: err.message
    });
    return;
  }

  var sql = "select * from user where email = ?";
  var email = req.body.email;
  db.get(sql, email, (err, row) => {
    if (!row) {

      var insert = 'INSERT INTO user (name, email, password) VALUES(?,?,?)';
      console.log(insert);

      db.run(insert, [req.body.username, req.body.email, md5(req.body.password)], function (err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Rows inserted ${this.changes}`);

        res.render('register', {
          message: "Thank you for signing up!"
          
        })
      });

    } else {
      res.render('register', {
        message: "registration failed user already exists!"

      })
    }
  })

});


module.exports = router;