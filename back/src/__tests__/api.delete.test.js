// Testing cascading delete endpoint here
const app = require('../app')
const supertest = require('supertest')
const httpStatus = require("http-status")
const { COMMENT_NOT_IDENTIFIED, COMMENT_DELETED_WITH_SUCCESS, REACTION_DELETED_WITH_SUCCESS, QUESTION_DELETED_WITH_SUCCESS, QUESTION_NOT_IDENTIFIED, FOLLOW_NOT_IDENTIFIED, REACTION_NO_LONGER_EXISTS, FOLLOW_QUESTION_DELETED_WITH_SUCCESS } = require("../util/status-message")
const { getUser, getQuestion, getFirstComment, getRandomReactionType, getFollowQuestion } = require('../util/tests/model-utils')
const { createQuestionReaction, createCommentReaction } = require('../service/reaction-service')

const QUESTION_ENDPOINT = '/api/questions/'
const COMMENT_ENDPOINT = '/api/comments/'
const REACTION_ENDPOINT = '/api/reactions/'
const FOLLOW_ENDPOINT = '/api/follow-question/'

const DACCOUNT_NAME = "TestDelete"
const DACCOUNT_PASSWORD = "MyPassword"

const DQUESTION_TITLE = "Sample Title Delete"
const DQUESTION_CONTENT = "Sample Content"

const DCOMMENT_CONTENT = "Sample Content Delete"
jest.setTimeout(300000);

describe('Cascade Deletion', () => {
    let user, token;

    it('fill content', async () => {

        // User
        const userData = await getUser(DACCOUNT_NAME, DACCOUNT_PASSWORD);
        expect(userData).toBeDefined();
        expect(userData).not.toBeNull();
        user = userData.user;
        token = userData.token;
    })

    describe('Cascade Delete Question', () => {
        let question, comment, typeID, reactionQuestion, reactionComment;
    
        it('fill content', async () => {
    
            // Question
            question = await getQuestion(DQUESTION_TITLE, DQUESTION_CONTENT, user);
            expect(question).toBeDefined();
            expect(question).not.toBeNull();
    
            // Comment
            comment = await getFirstComment(question.questionId, DCOMMENT_CONTENT, user);
            expect(comment).toBeDefined();
            expect(comment).not.toBeNull();
    
            // Type
            const type = await getRandomReactionType();
            expect(type).toBeDefined();
            expect(type).not.toBeNull();
            typeID = type.reactionTypeId;
    
            // Reaction Question
            const reactionQuestionData = await createQuestionReaction(question.questionId, typeID, user);
            expect(reactionQuestionData).toBeDefined();
            expect(reactionQuestionData).not.toBeNull();
            reactionQuestion = reactionQuestionData.data.reaction;
    
            // Reaction Comment
            const reactionCommentData = await createCommentReaction(comment.commentId, typeID, user);
            expect(reactionCommentData).toBeDefined();
            expect(reactionCommentData).not.toBeNull();
            reactionComment = reactionCommentData.data.reaction;
    
            // Follow
            const follow = await getFollowQuestion(user.userId, question.questionId);
            expect(follow).toBeDefined();
            expect(follow).not.toBeNull();
        })
    
        it('delete question', async () => {
            await supertest(app)
                .delete(QUESTION_ENDPOINT + `${question.questionId}/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true)

                    expect(body.response).toBe(QUESTION_DELETED_WITH_SUCCESS)
                })
        })
    
        it('verify question', async () => {
            await supertest(app)
                .delete(QUESTION_ENDPOINT + `${question.questionId}/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(QUESTION_NOT_IDENTIFIED)
                })
        })
    
        it('verify comment', async () => {
            await supertest(app)
                .delete(COMMENT_ENDPOINT + `${comment.commentId}/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(COMMENT_NOT_IDENTIFIED)
                })
        })
    
        it('verify question reaction', async () => {
            await supertest(app)
                .delete(REACTION_ENDPOINT + `${reactionQuestion.reactionId}/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.INTERNAL_SERVER_ERROR)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(REACTION_NO_LONGER_EXISTS)
                })
        })

        it('verify comment reaction', async () => {
            await supertest(app)
                .delete(REACTION_ENDPOINT + `${reactionComment.reactionId}/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.INTERNAL_SERVER_ERROR)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(REACTION_NO_LONGER_EXISTS)
                })
        })
    
        it('verify follow', async () => {
            await supertest(app)
                .delete(FOLLOW_ENDPOINT + `${question.questionID}/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response.body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(FOLLOW_NOT_IDENTIFIED)
                });
        })
    })
    
    describe('Cascade Delete Comment', () => {
        let question, comment, typeID, reactionQuestion, reactionComment;

        it('fill content', async () => {

            // Question
            question = await getQuestion(DQUESTION_TITLE, DQUESTION_CONTENT, user);
            expect(question).toBeDefined();
            expect(question).not.toBeNull();
    
            // Comment
            comment = await getFirstComment(question.questionId, DCOMMENT_CONTENT, user);
            expect(comment).toBeDefined();
            expect(comment).not.toBeNull();
    
            // Type
            const type = await getRandomReactionType();
            expect(type).toBeDefined();
            expect(type).not.toBeNull();
            typeID = type.reactionTypeId;
    
            // Reaction Question
            const reactionQuestionData = await createQuestionReaction(question.questionId, typeID, user);
            expect(reactionQuestionData).toBeDefined();
            expect(reactionQuestionData).not.toBeNull();
            reactionQuestion = reactionQuestionData.data.reaction;
    
            // Reaction Comment
            const reactionCommentData = await createCommentReaction(comment.commentId, typeID, user);
            expect(reactionCommentData).toBeDefined();
            expect(reactionCommentData).not.toBeNull();
            reactionComment = reactionCommentData.data.reaction;
    
            // Follow
            const follow = await getFollowQuestion(user.userId, question.questionId);
            expect(follow).toBeDefined();
            expect(follow).not.toBeNull();
        })
    
        it('delete comment', async () => {
            await supertest(app)
                .delete(COMMENT_ENDPOINT + `${comment.commentId}/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true)

                    expect(body.response).toBe(COMMENT_DELETED_WITH_SUCCESS)
                })
        })
    
        it('verify comment', async () => {
            await supertest(app)
                .delete(COMMENT_ENDPOINT + `${comment.commentId}/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(COMMENT_NOT_IDENTIFIED)
                })
        })
    
        it('verify comment reaction', async () => {
            await supertest(app)
                .delete(REACTION_ENDPOINT + `${reactionComment.reactionId}/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.INTERNAL_SERVER_ERROR)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(REACTION_NO_LONGER_EXISTS)
                })
        })
    
        it('verify follow', async () => {
            await supertest(app)
                .delete(FOLLOW_ENDPOINT + `${question.questionId}/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response.body;

                    expect(body.status).toBe(true);

                    expect(body.response).toBe(FOLLOW_QUESTION_DELETED_WITH_SUCCESS)
                });
        })

        it('verify question reaction', async () => {
            await supertest(app)
                .delete(REACTION_ENDPOINT + `${reactionQuestion.reactionId}/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true);

                    expect(body.response).toBe(REACTION_DELETED_WITH_SUCCESS)
                })
        })
    })    
})
