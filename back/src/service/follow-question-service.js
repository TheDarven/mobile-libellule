const followQuestionModel = require('../model/follow-question');
const { 
    FOLLOW_CREATED_WITH_SUCCESS,
    FOLLOW_CREATION_FAILED,
    FOLLOW_MISSING_PERMISSION, 
    FOLLOW_DELETED_WITH_SUCCESS,
    FOLLOW_DELETION_FAILED
} = require("../util/status-message");
const { CodeError } = require("../util/error-handler");
const httpStatus = require("http-status");

async function createFollowQuestion({ followerId, questionId })
{
    try {
        const follow = await followQuestionModel.create({
            followerId,
            questionId
        })
        if (follow === null) throw new CodeError(FOLLOW_CREATION_FAILED, httpStatus.INTERNAL_SERVER_ERROR);
        return {
            response: FOLLOW_CREATED_WITH_SUCCESS,
            data: follow
        }
    } catch (err) {
        throw new CodeError(FOLLOW_CREATION_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

async function deleteFollowQuestion({ questionId, followerId })
{
    // Check Permission
    const question = await followQuestionModel.findOne({ where: { questionId, followerId } });
    if (question == null) {
        throw new CodeError(FOLLOW_MISSING_PERMISSION, httpStatus.BAD_REQUEST)
    }

    try {
        const data = await followQuestionModel.destroy({ where: { questionId, followerId } });

        return {
            response: FOLLOW_DELETED_WITH_SUCCESS,
            data
        }
    } catch (err) {
        throw new CodeError(FOLLOW_DELETION_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

module.exports = { createFollowQuestion, deleteFollowQuestion }