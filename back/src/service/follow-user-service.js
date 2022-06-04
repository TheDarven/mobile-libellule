const followUserModel = require('../model/follow-user');
const { 
    FOLLOW_CREATED_WITH_SUCCESS,
    FOLLOW_CREATION_FAILED,
    FOLLOW_NOT_IDENTIFIED, 
    FOLLOW_DELETED_WITH_SUCCESS,
    FOLLOW_DELETION_FAILED
} = require("../util/status-message");
const { CodeError } = require("../util/error-handler");
const httpStatus = require("http-status");

async function createFollowUser({ targetId, userId })
{
    try {
        const follow = await followUserModel.create({
            targetId,
            userId
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

async function deleteFollowUser({ userId, targetId })
{
    // Check Permission
    const user = await followUserModel.findOne({ where: { userId, targetId } });
    if (user == null) {
        throw new CodeError(FOLLOW_NOT_IDENTIFIED, httpStatus.BAD_REQUEST)
    }

    try {
        const data = await followUserModel.destroy({ where: { userId, targetId } });

        return {
            response: FOLLOW_DELETED_WITH_SUCCESS,
            data
        }
    } catch (err) {
        throw new CodeError(FOLLOW_DELETION_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

async function getFollowUserById({ targetId, userId}) {
    try {
        return await followUserModel.findOne({
            where: {
                targetId,
                userId
            }
        })
    } catch (err) {
        return null
    }
}

async function getFollowUserByUserId(userId) {
    try {
        return await followUserModel.findAll({
            where: {
                userId
            }
        })
    } catch (err) {
        return null
    }
}

module.exports = { createFollowUser, deleteFollowUser, getFollowUserById, getFollowUserByUserId }