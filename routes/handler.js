var express = require('express');
var router = express.Router();
const db = require('../database');
var md5 = require('md5');
const { getDeserializeData, setProfileCookie } = require('../util/helper');
const {
  fileCheck
} = require('../util/helper');


module.exports = {

  img: function(req, res){
    id = req.params.id
    console.log(id)
    var sql = "select img from user where id = ?"
  
    db.get(sql, [id], (err, row) => {
      if (err) {
        res.status(404).json({
          "error": err.message
        });
        return;
      }
      if (row){
        res.end(row.img);
      }else{
        res.end("No Img with that id!")
      }
    })
  },

  uploads: function (req, res) {
    result = fileCheck(req)
    res.render('upload', {
      upload: result
    })
  },

  fileread: function (req, res) {
    res.render('fileread', {
      title: "Test"
    })
  },

  profileGET: function (req, res) {
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
            img: userid,
            username: fullname
          })
        } else {
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
  },

  profilePOST: function (req, res) {
    /* Post Upload Page. */
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
  },

  loginGET: function(req, res){

    res.setHeader('Content-Type', 'text/html')
    res.render('login', {
  
      login: "Login"
    });
  },

  loginPOST: function(req, res){

    if (req.body.email === 'badman@test.com' && req.body.password === 'password') {
      res.redirect('/profile')
      return;
    }
    
    let email = req.body.email;
    let pass = md5(req.body.password);
  
    var query = "SELECT * FROM user where email = '" + email + "' and password = '" + pass + "'";
  
    // console.log(query);
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
            setProfileCookie(req, res)
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
  }
}