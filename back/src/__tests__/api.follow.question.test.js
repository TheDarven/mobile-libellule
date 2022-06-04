const app = require('../app')
const supertest = require('supertest')
const httpStatus = require("http-status")
const { 
    FOLLOW_CREATED_WITH_SUCCESS,
    INVALID_TOKEN,
    QUESTION_NOT_IDENTIFIED,
    FOLLOW_DELETED_WITH_SUCCESS,
    FOLLOW_NOT_IDENTIFIED
} = require("../util/status-message");
const { getQuestion, getUser, getFollowQuestion, clearFollowQuestions } = require('../util/tests/model-utils');

jest.setTimeout(30000);

const FOLLOW_QUESTION_ENDPOINT = '/api/follow-question/'

const PUBLISHER_ACCOUNT_NAME = "publisher"
const PUBLISHER_PASSWORD = "MyPassword"

const QUESTION_TITLE = "Sample Title"
const QUESTION_CONTENT = "Sample Content"

const FOLLOWER_ACCOUNT_NAME = "follower"
const FOLLOWER_PASSWORD = "MyPassword"

describe('Follow Question Endpoint Test', () => {
    let follower, publisher, questionID;

    it('fill token & id', async () => {
        const publisherData = await getUser(PUBLISHER_ACCOUNT_NAME, PUBLISHER_PASSWORD);

        expect(publisherData.token).toBeDefined();
        expect(publisherData.id).toBeDefined();

        publisher = publisherData;

        const followerData = await getUser(FOLLOWER_ACCOUNT_NAME, FOLLOWER_PASSWORD);

        expect(followerData.token).toBeDefined();
        expect(followerData.id).toBeDefined();

        follower = followerData;

        const question = await getQuestion(QUESTION_TITLE, QUESTION_CONTENT, { userId: publisher.id });
        questionID = question.questionId;
    });

    describe('Follow Question Create Test', () => {
        it('should create a follow question', async () => {
            await supertest(app)
            .post(FOLLOW_QUESTION_ENDPOINT)
            .set('Authorization', follower.token)
            .send({
                questionId: questionID
            })
            .expect(httpStatus.OK)
            .then((response) => {
                const body = response.body;

                expect(body.status).toBe(true);

                expect(body.response).toBe(FOLLOW_CREATED_WITH_SUCCESS)
            });
        });
        it('user should not exists', async () => {
            await supertest(app)
                .post(FOLLOW_QUESTION_ENDPOINT)
                .set('Authorization', 'invalid_token')
                .send({
                    questionId: questionID
                })
                .expect(httpStatus.UNAUTHORIZED)
                .then((response) => {
                    const body = response.body;
    
                    expect(body.status).toBe(false)
    
                    expect(body.response).toBe(INVALID_TOKEN)
                })
        })
    
        it('question should not exists', async () => {
            const inexstingQuestionId = 500000000;
            await supertest(app)
                .post(FOLLOW_QUESTION_ENDPOINT)
                .set('Authorization', follower.token)
                .send({
                    questionId: inexstingQuestionId
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response.body;
    
                    expect(body.status).toBe(false);
    
                    expect(body.response).toBe(QUESTION_NOT_IDENTIFIED)
                })
        })
    });
    describe('Follow Question Delete Test', () => {
        it("fill follow question", async () => {
            const follow = await getFollowQuestion(follower.id, questionID);

            expect(follow).toBeDefined();
        })
        it('should delete a follow question', async () => {

            await supertest(app)
            .delete(FOLLOW_QUESTION_ENDPOINT)
            .set('Authorization', follower.token)
            .send({
                questionId: questionID
            })
            .expect(httpStatus.OK)
            .then((response) => {
                const body = response.body;

                expect(body.status).toBe(true);

                expect(body.response).toBe(FOLLOW_DELETED_WITH_SUCCESS)
            });
        });
        it('user should not exists', async () => {
            await supertest(app)
                .delete(FOLLOW_QUESTION_ENDPOINT)
                .set('Authorization', 'invalid_token')
                .send({
                    questionId: questionID
                })
                .expect(httpStatus.UNAUTHORIZED)
                .then((response) => {
                    const body = response.body;
    
                    expect(body.status).toBe(false)
    
                    expect(body.response).toBe(INVALID_TOKEN)
                })
        })
    
        it('question should not exists', async () => {
            const inexstingQuestionId = 500000000;
            await supertest(app)
                .delete(FOLLOW_QUESTION_ENDPOINT)
                .set('Authorization', follower.token)
                .send({
                    questionId: inexstingQuestionId
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response.body;
    
                    expect(body.status).toBe(false);
    
                    expect(body.response).toBe(FOLLOW_NOT_IDENTIFIED)
                })
        })
    });
    describe('Follow Question Get Test', () => {
        let followId, anotherFollowId, anotherQuestionId;

        it("fill follow question", async () => {
            
            await clearFollowQuestions();
            const follow = await getFollowQuestion(follower.id, questionID);
            
            // Another question/ follow add for tests purpose
            const anotherQuestion = await getQuestion('Another Sample Title', QUESTION_CONTENT, { userId: publisher.id });

            anotherQuestionId = anotherQuestion.questionId;

            const anotherFollow = await getFollowQuestion(follower.id, anotherQuestion.questionId);

            followId = follow.followQuestionId;
            anotherFollowId = anotherFollow.followQuestionId;

            expect(follow).toBeDefined();
            expect(anotherFollow).toBeDefined();

        })
        it('should get all follow question from user', async () => {
            const expectedResult = [
                {
                    "followQuestionId": followId,
                    "followerId": follower.id,
                    "questionId": questionID
                },
                {
                    "followQuestionId": anotherFollowId,
                    "followerId": follower.id,
                    "questionId": anotherQuestionId
                }
            ]
            await supertest(app)
            .get(FOLLOW_QUESTION_ENDPOINT)
            .set('Authorization', follower.token)
            .send()
            .expect(httpStatus.OK)
            .then((response) => {
                const body = response.body;

                expect(body.status).toBe(true);

                expect(body.response).toMatchObject(expectedResult)
            });
        });
        it('user should not exists', async () => {
            await supertest(app)
                .get(FOLLOW_QUESTION_ENDPOINT)
                .set('Authorization', 'invalid_token')
                .send()
                .expect(httpStatus.UNAUTHORIZED)
                .then((response) => {
                    const body = response.body;
    
                    expect(body.status).toBe(false)
    
                    expect(body.response).toBe(INVALID_TOKEN)
                })
        })
        it('should get a specific follow question from user', async () => {
            const expectedResult = {
                    "followQuestionId": followId,
                    "followerId": follower.id,
                    "questionId": questionID
                }
            await supertest(app)
            .get(`${FOLLOW_QUESTION_ENDPOINT}/${questionID}/`)
            .set('Authorization', follower.token)
            .send()
            .expect(httpStatus.OK)
            .then((response) => {
                const body = response.body;

                expect(body.status).toBe(true);

                expect(body.response).toMatchObject(expectedResult)
            });
        });

        it('should throw an error if question doesnt exist', async () => {
            await supertest(app)
            .get(`${FOLLOW_QUESTION_ENDPOINT}/500000/`)
            .set('Authorization', follower.token)
            .send()
            .expect(httpStatus.OK)
            .then((response) => {
                const body = response.body;

                expect(body.status).toBe(true);

                expect(body.response).toBe(null)
            });
        });
    });
});