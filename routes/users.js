var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', user_controller.user_list);

router.get('/:userId', user_controller.user_get);

router.post('/', user_controller.user_register);

router.post('/login', user_controller.user_login);

router.delete('/:userId', user_controller.user_delete);

router.delete('/delete/all', user_controller.user_delete_all);

module.exports = router;
