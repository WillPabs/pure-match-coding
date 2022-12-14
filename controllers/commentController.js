const CommentRepository = require('../repository/comment');
const { getTimeSinceCreated } = require('../helpers/date');

// get comment by id
exports.comment_get = async (req, res) => {
    try {
        const { commentId } = req.param;
        const { id } = req.user;
        console.log(id);
        console.log(commentId);
        const c = await CommentRepository.getCommentById(commentId);
        if (c === null || c === undefined) {
            return res.status(404).send({ message: 'Error can not find commment' });
        }
        return res.send(c);
    } catch (e) {
        console.log(e);
        return res.send({ message: e });
    }
};
// get comments by post
exports.all_post_comments = async (req, res) => {
    try {
        const { postId } = req.params;
        console.log(req);
        const comments = await CommentRepository.getCommentsByPost(postId);
        if (!comments) {
            return res.send({ message: 'Error finding post comments' });
        }
        return res.send(comments);
    } catch (e) {
        
    }
}
// create comment
exports.comment_create = async (req, res) => {
    try {
        const { comment } = req.body;
        const { id } = req.user;
        const postId = req.params;
        console.log('PARAMS',postId)
        console.log(comment);
        comment.userId = id;
        comment.postId = postId;
        const c = await CommentRepository.createComment(comment);
        if (c === null || c === undefined) {
            return res.send({ message: 'Error can not create commment' });
        }
        return res.send(c);
    } catch (e) {
        console.log(e);
        return res.send({ message: e });
    }
}
// update comment
exports.comment_update = async (req, res) => {

}
// delete comment
exports.comment_delete = async (req, res) => {

}