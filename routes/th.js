var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('th/', { title: 'Express' });
});

module.exports = router;
