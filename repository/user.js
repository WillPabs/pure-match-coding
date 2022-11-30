const { connect } = require("../db.config");

class UserRepository {
    db = {};

    constructor() {
        this.db = connect();
        // this.db.sequelize.sync({ force: true }).then(() => {
        //     console.log("Drop and re-sync db.");
        // });
    }

    async getUsers() {
        try {
            const users = await this.db.users.findAll();
            console.log('users:::', users);
            return tasks;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async createUser(user) {
        let data = {};
        try {
            data = await this.db.users.create(user);
        } catch (e) {
            console.log(e);   
        }
        return data;
    }
}

module.exports = UserRepository;