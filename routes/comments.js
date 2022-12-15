var express = require('express');
var router = express.Router();
const authJWT = require('../auth/authJWT');

const {
    comment_get,
    comment_create,
    comment_delete,
    comment_update,
    all_post_comments
} = require('../controllers/commentController');

router.route('/:postId/comments/').all(authJWT.verifyJWT)
    .get(all_post_comments)
    .post(comment_create);

router.route('/:postId/comments/:commentId').all(authJWT.verifyJWT)
    .get(comment_get)
    .patch(comment_update)
    .delete(comment_delete);

module.exports = router;