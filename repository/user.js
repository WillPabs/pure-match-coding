const { connect } = require("../db.config");
const { v4 : uuidv4 } = require('uuid');

class UserRepository {
    db = {};

    constructor() {
        this.db = connect();
        // this.db.sequelize.sync({ force: true }).then(() => {
        //         console.log("Drop and re-sync db.");
        //     });
        }
        
    async getUsers() {
        try {
            const users = await this.db.users.findAll();
            return users;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getUserById(id) {
        try {
            const found = await this.db.users.findByPk(id);
            console.log(`user:::`, found);
            return found;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getUserByEmail(email) {
        try {
            const found = await this.db.users.findOne({
                where: {
                    email : email
                }
            });
            console.log(`user:::`, found);
            return found;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async checkEmailAndPassword(email, password) {
        try {
            const user = await this.getUserByEmail(email);
            return user.password === password ? true : false;
        } catch (e) {
            console.log(e);
        }
    }

    async createUser(user) {
        let data = {};
        try {
            console.log('Creating user:::', user);
            data = await this.db.users.create({
                id: uuidv4(),
                name: user.name,
                email: user.email,
                password: user.password
            });
            console.log(data);
        } catch (e) {
            console.log(e);   
        }
        return data;
    }

    async updateUser(user) {
        let data = {};
        try {
            data = await this.db.users.update({...user}, {
                where: {
                    id: user.id
                }
            });
        } catch (e) {
            console.log(e);
        }
        return data;
    }

    async deleteUser(userId) {
        let data = {};
        try {
            data = await this.db.users.destroy({
                where: {
                    id: userId
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

module.exports = new UserRepository();