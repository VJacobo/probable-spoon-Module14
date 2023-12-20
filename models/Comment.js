const { Model, DataTypes } = require('sequelize');
const sequelize = require('../controllers');

class Comment extends Model {}

Comment.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Comment',
});

module.exports = Comment;
