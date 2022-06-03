const { loginUser, registerUser, getUserByName } = require("../../service/user-service");
const { createQuestion, getQuestionByTitle } = require("../../service/question-service");
const { createComment, getFirstCommentFromQuestionId } = require('../../service/comment-service')
const { createFollowQuestion } = require("../../service/follow-question-service");
const { CodeError } = require("../error-handler");
const { QUESTION_NOT_IDENTIFIED, COMMENT_NOT_IDENTIFIED } = require("../status-message");
const reactionTypeModel = require("../../model/reaction-type");
const reactionModel = require("../../model/reaction");

async function getUser(name, password)
{
    try {
        const data = await loginUser(name, password);
        const user = await getUserByName(name);

        const token = data.data;
        const id = user.userId;

        return { token, id, user };
    } catch(err) {
        const data = await registerUser(name, password);
        const user = await getUserByName(name);

        const token = data.data;
        const id = user.userId;

        return { token, id, user };
    }
}

async function getQuestion(title, content, user)
{
    try {
        const question = await getQuestionByTitle(title);
        if (question == null) {
            throw new CodeError(QUESTION_NOT_IDENTIFIED);
        }
        return question;
    } catch(err) {
        await createQuestion(content, title, user);
        return await getQuestionByTitle(title);
    }
}

async function getFirstComment(questionId, content, user)
{
    try {
        const comment = await getFirstCommentFromQuestionId(questionId);
        if (comment == null) {
            throw new CodeError(COMMENT_NOT_IDENTIFIED);
        }
        return comment;
    } catch(err) {
        await createComment(content, questionId, user);
        return await getFirstCommentFromQuestionId(questionId);
    }
}

async function getFirstQuestionReaction(questionId, type)
{
    try {
        return await reactionModel.findOne({
            where: { questionId, type }
        });
    } catch(err) {
        return null;
    }
}

async function getFirstCommentReaction(commentId, type)
{
    try {
        return await reactionModel.findOne({
            where: { commentId, type }
        });
    } catch(err) {
        return null;
    }
}

async function getRandomReactionType()
{
    try {
        const count = await reactionTypeModel.count();
        const id = Math.floor(Math.random() * count) + 1;

        return await reactionTypeModel.findOne({
            where: {
                reactionTypeId: id
            }
        });
    } catch(err) {
        return null;
    }
}
async function getFollowQuestion(followerId, questionId) {
    await createFollowQuestion({ followerId, questionId });
    return {
        followerId,
        questionId
    }; //await getFollowQuestion(title); TODO
}

module.exports = { getUser, getQuestion, getFollowQuestion, getFirstComment, getRandomReactionType, getFirstQuestionReaction, getFirstCommentReaction }
