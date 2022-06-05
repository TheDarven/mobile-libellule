const followUserModel = require('../model/follow-user');
const { 
    FOLLOW_USER_CREATED_WITH_SUCCESS,
    FOLLOW_CREATION_FAILED,
    FOLLOW_NOT_IDENTIFIED, 
    FOLLOW_USER_DELETED_WITH_SUCCESS,
    FOLLOW_DELETION_FAILED,
    FOLLOW_ALERT_RESET_WITH_SUCCESS,
    FOLLOW_ALERT_FAILED
} = require("../util/status-message");
const { CodeError } = require("../util/error-handler");
const httpStatus = require("http-status");
const sequelize = require('sequelize');
const user = require("../model/user");

async function createFollowUser({ targetId, userId })
{
    try {
        if (targetId === userId) throw new CodeError(FOLLOW_CREATION_FAILED, httpStatus.INTERNAL_SERVER_ERROR);
        const follow = await followUserModel.create({
            targetId,
            userId
        })
        if (follow === null) throw new CodeError(FOLLOW_CREATION_FAILED, httpStatus.INTERNAL_SERVER_ERROR);
        return {
            response: FOLLOW_USER_CREATED_WITH_SUCCESS,
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
            response: FOLLOW_USER_DELETED_WITH_SUCCESS,
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
            attributes: ['target_id', 'questionAlerts', 'commentAlerts', 'edition_date'],
            where: {
                userId
            },
            include: [
                { 
                    model: user,
                    as: "User",
                    attributes: {
                        include: [
                            [
                                sequelize.literal(`
                                (SELECT COUNT(*) FROM Comments where author_id = \`User\`.\`user_id\`)
                                `),
                                "nbComment"
                            ],
                            [
                                sequelize.literal(`
                                (SELECT COUNT(*) FROM Questions where author_id = \`User\`.\`user_id\`)
                                `),
                                "nbQuestion"
                            ],
                            [
                                sequelize.literal(`
                                (SELECT COUNT(*) FROM FollowUsers where target_id = \`User\`.\`user_id\`)
                                `),
                                "nbFollower"
                            ],
                        ],
                        exclude: ["name", "password"]
                    }
                },
            ], order: [['creation_date','DESC']]
        })
    } catch (err) {
        console.log(err)
        return null
    }
}

async function alertUserFollowersQuestion({ targetId }) {
    try {
        const data = followUserModel.findOne({ where : { targetId } });
        if (data === null) return null;
        await followUserModel.increment({ questionAlerts: 1}, { where : { targetId } });
    } catch (err) {
        throw new CodeError(FOLLOW_ALERT_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}
async function alertUserFollowersComment({ targetId }) {
    try {
        const data = followUserModel.findOne({ where : { targetId } });
        if (data === null) return null;
        await followUserModel.increment({ commentAlerts: 1}, { where : { targetId } });
    } catch (err) {
        throw new CodeError(FOLLOW_ALERT_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

async function resetUserAlerts({ userId, targetId }) {
    try {
        await followUserModel.update({ alerts: 0}, { where : { userId, targetId } });
        return FOLLOW_ALERT_RESET_WITH_SUCCESS
    } catch (err) {
        throw new CodeError(FOLLOW_ALERT_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

module.exports = { 
    createFollowUser, 
    deleteFollowUser,
    getFollowUserById,
    getFollowUserByUserId,
    alertUserFollowersQuestion,
    alertUserFollowersComment,
    resetUserAlerts,
}