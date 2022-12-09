const PostRepository = require('../repository/post');

exports.user_posts_list = async (req, res) => {
    const { user } = req;
    console.log(user.id);
    const posts = await PostRepository.getPostsByUser(user.id);
    res.status(200).json(posts);
};

exports.post_create = async (req, res) => {
    try {
        const { post } = req;
        const newPost = await PostRepository.createPost(post);
        res.status(201).json(newPost);
    } catch (e) {
        console.log(e);
        res.send({ message: e});
    }
}