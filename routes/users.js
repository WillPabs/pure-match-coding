var express = require('express');
var router = express.Router();
const authJWT = require('../auth/authJWT');

const {
    user_list,
    user_get,
    user_delete,
    user_delete_all,
    user_profile,
    user_update
} = require('../controllers/userController');

router.route('/')
    .get(user_list)

router.route('/profile').all(authJWT.verifyJWT)
    .get(user_profile);

router.route('/:userId')
    .get(user_get)
    .patch(user_update)
    .delete(user_delete);


router.route('/delete/all')
    .delete(user_delete_all);

module.exports = router;
