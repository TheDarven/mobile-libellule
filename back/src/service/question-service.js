const questionModel = require('../model/question')

const { QUESTION_EDITED_WITH_SUCCESS, QUESTION_EDITION_FAILED, QUESTION_MISSING_PERMISSION,
    QUESTION_DELETED_WITH_SUCCESS, QUESTION_DELETION_FAILED, QUESTION_CREATION_FAILED, QUESTION_CREATED_WITH_SUCCESS
} = require("../util/status-message");
const { CodeError } = require("../util/error-handler");
const httpStatus = require("http-status");

async function createQuestion(content, title, user)
{
    try {
        const question = await questionModel.create({
            title,
            content,
            authorId: user.userId
        })

        return {
            response: QUESTION_CREATED_WITH_SUCCESS,
            data: { questionId: question.questionId }
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
    if (!user.isAdmin && question == null) {
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

async function getQuestionById(questionId) {
    try {
        return await questionModel.findOne({
            where: {
                questionId
            }
        })
    } catch (err) {
        return null
    }
}

async function getQuestionByTitle(title) {
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

async function getLastQuestionsFromUser({ authorId, nbQuestion }) {
    try {
        console.log(await questionModel.findAll())
        return await questionModel.findAll({
            where: {
                authorId 
            },
            order: [['edition_date', 'DESC']],
            limit: nbQuestion
        })
    } catch (err) {
        return null;
    }
}

module.exports = { createQuestion, updateQuestion, deleteQuestion, getQuestionById, getQuestionByTitle, getLastQuestionsFromUser }