const { urlencoded } = require('express');
var express = require('express');
var router = express.Router();
const db = require('../database');

// router.param('email', function (req, res, next, id) {
//   // sample user, would actually fetch from DB, etc...
//   req.email = {
//     id: id,
//     email: '#'
//   }
//   next()
// })

router.get(['/','/:id'], function (req, res, next) {
  user = req.params.name;
  id = req.params.id;

  var query = "SELECT * FROM messages where name = '" + user + "' and userID = '" + id + "'";

  db.get(query, (err, row) => {
    if (err) {
      res.status(404).json({
        "error": err.message
      });
      return;
    }
    if (row){
      res.end(row.message);
    }else{
      res.end("No Message with that id!")
    }
  
  })
  
  return;

}) 

module.exports = router;