var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Pure Match',
    loginText: 'Login',
    loginRoute: '/login',
    registerText: 'Register',
    registerRoute:  '/register',
  });
});

module.exports = router;
