var express = require('express');
var router = express.Router();
const db = require('../database');

router.get('/:id', function (req, res, next) {
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
})


module.exports = router;