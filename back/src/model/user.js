const db = require('./database-manager')
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const user = db.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'user_id'
    },
    name: {
        type: DataTypes.STRING(120),
        allowNull: false,
        field: 'name'
    },
    password: {
        type: DataTypes.STRING(120),
        allowNull: false,
        field: 'password',
        set(value) {
            const hash = bcrypt.hashSync(value, parseInt(process.env.SALT));
            this.setDataValue('password', hash);
        }
    },
    displayName: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: 'display_name'
    }
});

module.exports = user;
