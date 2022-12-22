module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('comment', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true
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
        timestamps: false,
        include: ['user']
    })

    return Comments;
}