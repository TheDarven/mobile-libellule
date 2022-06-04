const commentModel = require('../model/comment')

const { COMMENT_CREATED_WITH_SUCCESS, COMMENT_CREATION_FAILED, COMMENT_MISSING_PERMISSION,
    COMMENT_EDITED_WITH_SUCCESS, COMMENT_EDITION_FAILED, COMMENT_DELETED_WITH_SUCCESS, COMMENT_DELETION_FAILED
} = require("../util/status-message");
const { CodeError } = require("../util/error-handler");
const httpStatus = require("http-status");

async function createComment(content, questionId, user)
{
    try {
        const comment = await commentModel.create({
            content,
            questionId,
            authorId: user.userId
        })

        return {
            response: COMMENT_CREATED_WITH_SUCCESS,
            data: comment.commentId
        }
    } catch (err) {
        throw new CodeError(COMMENT_CREATION_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

async function updateComment(content, commentId, user)
{
    // Check Permission
    const comment = await commentModel.findOne({ where: { commentId, authorId: user.userId } });
    if (comment == null) {
        throw new CodeError(COMMENT_MISSING_PERMISSION, httpStatus.INTERNAL_SERVER_ERROR)
    }

    try {
        const data = await commentModel.update({ content }, { returning: true, where : { commentId } });

        return {
            response: COMMENT_EDITED_WITH_SUCCESS,
            data
        }
    } catch (err) {
        throw new CodeError(COMMENT_EDITION_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

async function deleteComment(commentId, user)
{
    // Check Permission
    const comment = await commentModel.findOne({ where: { commentId, authorId: user.userId } });
    if (!user.isAdmin && comment == null) {
        throw new CodeError(COMMENT_MISSING_PERMISSION, httpStatus.INTERNAL_SERVER_ERROR)
    }

    try {
        const data = await commentModel.destroy({ where: { commentId } });

        return {
            response: COMMENT_DELETED_WITH_SUCCESS,
            data
        }
    } catch (err) {
        throw new CodeError(COMMENT_DELETION_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

async function getCommentById(commentId, options = {}) {
    try {
        return await commentModel.findOne({
            where: {
                commentId
            },
            ...options
        })
    } catch (err) {
        return null
    }
}

async function getFirstCommentFromQuestionId(questionId) {
    try {
        return await commentModel.findOne({
            where: {
                questionId
            }
        })
    } catch (err) {
        return null;
    }
}

async function getLastCommentsFromUser({ authorId, nbComment }) {
    try {
        return await commentModel.findAll({
            where: {
                authorId 
            },
            order: [['edition_date', 'DESC']],
            limit: nbComment
        })
    } catch (err) {
        return null;
    }
}


module.exports = { createComment, updateComment, deleteComment, getCommentById, getFirstCommentFromQuestionId, getLastCommentsFromUser }
