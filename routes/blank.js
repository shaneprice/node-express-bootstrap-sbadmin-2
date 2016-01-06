var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('blank', { title: 'Blank' });
});

module.exports = router;
