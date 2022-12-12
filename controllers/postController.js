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
        const newPost = await PostRepository.createPost(post, id);
        return res.status(201).json(newPost);
    } catch (e) {
        console.log(e);
        return res.send({ message: e });
    }
}

exports.post_get = async (req, res) => {
    try {
        const { postId } = req.params;
        if (postId === null || postId === undefined) {
            return res.status(403).send({ message: 'No Post Id Entered'});
        }

        const post = await PostRepository.getPostById(postId);
        if (!post) {
            return res.status(404).send({ message: 'No Post Found' });
        }

        return res.send(post);
    } catch (e) {
        console.log(e);
        res.send({ message: e });
    }
}

exports.post_update = async (req, res) => {
    try {
        const { postId } = req.params;
        const { post } = req.body;
        const newPost = await PostRepository.updatePost(post);
        return res.status(200).send(newPost);
    } catch (e) {
        console.log(e);
        res.send({ message: e });
    }
}

exports.post_delete = async (req, res) => {
    try {
        const { postId } = req.params;
        await PostRepository.deletePost(postId);
        return res.status(200).send(`Successfully deleted post: ${postId}`);
        
    } catch (e) {
        console.log(e);
        res.send({ message: e });
    }
}

exports.all_users_posts = async (req, res) => {
    const posts = await PostRepository.getAllPosts();
    return res.json(posts);
}