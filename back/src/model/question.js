const db = require('./database-manager')
const { DataTypes } = require("sequelize");
const { oneToMany } = require('../util/associations.js')
const user = require('./user.js')

const question = db.define('Question', {
    questionId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'question_id'
    },
    content: {
        type: DataTypes.STRING(10000),
        allowNull: false,
        field: 'content'
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'title'
    }
});

oneToMany(question, user, {
    foreignKey: {
        name: 'authorId',
        field: 'author_id'
    },
    targetKey: 'userId'
});

module.exports = question;