const db = require('./database-manager')
const { DataTypes } = require("sequelize");

const reactionType = db.define('ReactionType', {
    reactionTypeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'reaction_type_id'
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'name'
    },
    imagePath: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'image_path'
    }
});

module.exports = reactionType;