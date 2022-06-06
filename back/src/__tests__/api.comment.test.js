// Testing comment endpoint here
const app = require('../app')
const supertest = require('supertest')
const httpStatus = require("http-status")
const { COMMENT_CREATED_WITH_SUCCESS, COMMENT_BODY_INVALID_CONTENT_LENGTH, COMMENT_EDITED_WITH_SUCCESS, COMMENT_NOT_IDENTIFIED,
    QUESTION_NOT_IDENTIFIED, COMMENT_DELETED_WITH_SUCCESS, USER_NOT_IDENTIFIED, INVALID_TOKEN
} = require("../util/status-message")
const { getUser, getQuestion } = require('../util/tests/model-utils')
const { getFirstCommentFromQuestionId, createComment } = require('../service/comment-service')
const { createAdmin, getUserById } = require('../service/user-service')

const BASIC_ENDPOINT = '/api/comments/'
const USER_ENDPOINT = '/api/comments/users/'
const QUESTION_ENDPOINT = '/api/comments/questions/'

const CACCOUNT_NAME = "TestComment"
const CACCOUNT_PASSWORD = "MyPassword"

const CQUESTION_TITLE = "Question Title"
const CQUESTION_CONTENT = "Question Content"

const COMMENT_CONTENT = "Comment Content"
jest.setTimeout(300000);

