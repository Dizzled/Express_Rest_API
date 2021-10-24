var express = require('express');
const { Cookie } = require('express-session');
var serialize = require('node-serialize');
var router = express.Router();
const db = require('../database');
const { getDeserializeData } = require('../util/helper');

var name, userid;

/* GET Login page. */
router.get('/', function (req, res, next) {
  id = req.sessionID;
  fullname = getDeserializeData(req.cookies.user)
 
  var sql = "select * from user where session = ?"

  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(404).json({
        "error": err.message
      });
      return;
    }
    if (row) {
      userid = row.id
      if (row.img) {
        
        res.render('profile', {
          img : userid,
          username : fullname
        })
      }else{
          res.render('profile', {
            username: fullname
          })
        }
    //If profile image already exists load the image
    } else {
      res.render('profile');
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
      username: fullname
    });
    return;
  } else {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files
    var insert = 'UPDATE user SET img = ? WHERE id = ?'
    // console.log("Name " + sampleFile.pic.name + "UserId " + userid)
    db.run(insert, [sampleFile.pic.data, userid],
      function (err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Rows inserted ${this.changes}`);
        db.get("SELECT img FROM user WHERE id = ?", userid)
        
        res.render('profile', {
          upload: "File Uploaded!",
          img: userid,
          username: fullname
        });
      });

  }
  return;
})

module.exports = router;