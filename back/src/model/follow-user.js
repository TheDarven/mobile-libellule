const db = require('./database-manager')
const { DataTypes } = require("sequelize");
const { oneToMany } = require('../util/associations.js')
const user = require('./user.js')

const followUser = db.define('FollowUser', {
    followUserId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'follow_user_id'
    },
    commentAlerts: {
        type: DataTypes.INTEGER,
        field: 'comment_alerts',
        defaultValue: 0
    },
    questionAlerts: {
        type: DataTypes.INTEGER,
        field: 'question_alerts',
        defaultValue: 0
    }
});

oneToMany(followUser, user, {
    foreignKey: {
        name: 'userId',
        field: 'user_id'
    },
    targetKey: 'userId'
});
oneToMany(followUser, user, {
    foreignKey: {
        name: 'targetId',
        field: 'target_id'
    },
    targetKey: 'userId'
});

module.exports = followUser;