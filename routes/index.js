var express = require('express');
var router = express.Router();
var haikuScript = require('../make_haiku.js')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { haiku: haikuScript.haikuify() });
});

module.exports = router;
