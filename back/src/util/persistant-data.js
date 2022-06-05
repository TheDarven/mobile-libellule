const reactionTypeModel = require('../model/reaction-type')
const userModel = require('../model/user')

const REACTION_TYPES = [
    {
        reactionTypeId: 1,
        name: 'Upvote',
        imagePath: 'upvote.svg'
    },
    {
        reactionTypeId: 2,
        name: 'Downvote',
        imagePath: 'downvote.svg'
    },
    {
        reactionTypeId: 3,
        name: 'Report',
        imagePath: 'report.svg'
    }
];

async function upsertReactionTypes()
{
    await reactionTypeModel.bulkCreate(REACTION_TYPES,
        {
            updateOnDuplicate: ["name"]
        });
}

async function upsertAdminAccount()
{
    await userModel.upsert({
        name: 'admin',
        password: 'admin',
        displayName: 'Dragonfly',
        isAdmin: true
    });
}

async function upsertPersistantData()
{
    await upsertReactionTypes();

    await upsertAdminAccount();
}

module.exports = { REACTION_TYPES, upsertPersistantData }