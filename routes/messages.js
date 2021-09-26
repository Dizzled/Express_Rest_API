var express = require('express');
var router = express.Router();
const db = require('../database');
var flash = require('express-flash');
let email, message, img, username, ids;
/* Messages Page */
router.get('/', function (req, res, next) {
  id = req.sessionID;
  refreshmenu = req.refresh;
  var sql = "select * from user where session = ?"

  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(404).json({
        "error": err.message
      });
      return;
    }
    try {
      res.render('messages', {
        img: row.id,
        username: row.name
      })
      img = row.id;
      username = row.name

    } catch (error) {
      res.redirect('/login')
    }

  });

  return;
});

/* Post Upload Page. */
router.post('/', function (req, res) {

  try {
    email = req.body.email;
    message = req.body.message;
    console.log(email);
  } catch (error) {
    res.render('messages', {
      img: img,
      username: username,
      info: 'Please Enter Email'
    })
  }

  db.get(`SELECT * FROM user WHERE email = ?`, [email], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    
    //If no existing messages then insert new message to user
    try {
      if (row.email === email) {
        userID = row.id;
        db.run('INSERT INTO messages (name, email, message, userID) VALUES (?,?,?,?)', [row.name, row.email, message, userID],
          function (err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Rows inserted ${this.changes}`);

            res.render('messages', {
              img: img,
              username: username,
              info: "Message Sent!"
            });
            return;
          });
      }
    } catch (error) {
      res.render('messages', {
        img: img,
        username: username,
        info: "No Email Found for that user!!"
      });
      return;
    }
  })
  return;
})

module.exports = router;