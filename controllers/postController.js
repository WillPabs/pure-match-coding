const PostRepository = require('../repository/post');
const { getTimeSinceCreated } = require('../helpers/date');

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
        if (!newPost) return res.status(500).send({ message: 'Server Error'});
        return res.status(201).send(newPost);
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

        const timeString = getTimeSinceCreated(post.createdAt);
        console.log("IN CONTROLLER",timeString);
        post.timeSinceCreated = timeString;
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

        post.id = postId;
        post.updatedAt = Date.now();

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
    return res.send(posts);
}