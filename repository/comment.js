const { connect } = require("../config/db.config");
const { v4 : uuidv4 } = require('uuid');

class CommentRepository {
    db = {}

    constructor() {
        this.db = connect();
        // this.db.sequelize.sync({ alter: true }).then(() => {
        //     console.log("Drop and re-sync db.");
        // });
    }
        
    async getAllComments() {
        try {
            const comments = await this.db.comments.findAll();
            return comments;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getCommentsByPost(postId) {
        try {
            const found = await this.db.comments.findAll({
                where: {
                    postId: postId
                },
                include: ['post']
            });
            console.log(`***Comments by Post:::`, found);
            return found;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getCommentById(commentId) {
        try {
            const found = await this.db.comments.findByPk(commentId);
            console.log(`***Comment:::`, found);
            return found;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async createComment(comment, userId, postId) {
        let data = {};
        try {
            console.log('Creating comment:::', comment);
            data = await this.db.comments.create({
                id: uuidv4(),
                postId: postId,
                userId: userId,
                text: comment,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });
            console.log(data);
            return data;
        } catch (e) {
            console.log(e);   
        }
    }

    async updateComment(comment) {
        let data = {};
        try {
            data = await this.db.comments.update({...comment}, {
                where: {
                    id: comment.id
                }
            });
        } catch (e) {
            console.log(e);
        }
        return data;
    }

    async deleteComment(commentId) {
        let data = {};
        try {
            data = await this.db.comments.destroy({
                where: {
                    id: commentId
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

module.exports = new CommentRepository();