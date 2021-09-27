var express = require('express');
const db = require('../database');
var router = express.Router();
var md5 = require('md5');

/* GET Remove page. */
router.get('/', function (req, res, next) {

  var query = "SELECT * FROM user";

  db.all(query, [], (err, row) => {
    if (err) {
      res.status(404).json({
        "error": err.message
      });
      return;
    }
    if (row){
      res.render('remove', {
        user: row
      });
    }else{
      res.end("No Message with that id!")
    }
  })
});

router.post('/', function (req, res, next) {

  var sql = "select * from user where email = ?";
  var email = req.body.email;
  db.get(sql, email, (err, row) => {
    if (!row) {

      var insert = 'DELETE FROM user WHERE email = ?';

      db.run(insert, [req.body.email], function (err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Rows Deleted ${this.changes}`);

        res.render('remove', {
          info: "User Deleted!"
          
        })
      });

    } else {
      res.render('remove', {
        message: "No User By That name!"

      })
    }
  })
});


module.exports = router;