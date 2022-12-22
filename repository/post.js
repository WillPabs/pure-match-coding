const { connect } = require("../config/db.config");
const { v4 : uuidv4 } = require('uuid');

class PostRepository {
    db = {}

    constructor() {
        this.db = connect();
        this.db.sequelize.sync({ alter: true }).then(() => {
            console.log("Drop and re-sync db.");
        });
    }
        
    async getAllPosts() {
        try {
            const posts = await this.db.posts.findAll();
            return posts;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getPostsByUser(userId) {
        try {
            const found = await this.db.posts.findAll({
                where: {
                    userId: userId
                },
                include: ['comments']
            });
            console.log(`***Posts by User:::`, found);
            return found;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getPostById(postId) {
        try {
            const found = await this.db.posts.findByPk(postId, { include: ['comments', 'user']});
            console.log(`***Post:::`, found);
            return found;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async createPost(post, userId) {
        let data = {};
        try {
            console.log('Creating post:::', post);
            data = await this.db.posts.create({
                id: uuidv4(),
                userId: userId,
                title: post.title,
                description: post.description,
                photo: post.photo,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });
            console.log(data);
            return data;
        } catch (e) {
            console.log(e);   
        }
    }

    async updatePost(post) {
        let data = {};
        try {
            data = await this.db.posts.update({...post}, {
                where: {
                    id: post.id
                }
            });
        } catch (e) {
            console.log(e);
        }
        return data;
    }

    async deletePost(postId) {
        let data = {};
        try {
            data = await this.db.posts.destroy({
                where: {
                    id: postId
                }
            });
        } catch (e) {
            console.log(e);
        }
        return data;
    }

    async deleteAll() {
        try {
            await this.db.users.destroy({
                truncate: true
            });
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new PostRepository();