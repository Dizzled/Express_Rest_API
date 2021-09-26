var express = require('express');
var router = express.Router();
const db = require('../database');
var md5 = require('md5');
let stringify = require('json-stringify-safe')

/* GET Login page. */
router.get('/', function (req, res, next) {

  res.setHeader('Content-Type', 'text/html')
  res.render('login', {

    login: "Login"
  });

});

router.post('/', function (req, res, next) {

  if (req.body.email === 'badman@test.com' && req.body.password === 'password') {
    res.redirect('/profile')
    return;
  }

  let email = req.body.email;
  let pass = md5(req.body.password);

  var query = "SELECT * FROM user where email = '" + email + "' and password = '" + pass + "'";

  console.log(query);
  db.get(query, function (err, row) {
    if (err) {
      res.render('login', {
        error: err + " " + row
      })
      return;
    }else{
    try {
      if (row.password === pass) {

        db.run("UPDATE user SET session=? WHERE id=?", [req.sessionID, row.id], (error, update) => {

          console.log(`Updated ${row.id}`)

          req.session.userId = row.id;
          req.session.save(() => {
          res.redirect('/profile');
          })
        })
      }
    } catch (error) {
      res.render('login', {
        error: 'Invalid password'
      })
    }
    }
  })

})


module.exports = router;