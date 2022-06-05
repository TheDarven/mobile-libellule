const followQuestionModel = require('../model/follow-question');
const { 
    FOLLOW_QUESTION_CREATED_WITH_SUCCESS,
    FOLLOW_CREATION_FAILED,
    FOLLOW_NOT_IDENTIFIED, 
    FOLLOW_QUESTION_DELETED_WITH_SUCCESS,
    FOLLOW_DELETION_FAILED,
    FOLLOW_ALERT_FAILED,
    FOLLOW_ALERT_RESET_WITH_SUCCESS
} = require("../util/status-message");
const { CodeError } = require("../util/error-handler");
const httpStatus = require("http-status");
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const question = require('../model/question');
const user = require('../model/user');

async function createFollowQuestion({ followerId, questionId })
{
    try {
        const follow = await followQuestionModel.create({
            followerId,
            questionId
        })
        if (follow === null) throw new CodeError(FOLLOW_CREATION_FAILED, httpStatus.INTERNAL_SERVER_ERROR);
        return {
            response: FOLLOW_QUESTION_CREATED_WITH_SUCCESS,
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
        throw new CodeError(FOLLOW_NOT_IDENTIFIED, httpStatus.BAD_REQUEST)
    }

    try {
        const data = await followQuestionModel.destroy({ where: { questionId, followerId } });

        return {
            response: FOLLOW_QUESTION_DELETED_WITH_SUCCESS,
            data
        }
    } catch (err) {
        throw new CodeError(FOLLOW_DELETION_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

async function getFollowQuestionById({ followerId, questionId}) {
    try {
        return await followQuestionModel.findOne({
            where: {
                followerId,
                questionId
            }
        })
    } catch (err) {
        return null
    }
}

async function getFollowQuestionByUserId(userId) {
    try {
        return await followQuestionModel.findAll({
            where: {
                followerId: userId
            }, include: [
                { 
                    model: question,
                    as: "Question",
                    attributes: {
                        include: [
                            [
                                sequelize.literal(`
                                (SELECT COUNT(*) FROM Comments where question_id = \`Question\`.\`question_id\`)
                                `),
                                "nbComment"
                            ],
                        ],
                        exclude: ["content", "edition_date"]
                    },
                    include: {
                        model: user,
                        as: "User",
                        attributes: ["display_name", "user_id"]
                    }
                },
            ], order: [
                ['creation_date', 'DESC']
            ], attributes: {
                exclude: ["edition_date", "alerts"]
            }
        })
    } catch (err) {
        return null
    }
}

async function getUpdatedFollowQuestionByUserId(userId) {
    try {
        return await followQuestionModel.findAll({
            where: {
                [Op.and]: [
                    { followerId: userId },
                    { alerts: { [Op.gt]: 0 } }
                ]
            },
            include: [
                { 
                    model: question,
                    as: "Question",
                    attributes: {
                        include: [
                            [
                                sequelize.literal(`
                                (SELECT COUNT(*) FROM Comments where question_id = \`Question\`.\`question_id\`)
                                `),
                                "nbComment"
                            ]
                        ]
                    }
                },
            ]
        });
    } catch (err) {
        console.log(err)
        return null
    }
}

async function alertQuestionFollowers({ questionId }) {
    try {
        const data = followQuestionModel.findOne({ where : { questionId } });
        if (data === null) {
            return null;
        }
        await followQuestionModel.increment({ alerts: 1}, { where : { questionId } });
    } catch (err) {
        throw new CodeError(FOLLOW_ALERT_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

async function resetQuestionAlerts({ followerId, questionId }) {
    try {
        await followQuestionModel.update({ alerts: 0}, { where : { questionId, followerId } });
        return FOLLOW_ALERT_RESET_WITH_SUCCESS
    } catch (err) {
        throw new CodeError(FOLLOW_ALERT_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

module.exports = { 
    createFollowQuestion,
    deleteFollowQuestion,
    getFollowQuestionById,
    getFollowQuestionByUserId,
    alertQuestionFollowers,
    getUpdatedFollowQuestionByUserId,
    resetQuestionAlerts
}