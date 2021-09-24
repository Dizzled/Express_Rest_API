var express = require('express');
var router = express.Router();
const db = require('../database');
var name, userid;

/* GET Login page. */
router.get('/', function (req, res, next) {
  id = req.sessionID;
  var sql = "select * from user where session = ?"

  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(404).json({
        "error": err.message
      });
      return;
    }
    if (row) {
      name = row.name;
      userid = row.id
      if (row.img) {

        res.render('profile', {
          img : userid,
          username : name
        })
      }else{
          res.render('profile', {
            username: name
          })
        }
    //If profile image already exists load the image
    } else {
      res.render('profile', {
        username: "Cannot Find Username"
      })
    }
  });

  return;
});

/* Post Upload Page. */
router.post('/', function (req, res) {
  let sampleFile;
  if (!req.files || Object.keys(req.files).length === 0) {
    res.render('profile', {
      upload: "Error No File Selected!!",
      username: name
    });
    return;
  } else {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files
    var insert = 'UPDATE user SET img = ? WHERE id = ?'
    console.log("Name " + sampleFile.pic.name + "UserId " + userid)
    db.run(insert, [sampleFile.pic.data, userid],
      function (err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Rows inserted ${this.changes}`);
        db.get("SELECT img FROM user WHERE id = ?", userid)
        console.log(res.img)
        res.render('profile', {
          upload: "File Uploaded!",
          img: userid,
          username: name
        });
      });

  }
  return;
})

module.exports = router;