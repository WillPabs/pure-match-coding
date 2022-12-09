var express = require('express');
var router = express.Router();
const authJWT = require('../auth/authJWT');

const post_controller = require('../controllers/postController');

/* GET posts page. */
router.get('/', authJWT.verifyJWT, post_controller.user_posts_list);

router.post('/', authJWT.verifyJWT, post_controller.post_create);

module.exports = router;
