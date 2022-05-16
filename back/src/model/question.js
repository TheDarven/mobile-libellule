const db = require('./database-manager')
const { DataTypes } = require("sequelize");
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

question.belongsTo(user, {
    foreignKey: {
        name: 'authorId',
        field: 'author_id'
    },
    targetKey: 'userId'
});

module.exports = question;