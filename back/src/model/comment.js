const db = require('./database-manager')
const { DataTypes } = require("sequelize");
const { oneToMany } = require('../util/associations.js')
const user = require('./user.js')
const question = require('./question.js')

const comment = db.define('Comment', {
    commentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'comment_id'
    },
    content: {
        type: DataTypes.STRING(10000),
        allowNull: false,
        field: 'content'
    }
});

oneToMany(comment, question, {
    foreignKey: {
        name: 'questionId',
        field: 'question_id'
    },
    targetKey: 'questionId'
});
oneToMany(comment, user, {
    foreignKey: {
        name: 'authorId',
        field: 'author_id'
    },
    targetKey: 'userId'
});

module.exports = comment;