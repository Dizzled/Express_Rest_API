var express = require('express');
var router = express.Router();
const db = require('../database');
var flash = require('express-flash');
let email, message, img, username, messages;

/* Messages Page */
router.get('/', function (req, res, next) {
  id = req.sessionID;
  refreshmenu = req.refresh;

  var sql = "select * from user where session = ?";

  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(404).json({
        "error": err.message
      });
      return;
    }
    try {
      img = row.id;
      username = row.name
      //If the above is true get the user session id and the username then fetch the images for that user name
      // console.log("Username " + username + " userID " + row.id)
      db.all("SELECT * FROM messages where userID = '" + row.id + "'",[] , (err, row) => {
        if (err) {
          res.render('messages', {
            "error": err.message
          });
        }
        messages = row
        try {
          res.render('messages', {
            message: row,
            img: img,
            username: username
          })
        } catch (error) {
          res.render('messages', {
            message: "No Messages",
            img: img,
            username: username

          });
        }
      })
    } catch (error) {

      res.redirect('/login')
    }

  })
});

/* Post Upload Page. */
router.post('/', function (req, res) {

  try {
    from = req.body.from;
    console.log("This is from" + from)
    email = req.body.email;
    message = req.body.message;
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
        db.run('INSERT INTO messages (name, email, message, userID) VALUES (?,?,?,?)', [from, row.email, message, userID],
          function (err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Rows inserted ${this.changes}`);
            
            res.render('messages', {
              img: img,
              username: username,
              message: messages,
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