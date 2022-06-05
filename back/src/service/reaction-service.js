const reactionModel = require('../model/reaction')
const reactionTypeModel = require('../model/reaction-type')

const { REACTION_CREATED_WITH_SUCCESS, REACTION_TYPE_NOT_IDENTIFIED, REACTION_ALREADY_EXISTS, REACTION_CREATION_FAILED, REACTION_MISSING_PERMISSION, REACTION_NO_LONGER_EXISTS, REACTION_DELETED_WITH_SUCCESS, REACTION_DELETION_FAILED } = require("../util/status-message");
const { CodeError } = require("../util/error-handler");
const httpStatus = require("http-status");

async function createQuestionReaction(questionId, type, user)
{
    // Check Type
    const possibleType = await getReactionType(type);
    if (possibleType == null) {
        throw new CodeError(REACTION_TYPE_NOT_IDENTIFIED, httpStatus.INTERNAL_SERVER_ERROR)
    }

    // Check Existance
    const possibleReaction = await reactionModel.findOne({
        where: {
            questionId, type,
            userId: user.userId
        }
    });
    if (possibleReaction != null) {
        throw new CodeError(REACTION_ALREADY_EXISTS, httpStatus.INTERNAL_SERVER_ERROR)
    }

    // Create Reaction
    try {
        const reaction = await reactionModel.create({
            questionId, type,
            userId: user.userId
        });

        return {
            response: REACTION_CREATED_WITH_SUCCESS,
            data: { reaction }
        }

    } catch (err) {
        throw new CodeError(REACTION_CREATION_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

async function createCommentReaction(commentId, type, user)
{
    // Check Type
    const possibleType = await getReactionType(type);
    if (possibleType == null) {
        throw new CodeError(REACTION_TYPE_NOT_IDENTIFIED, httpStatus.INTERNAL_SERVER_ERROR)
    }

    // Check Existance
    const possibleReaction = await reactionModel.findOne({
        where: {
            commentId, type,
            userId: user.userId
        }
    });
    if (possibleReaction != null) {
        throw new CodeError(REACTION_ALREADY_EXISTS, httpStatus.INTERNAL_SERVER_ERROR)
    }
    
    // Create Reaction
    try {
        const reaction = await reactionModel.create({
            commentId, type,
            userId: user.userId
        });

        return {
            response: REACTION_CREATED_WITH_SUCCESS,
            data: { reaction }
        }

    } catch (err) {
        throw new CodeError(REACTION_CREATION_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

async function deleteReaction(reactionId, user)
{
    // Check Existance & Check Permission
    const possibleReaction = await reactionModel.findOne({
        where: {
            reactionId
        }
    });
    if (possibleReaction == null) {
        throw new CodeError(REACTION_NO_LONGER_EXISTS, httpStatus.INTERNAL_SERVER_ERROR)
    }
    else if (possibleReaction.userId != user.userId) {
        throw new CodeError(REACTION_MISSING_PERMISSION, httpStatus.INTERNAL_SERVER_ERROR)
    }

    // Delete Reaction
    try {
        const data = await reactionModel.destroy({
            where: {
                reactionId
            }
        });

        return {
            response: REACTION_DELETED_WITH_SUCCESS,
            data
        }
    } catch (err) {
        throw new CodeError(REACTION_DELETION_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

async function getReactionType(reactionTypeId)
{
    try {
        return await reactionTypeModel.findOne({
            where: {
                reactionTypeId
            }
        });
    } catch(err) {
        return null;
    }
}

async function getReactionByQuestion(questionId, type, user) {
    try {
        return await reactionModel.findOne({
            where: {
                questionId, type,
                userId: user.userId
            }
        })
    } catch (err) {
        return null
    }
}

async function getReactionByComment(commentId, type, user) {
    try {
        return await reactionModel.findOne({
            where: {
                commentId, type,
                userId: user.userId
            }
        })
    } catch (err) {
        return null
    }
}

module.exports = { createQuestionReaction, createCommentReaction, deleteReaction, getReactionType, getReactionByQuestion, getReactionByComment }
