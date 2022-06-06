const sequelize = require('../model/database-manager')
require('../model/user')
require('../model/question')
require('../model/comment')
require('../model/reaction-type')
require('../model/reaction')
require('../model/follow-question')
require('../model/follow-user')
const { upsertPersistantData } = require('./persistant-data')

const isTestEnv = process.env.NODE_ENV?.trim() === 'test';

sequelize.sync({ force: isTestEnv })
    .then(() => {
        console.log('\x1b[32m✔ \x1b[0mModels synchronisés')

        // Upsert Data
        upsertPersistantData()
        .then(() => {
            console.log('\x1b[32m✔ \x1b[0mUpsert réalisé')
            process.exit()
        }).catch((error) => {
            console.error('\x1b[31m❌ \x1b[0mUpsert non réalisé :', error)
            process.exit()
        })

    }).catch((error) => {
        console.error('\x1b[31m❌ \x1b[0mModels non synchronisés :', error)
        process.exit()
    })
