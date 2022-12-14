module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('comment', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        postId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { 
                model: 'posts',
                key: 'id',
            },
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { 
                model: 'users',
                key: 'id',
            },
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'comments',
        timestamps: false
    })

    return Comments;
}