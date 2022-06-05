const db = require('./database-manager')
const { DataTypes } = require("sequelize");
const { oneToMany } = require('../util/associations.js')
const user = require('./user.js')
const question = require('./question.js')

const followQuestion = db.define('FollowQuestion', {
    followQuestionId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'follow_question_id'
    },
    alerts: {
        type: DataTypes.INTEGER,
        field: 'alerts',
        defaultValue: 0
    },
}, 
{
    timestamps: true,
    createdAt: 'creation_date',
    updatedAt: 'edition_date'
});

oneToMany(followQuestion, user, {
    foreignKey: {
        name: 'followerId',
        field: 'follower_id'
    },
    targetKey: 'userId'
});
oneToMany(followQuestion, question, {
    foreignKey: {
        name: 'questionId',
        field: 'question_id'
    },
    targetKey: 'questionId'
});

module.exports = followQuestion;