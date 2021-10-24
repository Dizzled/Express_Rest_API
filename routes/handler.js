var express = require('express');
var router = express.Router();
const db = require('../database');
const fileUpload = require('express-fileupload');
const { fileCheck } = require('../util/helper');


module.exports = {
  uploads: function (req, res) {
      result = fileCheck(req)
      res.render('upload', {
        upload: result
      })
  }
}