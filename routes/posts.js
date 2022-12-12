var express = require('express');
var router = express.Router();
const authJWT = require('../auth/authJWT');

const post_controller = require('../controllers/postController');

/* GET posts page. */
router.get('/', authJWT.verifyJWT, post_controller.user_posts_list);

router.post('/', authJWT.verifyJWT, post_controller.post_create);

router.get('/:postId', authJWT.verifyJWT, post_controller.post_get);

router.put('/:postId', authJWT.verifyJWT, post_controller.post_update);

router.delete('/:postId', authJWT.verifyJWT, post_controller.post_delete);

router.get('/all', authJWT.verifyJWT, post_controller.all_users_posts);

module.exports = router;
