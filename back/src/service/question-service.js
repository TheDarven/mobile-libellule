const questionModel = require('../model/question')

const { QUESTION_EDITED_WITH_SUCCESS, QUESTION_EDITION_FAILED, QUESTION_MISSING_PERMISSION,
    QUESTION_DELETED_WITH_SUCCESS, QUESTION_DELETION_FAILED, QUESTION_CREATION_FAILED, QUESTION_CREATED_WITH_SUCCESS
} = require("../util/status-message");
const { CodeError } = require("../util/error-handler");
const httpStatus = require("http-status");

async function createQuestion(content, title, user)
{
    try {
        const question = await questionModel.create({ title, content, authorId: user.userId })

        return {
            response: QUESTION_CREATED_WITH_SUCCESS,
            data: question
        }
    } catch (err) {
        throw new CodeError(QUESTION_CREATION_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

async function updateQuestion(content, questionId, user)
{
    // Check Permission
    const question = await questionModel.findOne({ where: { questionId, authorId: user.userId } });
    if (question == null) {
        throw new CodeError(QUESTION_MISSING_PERMISSION, httpStatus.INTERNAL_SERVER_ERROR)
    }

    try {
        const data = await questionModel.update({ content }, { returning: true, where : { questionId } });

        return {
            response: QUESTION_EDITED_WITH_SUCCESS,
            data
        }
    } catch (err) {
        throw new CodeError(QUESTION_EDITION_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

async function deleteQuestion(questionId, user)
{
    // Check Permission
    const question = await questionModel.findOne({ where: { questionId, authorId: user.userId } });
    if (question == null) {
        throw new CodeError(QUESTION_MISSING_PERMISSION, httpStatus.INTERNAL_SERVER_ERROR)
    }

    try {
        const data = await questionModel.destroy({ where: { questionId } });

        return {
            response: QUESTION_DELETED_WITH_SUCCESS,
            data
        }
    } catch (err) {
        throw new CodeError(QUESTION_DELETION_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

async function getQuestionByTitle(title)
{
    try {
        return await questionModel.findOne({
            where: {
                title
            }
        })
    } catch(err) {
        return null;
    }
}

module.exports = { createQuestion, updateQuestion, deleteQuestion, getQuestionByTitle }