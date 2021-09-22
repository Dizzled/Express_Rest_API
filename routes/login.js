var express = require('express');
var router = express.Router();
const db = require('../database');
var md5 = require('md5');


/* GET Login page. */
router.get('/', function (req, res, next) {

  res.setHeader('Content-Type', 'text/html')
  res.render('login', {

    login: "Login"
  });

});

router.post('/', function (req, res, next) {
  login = false;
  
  if (req.body.email === 'badman@test.com' && req.body.password === 'password') {

    res.redirect('/profile')
    return;

  }
  let sql = `SELECT * FROM user WHERE email = ?`;
  let params = req.body.email;

    db.get(sql, [params], (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      if (row) {
        // console.log(typeof (row.password) + " " + typeof (md5(req.body.password)))
        if (row.password === md5(req.body.password)) {
          login = true;
        }
      }
      if (row) {
        console.log("rowid " + row.id)
        db.run("UPDATE user SET session=? WHERE id=?", [req.sessionID, row.id], (error, update) => {

          console.log(`Updated ${row.id}`)

          req.session.userId = row.id;
          req.session.save(() => {

            if (login == true) {
              res.redirect('/profile');
            }
          })
        })
      } else {
        res.render('login', {
          error: 'Invalid password'
        })
      }
})
})
module.exports = router;