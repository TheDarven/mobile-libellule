require('../model/database-manager')

require('../model/user')
    .sync()
    .then(() => {
        console.log('\x1b[32m✔ \x1b[0mModel user synchronisé')
    }).catch((error) => {
    console.error('\x1b[31m❌ \x1b[0mModel user non synchronisé :', error);
})
