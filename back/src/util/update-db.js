require('../model/database-manager')
const userModel = require('../model/user')
const questionModel = require('../model/question')
const commentModel = require('../model/comment')
const reactionTypeModel = require('../model/reaction-type')
const reactionModel = require('../model/reaction')
const followQuestionModel = require('../model/follow-question')
const followUserModel = require('../model/follow-user')

const isTestEnv = process.env.NODE_ENV?.trim() === 'test';

(async () => {
    await userModel.sync({ force: isTestEnv })
        .then(() => {
            console.log('\x1b[32m✔ \x1b[0mModel user synchronisé')
        }).catch((error) => {
            console.error('\x1b[31m❌ \x1b[0mModel user non synchronisé :', error)
        })
    
    await questionModel.sync({ force: isTestEnv })
        .then(() => {
            console.log('\x1b[32m✔ \x1b[0mModel question synchronisé')
        }).catch((error) => {
            console.error('\x1b[31m❌ \x1b[0mModel question non synchronisé :', error)
        })

    await commentModel.sync({ force: isTestEnv })
        .then(() => {
            console.log('\x1b[32m✔ \x1b[0mModel comment synchronisé')
        }).catch((error) => {
            console.error('\x1b[31m❌ \x1b[0mModel comment non synchronisé :', error)
        })

    await reactionTypeModel.sync({ force: isTestEnv })
        .then(() => {
            console.log('\x1b[32m✔ \x1b[0mModel reactionType synchronisé')
        }).catch((error) => {
            console.error('\x1b[31m❌ \x1b[0mModel reactionType non synchronisé :', error)
        })

    await reactionModel.sync({ force: isTestEnv })
        .then(() => {
            console.log('\x1b[32m✔ \x1b[0mModel reaction synchronisé')
        }).catch((error) => {
            console.error('\x1b[31m❌ \x1b[0mModel reaction non synchronisé :', error)
        })

    await followQuestionModel.sync({ force: isTestEnv })
        .then(() => {
            console.log('\x1b[32m✔ \x1b[0mModel followQuestion synchronisé')
        }).catch((error) => {
            console.error('\x1b[31m❌ \x1b[0mModel followQuestion non synchronisé :', error)
        })

    await followUserModel.sync({ force: isTestEnv })
        .then(() => {
            console.log('\x1b[32m✔ \x1b[0mModel followUser synchronisé')
        }).catch((error) => {
            console.error('\x1b[31m❌ \x1b[0mModel followUser non synchronisé :', error)
        })

    process.exit()
})()
