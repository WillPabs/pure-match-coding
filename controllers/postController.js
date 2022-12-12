const PostRepository = require('../repository/post');

exports.user_posts_list = async (req, res) => {
    try {
        const { user } = req;
        console.log("id::::",req.user.id);
        const userId = req.user.id;
        if (user === null || user === undefined) {
            return res.status(403).send({ message: 'Please Login' });
        }
        const posts = await PostRepository.getPostsByUser(userId);
        if (!posts) {
            return res.send({message: 'No posts.'});
        }
        return res.status(200).json(posts);
    } catch (e) {
        return res.send({ message: e });
    }
};

exports.post_create = async (req, res) => {
    try {
        const { post } = req.body;
        const { id } = req.user;
        console.log("******USER",req)
        const newPost = await PostRepository.createPost(post, id);
        return res.status(201).json(newPost);
    } catch (e) {
        console.log(e);
        return res.send({ message: e });
    }
}

exports.all_users_posts = async (req, res) => {
    const posts = await PostRepository.getAllPosts();
    return res.json(posts);
}