module.exports = (sequelize, DataTypes, Model) => {

    class Posts extends Model {}

    Posts.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        }
    }, {
        sequelize,
        modelName: 'posts',
        timestamps: false,
        include: ['user', 'comments']
    });

    return Posts;
};