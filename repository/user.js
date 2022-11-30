const { connect } = require("../db.config");

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
            console.log('users:::', users);
            return users;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async createUser(user) {
        let data = {};
        try {
            console.log('Creating user:::', user);
            const newId = uuid(); // generate uuid automatically
            data = await this.db.users.create({
                id: newId,
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
}

module.exports = new UserRepository();