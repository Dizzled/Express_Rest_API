
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

          var sql = "SELECT * FROM user where name = '" + req.body.name + "' and email = '" + req.body.email + "'";
          console.log(sql)
          db.get(sql, (err, row) => {
            if(err){
              return console.error(err.message);
            }
            console.log(row)
            try {
              res.render('user',
               {username: "Username " + row.name + " Found"})
            } catch (error) {
                res.render('user', {message: "Could Not find Username"})
            }
          });
          return;
        });
        
module.exports = router;

