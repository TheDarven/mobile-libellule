const db = require('./database-manager')
const { DataTypes } = require("sequelize");
const user = require('./user.js')
const question = require('./question.js')

const followQuestion = db.define('FollowQuestion', {
    followQuestionId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'follow_question_id'
    }
});

followQuestion.belongsTo(user, {
    foreignKey: {
        name: 'followerId',
        field: 'follower_id'
    },
    targetKey: 'userId'
});
followQuestion.belongsTo(question, {
    foreignKey: {
        name: 'questionId',
        field: 'question_id'
    },
    targetKey: 'questionId'
});

module.exports = followQuestion;