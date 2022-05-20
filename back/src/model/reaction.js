const db = require('./database-manager')
const { DataTypes } = require("sequelize");
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

reaction.belongsTo(user, {
    foreignKey: {
        name: 'userId',
        field: 'user_id'
    },
    targetKey: 'userId'
});
reaction.belongsTo(question, {
    foreignKey: {
        name: 'questionId',
        field: 'question_id'
    },
    targetKey: 'questionId'
});
reaction.belongsTo(comment, {
    foreignKey: {
        name: 'commentId',
        field: 'comment_id'
    },
    targetKey: 'commentId'
});
reaction.belongsTo(reactionType, {
    foreignKey: 'type',
    targetKey: 'reactionTypeId'
});

module.exports = reaction;