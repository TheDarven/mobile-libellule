const db = require('./database-manager')
const { DataTypes } = require("sequelize");
const { oneToMany } = require('../util/associations.js')
const user = require('./user.js')
const question = require('./question.js')
const comment = require('./comment.js')
const reactionType = require('./reaction-type.js')

const reaction = db.define('Reaction', {
    reactionId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'reaction_id'
    }
});

oneToMany(reaction, user, {
    foreignKey: {
        name: 'userId',
        field: 'user_id'
    },
    targetKey: 'userId'
});
oneToMany(reaction, question, {
    foreignKey: {
        name: 'questionId',
        field: 'question_id'
    },
    targetKey: 'questionId'
});
oneToMany(reaction, comment, {
    foreignKey: {
        name: 'commentId',
        field: 'comment_id'
    },
    targetKey: 'commentId'
});
oneToMany(reaction, reactionType, {
    foreignKey: 'type',
    targetKey: 'reactionTypeId'
});

module.exports = reaction;