const { Sequelize } = require("sequelize");
require('../util/env-loader')

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    logging: false,
    define: {
        timestamps: false
    },
});

sequelize.authenticate()
    .then(() => console.log('\x1b[32m✔ \x1b[0mConnexion à la base de donnée établie.'))
    .catch((error) => console.error('\x1b[31m❌ \x1b[0mImpossible de se connecter, erreur suivante :', error))

module.exports = sequelize
