
var express = require('express');
const db = require('../database');
var router = express.Router();

router.get("/", (req, res, next) => {

  res.render('user', { message: "Please Enter Name to Search" });
    });

router.get("/:name", (req, res, next) => {

    var sql = "select * from user where name = ?"
    var params = [req.params.name]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(404).json({"error":err.message});
          return;
        }
        if(row){
          res.render('user', {username: row}

          )}
          else{
            res.render('user',{username: "Cannot Find Username"})
          }
        });
      });

      router.post('/', function(req, res, next){

        var reqEmail = req.body.email;
    
        if(req.body.email > 0){
    
          res.render('user',{message:"Please Enter User Email"});
          return;
        }
          var sql = "select * from user where email = ?";
          var email = req.body.email;
          db.get(sql, email, (err, row) => {
            if(err){
              return console.error(err.message);
            }
            if (row){
              res.render('user',
               {username: "Username " + row.params.name + " Found"})
              
            }else{
              res.render('user', {message: "Could Not find Username"})
            }
          });
          return;
        });
        
module.exports = router;

