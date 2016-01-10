var express = require('express');
var router = express.Router();

router.get('/objects', function(req, res, next) {
  res.render('objects', {});
});

module.exports = router;