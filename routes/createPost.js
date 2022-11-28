var express = require('express');
var router = express.Router();

/* GET createPost page. */
router.get('/', function(req, res, next) {
  res.render('createPost', { title: 'Create A Post' });
});

module.exports = router;
