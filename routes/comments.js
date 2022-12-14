var express = require('express');
var router = express.Router();
const authJWT = require('../auth/authJWT');

const comment_controller = require('../controllers/commentController');

router.get('/:commentId', authJWT.verifyJWT, comment_controller.comment_get);

router.get('/', authJWT.verifyJWT, comment_controller.all_post_comments);

router.post('/', authJWT.verifyJWT, comment_controller.comment_create);

router.patch('/:commentId', authJWT.verifyJWT, comment_controller.comment_update);

router.delete('/:commentId', authJWT.verifyJWT, comment_controller.comment_delete);

module.exports = router;