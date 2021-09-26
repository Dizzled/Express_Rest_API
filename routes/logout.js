var express = require('express');
var router = express.Router();
const db = require('../database');
var name, userid;

/* GET Login page. */
router.get('/', function (req, res, next) {
  id = req.sessionID;
  var sql = "SELECT * FROM user WHERE session = ?"

  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(404).json({
        "error": err.message
      });
      return;
    }
    try {
      db.run("UPDATE user SET session=? WHERE id=?", [null, row.id], (error, update) => {
        if (error) {
          return console.error(err.message);
        }
        console.log(`Rows Updated ${this.changes}`);
        req.session.destroy(function (err) {
          res.redirect('/login')
        })
      })

    } catch (error) {
      res.end("not Logged in!")
    }
  })
  return;
})


module.exports = router;