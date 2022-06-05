const reactionTypeModel = require('../model/reaction-type')

const REACTION_TYPES = [
    {
        name: 'Upvote',
        imagePath: 'upvote.svg'
    },
    {
        name: 'Downvote',
        imagePath: 'downvote.svg'
    },
    {
        name: 'Report',
        imagePath: 'report.svg'
    }
];

async function repopulateReactionType()
{
    // Clear All Types
    await reactionTypeModel.sync({ force: true });

    // Add each Reaction Type
    const data = await reactionTypeModel.bulkCreate(REACTION_TYPES);

    return { data };
}

module.exports = { REACTION_TYPES, repopulateReactionType }