const PostRepository = require('../repository/post');

exports.user_posts_list = async (req, res) => {
    try {
        const { user } = req;
        console.log("id::::",user);
        const posts = await PostRepository.getPostsByUser(user.id);
        if (!posts) {
            return res.send({message: 'No posts.'});
        }
        return res.status(200).json(posts);
    } catch (e) {
        res.send({ message: e });
    }
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