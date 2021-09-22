
var express = require('express');
var router = express.Router();
const db = require('../database');

/* GET Login page. */
router.get('/', function(req, res, next) {
  var id = req.sessionID;
  console.log(id)
  var sql = "select * from user where session = ?"
 
  db.get(sql, [id], (err, row) => {
      if (err) {
        res.status(404).json({"error":err.message});
        return;
      }
      if(row){
        res.render('profile', {username: row.name}
        )}
        else{
          res.render('profile',{username: "Cannot Find Username"})
        }
      });
    });



module.exports = router;

