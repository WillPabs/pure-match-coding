var express = require('express');
var router = express.Router();

const UserRepository = require('../repository/user');
const user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send('Users listing');
});

router.get('/users', user_controller.user_list);

router.put('/user', user_controller.user_create_post);

module.exports = router;
