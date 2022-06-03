const followQuestionModel = require('../model/follow-question');
const { FOLLOW_CREATED_WITH_SUCCESS, FOLLOW_CREATION_FAILED } = require("../util/status-message");
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

module.exports = { createFollowQuestion }