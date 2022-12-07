var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', user_controller.user_list);

router.get('/:userId', user_controller.user_get);

router.post('/user', user_controller.user_create_post);

router.post('/login', user_controller.user_login);

module.exports = router;
