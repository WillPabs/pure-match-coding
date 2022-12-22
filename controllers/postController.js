const PostRepository = require('../repository/post');
const CommentRepository = require('../repository/comment');
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
        console.log(posts);
        return res.status(200).render('posts', { 
            title: 'Posts',
            posts: posts
        });
    } catch (e) {
        return res.send({ message: e });
    }
};

exports.get_create_post = async (req, res) => {
    try {
        res.render('createPost', {
            title: 'Create A Post'
        });
    } catch (e) {
        console.log(e);
    }
}

exports.post_create = async (req, res) => {
    try {
        const post = {};
        const { title, description, photo } = req.body;
        post.title = title;
        post.description = description;
        post.photo = photo;
        const { id } = req.user;
        const newPost = await PostRepository.createPost(post, id);
        if (!newPost) return res.status(500).send({ message: 'Server Error'});
        return res.status(201).redirect('posts');
    } catch (e) {
        console.log(e);
        return res.send({ message: e });
    }
}

exports.post_get = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    try {
        const { postId } = req.params;
        if (postId === null || postId === undefined) {
            return res.status(403).send({ message: 'No Post Id Entered'});
        }

        const post = await PostRepository.getPostById(postId);
        if (!post) {
            return res.status(404).send({ message: 'No Post Found' });
        }

        const comments = await CommentRepository.getCommentsByPost(post.id, limit, page);
        const totalPages = Math.ceil(comments.length / limit);
        console.log("TOTAL PAGES:::",totalPages);


        const timeString = getTimeSinceCreated(post.createdAt);
        post.timeSinceCreated = timeString;
        return res.render('post', { post: post, comments: comments });
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