const { connect } = require("../config/db.config");
const { v4 : uuidv4 } = require('uuid');

class PostRepository {
    db = {}

    constructor() {
        this.db = connect();
        // this.db.sequelize.sync({ force: true }).then(() => {
        //     console.log("Drop and re-sync db.");
        // });
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
            const found = await this.db.posts.findByPk(userId);
            console.log(`***Posts by User:::`, found);
            return found;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getPostById(postId) {
        try {
            const found = await this.db.posts.findByPk(postId);
            console.log(`***Post:::`, found);
            return found;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async createPost(post) {
        let data = {};
        try {
            console.log('Creating post:::', post);
            data = await this.db.posts.create({
                id: uuidv4(),
                title: post.title,
                description: post.description,
                photo: post.photo
            });
            console.log(data);
        } catch (e) {
            console.log(e);   
        }
        return data;
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