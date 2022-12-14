const { Sequelize, Model, DataTypes } = require("sequelize");

const connect = () => {
    
    const hostName = 'localhost';
    const userName = 'postgres';
    const password = 'pass';
    const database = 'postgres';
    const dialect = 'postgres';

    const sequelize = new Sequelize(database, userName, password, {
        host: hostName,
        dialect: dialect,
        operatorsAliases: 0,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    });

    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    db.users = require('../model/user')(sequelize, DataTypes, Model);
    db.posts = require('../model/post')(sequelize, DataTypes, Model);
    db.comments = require('../model/comment')(sequelize, DataTypes);

    db.users.hasMany(db.posts, {
        as: 'posts'
    });
    db.users.hasMany(db.comments);
    db.posts.belongsTo(db.users, {
        foreignKey: 'userId',
        as: 'user'
    });
    db.posts.hasMany(db.comments, {
        as: 'comments'
    });
    db.comments.belongsTo(db.posts, {
        foreignKey: 'postId',
        as: 'post'
    });
    db.comments.belongsTo(db.users, {
        foreignKey: 'userId',
        as: 'user'
    });

    return db;
}

module.exports = {
    connect
}