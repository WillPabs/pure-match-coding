var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send('Users listing');
});

router.get('/users', user_controller.user_list);

router.post('/user', user_controller.user_create_post);

module.exports = router;
