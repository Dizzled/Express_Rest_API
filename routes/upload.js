var express = require('express');
var router = express.Router();
const db = require('../database');
const fileUpload = require('express-fileupload');

/* GET Uploads Page */
router.get('/', function (req, res, next) {

  res.render('upload');
});

/* Post Upload Page. */
router.post('/', function (req, res) {
  let sampleFile;
  if (!req.files || Object.keys(req.files).length === 0) {
    res.render('upload', {
      upload: "Error No File Selected!!"

    });
    return;
  }else{
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files['pic']
  var insert = 'INSERT INTO user (img_name, img) VALUES (?,?)'
  db.run(insert, [sampleFile['name'], sampleFile['data']],
    function (err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Rows inserted ${this.changes}`);

      res.render('upload', {
        upload: "File Uploaded!"

      });
    });
  }
})


module.exports = router;