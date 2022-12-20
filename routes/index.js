var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Pure Match',
    loginText: 'Login',
    loginRoute: '/auth/login',
    registerText: 'Register',
    registerRoute:  '/auth/register',
  });
});

module.exports = router;
