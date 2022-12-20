var express = require('express');
var router = express.Router();

const {
    login_get,
    login_post,
    register_get,
    register_post
} = require('../controllers/authController');

router.route('/login')
    .get(login_get)
    .post(login_post);

router.route('/register')
    .get(register_get)
    .post(register_post);

module.exports = router;