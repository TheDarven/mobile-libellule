require('../model/database-manager')
const userModel = require('../model/user')

const isTestEnv = process.env.NODE_ENV?.trim() === 'test';

(async () => {
    await userModel.sync({ force: isTestEnv })
        .then(() => {
            console.log('\x1b[32m✔ \x1b[0mModel user synchronisé')
        }).catch((error) => {
            console.error('\x1b[31m❌ \x1b[0mModel user non synchronisé :', error)
        })

    process.exit()
})()
