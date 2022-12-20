var express = require('express');
var router = express.Router();

const {
    user_list,
    user_get,
    user_delete,
    user_delete_all
} = require('../controllers/userController');

router.route('/')
    .get(user_list)

router.route('/:userId')
    .get(user_get)
    .delete(user_delete);

router.route('/delete/all')
    .delete(user_delete_all);

module.exports = router;