describe('Question Endpoint Test', () => {

    let token, userID, question, adminToken;

    it('fill content', async () => {
        const data = await getUser(CACCOUNT_NAME, CACCOUNT_PASSWORD);

        expect(data.token).toBeDefined();
        expect(data.id).toBeDefined();
        expect(data.user).toBeDefined();

        token = data.token;
        userID = data.id;

        question = await getQuestion(CQUESTION_TITLE, CQUESTION_CONTENT, data.user);

        expect(question).toBeDefined();
        expect(question).not.toBeNull();

        const adminUser = await createAdmin("CommentAdmin", "Admin");

        expect(adminUser).toBeDefined();
        expect(adminUser).not.toBeNull();
        expect(adminUser.data).toBeDefined();

        adminToken = adminUser.data;
    })

    describe('Comment Create Test', () => {
        it('should test create', async () => {
            await supertest(app)
                .post(QUESTION_ENDPOINT + `${question.questionId}/`)
                .set('Authorization', token)
                .send({
                    content: COMMENT_CONTENT
                })
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true);

                    const comment = body.data;
                    expect(comment.content).toBe(COMMENT_CONTENT)
                    //expect(comment.Reactions.length).toBe(0)

                    expect(body.response).toBe(COMMENT_CREATED_WITH_SUCCESS)
                })
        })

        it('user should not exists', async () => {
            await supertest(app)
                .post(QUESTION_ENDPOINT + `${question.questionId}/`)
                .set('Authorization', 'invalid_token')
                .send({
                    content: COMMENT_CONTENT
                })
                .expect(httpStatus.UNAUTHORIZED)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(INVALID_TOKEN)
                })
        })

        it('question should not exists', async () => {
            await supertest(app)
                .post(QUESTION_ENDPOINT + '500000000/')
                .set('Authorization', token)
                .send({
                    content: COMMENT_CONTENT
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(QUESTION_NOT_IDENTIFIED)
                })
        })

        it('content should be too long', async () => {
            await supertest(app)
                .post(QUESTION_ENDPOINT + `${question.questionId}/`)
                .set('Authorization', token)
                .send({
                    content: 'a'.repeat(10002)
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(COMMENT_BODY_INVALID_CONTENT_LENGTH)
                })
        })
    })

    describe('Comment Edit Test', () => {
        it('should test edit', async () => {
            const comment = await getFirstCommentFromQuestionId(question.questionId);

            await supertest(app)
                .put(BASIC_ENDPOINT + `${comment.commentId}/`)
                .set('Authorization', token)
                .send({
                    content: COMMENT_CONTENT
                })
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true)

                    expect(body.response).toBe(COMMENT_EDITED_WITH_SUCCESS)
                })
        })

        it('user should not have permission', async () => {
            const comment = await getFirstCommentFromQuestionId(question.questionId);

            await supertest(app)
                .put(BASIC_ENDPOINT + `${comment.commentId}/`)
                .set('Authorization', 'invalid_token')
                .send({
                    content: COMMENT_CONTENT
                })
                .expect(httpStatus.UNAUTHORIZED)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(INVALID_TOKEN)
                })
        })

        it('comment should not exists', async () => {
            await supertest(app)
                .put(BASIC_ENDPOINT + '500000000/')
                .set('Authorization', token)
                .send({
                    content: COMMENT_CONTENT
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(COMMENT_NOT_IDENTIFIED)
                })
        })

        it('content should be too long', async () => {
            const comment = await getFirstCommentFromQuestionId(question.questionId);

            await supertest(app)
                .put(BASIC_ENDPOINT + `${comment.commentId}/`)
                .set('Authorization', token)
                .send({
                    content: 'a'.repeat('10002')
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(COMMENT_BODY_INVALID_CONTENT_LENGTH)
                })
        })
    })

    describe('Comment Specific Getter Test', () => {
        it('should test specific getter', async () => {
            const comment = await getFirstCommentFromQuestionId(question.questionId);

            await supertest(app)
                .get(BASIC_ENDPOINT + `${comment.commentId}/`)
                .send()
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true)

                    const comment = body.data;
                    expect(comment.content).toBe(COMMENT_CONTENT)
                    //expect(comment.Reactions.length).toBe(0)
                })
        })

        it('returned content should be empty on inexisting question', async () => {
            await supertest(app)
                .get(BASIC_ENDPOINT + '50000000/')
                .send()
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(COMMENT_NOT_IDENTIFIED)
                })
        })
    })

    describe('Comment Question Listing Test', () => {
        it('should test question list getter', async () => {
            await supertest(app)
                .get(QUESTION_ENDPOINT + `${question.questionId}/`)
                .send()
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true)

                    const comment = body.data[0];
                    expect(comment.content).toBe(COMMENT_CONTENT)
                    //expect(comment.Reactions.length).toBe(0)
                })
        })

        it('question should not exists', async () => {
            await supertest(app)
                .get(QUESTION_ENDPOINT + '500000000/')
                .send()
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(QUESTION_NOT_IDENTIFIED)
                })
        })
    })

    describe('Comment User Listing Test', () => {
        it('should test user listing', async () => {
            await supertest(app)
                .get(USER_ENDPOINT + `${userID}/`)
                .send()
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true)

                    const comment = body.data[0];
                    expect(comment.content).toBe(COMMENT_CONTENT)
                    //expect(comment.Reactions.length).toBe(0)
                })
        })

        it('returned content should be empty on inexisting user', async () => {
            await supertest(app)
                .get(USER_ENDPOINT + `5000000/`)
                .send()
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(USER_NOT_IDENTIFIED)
                })
        })
    })

    describe('Comment Delete Test', () => {

        let comment;

        it("fill comment", async () => {
            comment = await getFirstCommentFromQuestionId(question.questionId);

            expect(question).toBeDefined();
        })

        it('user should not have permission', async () => {
            await supertest(app)
                .delete(BASIC_ENDPOINT + `${comment.commentId}/`)
                .set('Authorization', 'invalid_token')
                .send()
                .expect(httpStatus.UNAUTHORIZED)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(INVALID_TOKEN)
                })
        })

        it('comment should not exists', async () => {
            await supertest(app)
                .delete(BASIC_ENDPOINT + '500000000/')
                .set('Authorization', token)
                .send()
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(COMMENT_NOT_IDENTIFIED)
                })
        })

        it('should test deletion', async () => {
            await supertest(app)
                .delete(BASIC_ENDPOINT + `${comment.commentId}/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true)

                    expect(body.response).toBe(COMMENT_DELETED_WITH_SUCCESS)
                })
        })

        it('comment should no longer exists', async () => {
            await supertest(app)
                .delete(BASIC_ENDPOINT + `${comment.commentId}/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(COMMENT_NOT_IDENTIFIED)
                })
        })

        it('should test admin deletion', async () => {
            const user = await getUserById(userID);
            const commentData = await createComment(COMMENT_CONTENT, question.questionId, user);

            await supertest(app)
            .delete(BASIC_ENDPOINT + `${commentData.data}/`)
            .set('Authorization', adminToken)
            .send()
            .expect(httpStatus.OK)
            .then((response) => {
                const body = response._body;

                expect(body.status).toBe(true)

                expect(body.response).toBe(COMMENT_DELETED_WITH_SUCCESS)
            })
        })
    })
})
