// Testing question endpoint here
const app = require('../app')
const supertest = require('supertest')
const httpStatus = require("http-status")
const { INVALID_TOKEN, QUESTION_CREATED_WITH_SUCCESS, QUESTION_BODY_INVALID_CONTENT_LENGTH, QUESTION_BODY_INVALID_TITLE_LENGTH,
    QUESTION_EDITED_WITH_SUCCESS, QUESTION_DELETED_WITH_SUCCESS, QUESTION_NOT_IDENTIFIED, USER_NOT_IDENTIFIED
} = require("../util/status-message")
const { getUser } = require('../util/tests/model-utils')
const { getQuestionByTitle, createQuestion } = require('../service/question-service')
const { createAdmin, getUserById } = require('../service/user-service')

const BASIC_ENDPOINT = '/api/questions/'
const SPECIFIC_ENDPOINT = '/api/questions/users/'

const QACCOUNT_NAME = "TestQuestion"
const QACCOUNT_PASSWORD = "MyPassword"

const QUESTION_TITLE = "Sample Title"
const QUESTION_CONTENT = "Sample Content"
jest.setTimeout(300000);

describe('Question Endpoint Test', () => {

    let token, userID, adminToken;

    it('fill token & id', async () => {
        const data = await getUser(QACCOUNT_NAME, QACCOUNT_PASSWORD);

        expect(data.token).toBeDefined();
        expect(data.id).toBeDefined();

        token = data.token;
        userID = data.id;

        const adminUser = await createAdmin("QuestionAdmin", "Admin");

        expect(adminUser).toBeDefined();
        expect(adminUser).not.toBeNull();
        expect(adminUser.data).toBeDefined();

        adminToken = adminUser.data;
    })

    describe('Question Create Test', () => {
        it('should test create', async () => {
            await supertest(app)
                .post(BASIC_ENDPOINT)
                .set('Authorization', token)
                .send({
                    title: QUESTION_TITLE,
                    content: QUESTION_CONTENT
                })
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true);

                    expect(body.response).toBe(QUESTION_CREATED_WITH_SUCCESS)
                })
        })

        it('user should not exists', async () => {
            await supertest(app)
                .post(BASIC_ENDPOINT)
                .set('Authorization', 'invalid_token')
                .send({
                    title: QUESTION_TITLE,
                    content: QUESTION_CONTENT
                })
                .expect(httpStatus.UNAUTHORIZED)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(INVALID_TOKEN)
                })
        })

        it('content should be too long', async () => {
            await supertest(app)
                .post(BASIC_ENDPOINT)
                .set('Authorization', token)
                .send({
                    title: QUESTION_TITLE,
                    content: 'a'.repeat(10002)
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(QUESTION_BODY_INVALID_CONTENT_LENGTH)
                })
        })

        it('title should be too short', async () => {
            await supertest(app)
                .post(BASIC_ENDPOINT)
                .set('Authorization', token)
                .send({
                    title: 'abc',
                    content: QUESTION_CONTENT
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(QUESTION_BODY_INVALID_TITLE_LENGTH)
                })
        })

        it('title should be too long', async () => {
            await supertest(app)
                .post(BASIC_ENDPOINT)
                .set('Authorization', token)
                .send({
                    title: 'a'.repeat(256),
                    content: QUESTION_CONTENT
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(QUESTION_BODY_INVALID_TITLE_LENGTH)
                })
        })
    })

    describe('Question Edit Test', () => {
        it('should test edit', async () => {
            const question = await getQuestionByTitle(QUESTION_TITLE);

            await supertest(app)
                .put(BASIC_ENDPOINT + `${question.questionId}/`)
                .set('Authorization', token)
                .send({
                    content: QUESTION_CONTENT
                })
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true)

                    expect(body.response).toBe(QUESTION_EDITED_WITH_SUCCESS)
                })
        })

        it('user should not have permission', async () => {
            const question = await getQuestionByTitle(QUESTION_TITLE);

            await supertest(app)
                .put(BASIC_ENDPOINT + `${question.questionId}/`)
                .set('Authorization', 'invalid_token')
                .send({
                    content: QUESTION_CONTENT
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
                .put(BASIC_ENDPOINT + '500000000/')
                .set('Authorization', token)
                .send({
                    content: QUESTION_CONTENT
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(QUESTION_NOT_IDENTIFIED)
                })
        })

        it('content should be too long', async () => {
            const question = await getQuestionByTitle(QUESTION_TITLE);

            await supertest(app)
                .put(BASIC_ENDPOINT + `${question.questionId}/`)
                .set('Authorization', token)
                .send({
                    content: 'a'.repeat('10002')
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(QUESTION_BODY_INVALID_CONTENT_LENGTH)
                })
        })
    })

    describe('Question Full Listing Test', () => {
        it('should test full list getter', async () => {
            await supertest(app)
                .get(BASIC_ENDPOINT)
                .send()
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true)

                    const question = body.data[0];
                    expect(question.title).toBe(QUESTION_TITLE)
                    expect(question.content).toBe(QUESTION_CONTENT)
                    //expect(question.Reactions.length).toBe(0)
                })
        })
    })

    describe('Question Specific Getter Test', () => {
        it('should test specific getter', async () => {
            const question = await getQuestionByTitle(QUESTION_TITLE);

            await supertest(app)
                .get(BASIC_ENDPOINT + `${question.questionId}/`)
                .send()
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true)

                    const question = body.data;
                    expect(question.title).toBe(QUESTION_TITLE)
                    expect(question.content).toBe(QUESTION_CONTENT)
                    //expect(question.Reactions.length).toBe(0)
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

                    expect(body.response).toBe(QUESTION_NOT_IDENTIFIED)
                })
        })
    })

    describe('Question User Listing Test', () => {
        it('should test user listing', async () => {
            await supertest(app)
                .get(SPECIFIC_ENDPOINT + `${userID}/`)
                .send()
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true)

                    const question = body.data[0];
                    expect(question.title).toBe(QUESTION_TITLE)
                    expect(question.content).toBe(QUESTION_CONTENT)
                    //expect(question.Reactions.length).toBe(0)
                })
        })

        it('returned content should be empty on inexisting user', async () => {
            await supertest(app)
                .get(SPECIFIC_ENDPOINT + `5000000/`)
                .send()
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(USER_NOT_IDENTIFIED)
                })
        })
    })

    describe('Question Delete Test', () => {

        let question;

        it("fill question", async () => {
            question = await getQuestionByTitle(QUESTION_TITLE);

            expect(question).toBeDefined();
        })

        it('user should not have permission', async () => {
            await supertest(app)
                .delete(BASIC_ENDPOINT + `${question.questionId}/`)
                .set('Authorization', 'invalid_token')
                .send()
                .expect(httpStatus.UNAUTHORIZED)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(INVALID_TOKEN)
                })
        })

        it('question should not exists', async () => {
            await supertest(app)
                .delete(BASIC_ENDPOINT + '500000000/')
                .set('Authorization', token)
                .send()
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(QUESTION_NOT_IDENTIFIED)
                })
        })

        it('should test deletion', async () => {
            await supertest(app)
                .delete(BASIC_ENDPOINT + `${question.questionId}/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true)

                    expect(body.response).toBe(QUESTION_DELETED_WITH_SUCCESS)
                })
        })

        it('question should no longer exists', async () => {
            await supertest(app)
                .delete(BASIC_ENDPOINT + `${question.questionId}/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(QUESTION_NOT_IDENTIFIED)
                })
        })

        it('should test admin deletion', async () => {
            const user = await getUserById(userID);
            const questionData = await createQuestion(QUESTION_CONTENT, QUESTION_TITLE, user);

            await supertest(app)
            .delete(BASIC_ENDPOINT + `${questionData.data.questionId}/`)
            .set('Authorization', adminToken)
            .send()
            .expect(httpStatus.OK)
            .then((response) => {
                const body = response._body;

                expect(body.status).toBe(true)

                expect(body.response).toBe(QUESTION_DELETED_WITH_SUCCESS)
            })
        })
    })
})
