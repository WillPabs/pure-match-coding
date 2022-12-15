var express = require('express');
var router = express.Router();

const {
    user_list,
    user_get,
    user_register,
    user_login,
    user_delete,
    user_delete_all
} = require('../controllers/userController');

router.route('/')
    .get(user_list)
    .post(user_register);

router.route('/:userId')
    .get(user_get)
    .delete(user_delete);

router.route('/login')
    .post(user_login);

router.route('/delete/all')
    .delete(user_delete_all);

module.exports = router;
