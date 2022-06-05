const app = require('../app')
const supertest = require('supertest')
const httpStatus = require("http-status")
const { 
    FOLLOW_USER_CREATED_WITH_SUCCESS,
    INVALID_TOKEN,
    USER_NOT_IDENTIFIED,
    FOLLOW_USER_DELETED_WITH_SUCCESS,
    FOLLOW_NOT_IDENTIFIED,
    FOLLOW_ALERT_RESET_WITH_SUCCESS
} = require("../util/status-message");
const { getUser, getFollowUser, clearFollowUsers, getQuestion, addComment, addUserCommentAlert, addUserQuestionAlert } = require('../util/tests/model-utils');

jest.setTimeout(30000);

const FOLLOW_USER_ENDPOINT = '/api/follow-user/'

const TARGET_ACCOUNT_NAME = "target"
const TARGET_PASSWORD = "MyPassword"

const FOLLOWER_ACCOUNT_NAME = "follower"
const FOLLOWER_PASSWORD = "MyPassword"

describe('Follow User Endpoint Test', () => {
    let target, follower;

    it('fill token & id', async () => {
        const followerData = await getUser(FOLLOWER_ACCOUNT_NAME, FOLLOWER_PASSWORD);

        expect(followerData.token).toBeDefined();
        expect(followerData.id).toBeDefined();

        follower = followerData;

        const targetData = await getUser(TARGET_ACCOUNT_NAME, TARGET_PASSWORD);

        expect(targetData.token).toBeDefined();
        expect(targetData.id).toBeDefined();

        target = targetData;
    });

    describe('Follow User Create Test', () => {
        it('should create a follow user', async () => {
            await supertest(app)
            .post(FOLLOW_USER_ENDPOINT)
            .set('Authorization', follower.token)
            .send({
                userId: target.id
            })
            .expect(httpStatus.OK)
            .then((response) => {
                const body = response.body;

                expect(body.status).toBe(true);

                expect(body.response).toBe(FOLLOW_USER_CREATED_WITH_SUCCESS)
            });
        });
        it('user should not exists', async () => {
            await supertest(app)
                .post(FOLLOW_USER_ENDPOINT)
                .set('Authorization', 'invalid_token')
                .send({
                    targetId: target.id
                })
                .expect(httpStatus.UNAUTHORIZED)
                .then((response) => {
                    const body = response.body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(INVALID_TOKEN)
                })
        })

        it('user should not exists', async () => {
            const inexstingUserId = 500000000;
            await supertest(app)
                .post(FOLLOW_USER_ENDPOINT)
                .set('Authorization', follower.token)
                .send({
                    targetId: inexstingUserId
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response.body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(USER_NOT_IDENTIFIED)
                })
        })
    });
    describe('Follow User Delete Test', () => {
        it("fill follow user", async () => {
            const follow = await getFollowUser(follower.id, target.id);

            expect(follow).toBeDefined();
        })
        it('should delete a follow user', async () => {

            await supertest(app)
            .delete(`${FOLLOW_USER_ENDPOINT}/${target.id}/`)
            .set('Authorization', follower.token)
            .send()
            .expect(httpStatus.OK)
            .then((response) => {
                const body = response.body;

                expect(body.status).toBe(true);

                expect(body.response).toBe(FOLLOW_USER_DELETED_WITH_SUCCESS)
            });
        });
        it('user should not exists', async () => {
            await supertest(app)
                .delete(`${FOLLOW_USER_ENDPOINT}/${target.id}/`)
                .set('Authorization', 'invalid_token')
                .send()
                .expect(httpStatus.UNAUTHORIZED)
                .then((response) => {
                    const body = response.body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(INVALID_TOKEN)
                })
        })

        it('user should not exists', async () => {
            const inexstingUserId = 500000000;
            await supertest(app)
                .delete(`${FOLLOW_USER_ENDPOINT}/${inexstingUserId}/`)
                .set('Authorization', follower.token)
                .send()
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response.body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(FOLLOW_NOT_IDENTIFIED)
                })
        })
    });
    describe('Follow User Get Test', () => {
        let followId, anotherFollowId, anotherUserId;

        it("fill follow user", async () => {

            await clearFollowUsers();
            const follow = await getFollowUser(follower.id, target.id);

            // Another user/ follow add for tests purpose
            const anotherUser = await getUser('AnotherUser', TARGET_PASSWORD);

            anotherUserId = anotherUser.id;

            const anotherFollow = await getFollowUser(follower.id, anotherUser.id);

            followId = follow.followUserId;
            anotherFollowId = anotherFollow.followUserId;

            expect(follow).toBeDefined();
            expect(anotherFollow).toBeDefined();

        })
        it('should get all follow user from user', async () => {
            const expectedResult = [
                {
                    "followUserId": followId,
                    "targetId": target.id,
                    "userId": follower.id
                },
                {
                    "followUserId": anotherFollowId,
                    "targetId": anotherUserId,
                    "userId": follower.id
                }
            ]
            await supertest(app)
            .get(FOLLOW_USER_ENDPOINT)
            .set('Authorization', follower.token)
            .send()
            .expect(httpStatus.OK)
            .then((response) => {
                const body = response.body;

                expect(body.status).toBe(true);

                expect(body.data).toMatchObject(expectedResult)
            });
        });
        it('user should not exists', async () => {
            await supertest(app)
                .get(FOLLOW_USER_ENDPOINT)
                .set('Authorization', 'invalid_token')
                .send()
                .expect(httpStatus.UNAUTHORIZED)
                .then((response) => {
                    const body = response.body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(INVALID_TOKEN)
                })
        })
        it('should get a specific follow user from user', async () => {
            const expectedResult = {
                    "followUserId": followId,
                    "targetId": target.id,
                    "userId": follower.id
                }
            await supertest(app)
            .get(`${FOLLOW_USER_ENDPOINT}/${target.id}/`)
            .set('Authorization', follower.token)
            .send()
            .expect(httpStatus.OK)
            .then((response) => {
                const body = response.body;

                expect(body.status).toBe(true);

                expect(body.data).toMatchObject(expectedResult)
            });
        });

        it('should throw an error if user doesnt exist', async () => {
            await supertest(app)
            .get(`${FOLLOW_USER_ENDPOINT}/500000/`)
            .set('Authorization', follower.token)
            .send()
            .expect(httpStatus.OK)
            .then((response) => {
                const body = response.body;

                expect(body.status).toBe(true);

                expect(body.data).toBe(null)
            });
        });
    });
    describe('Follow Question Alert Test', () => {
        let followerQuestion, targetQuestion, targetComment;
        // target, follower
        it("fill follow user", async () => {
            await clearFollowUsers();
            // Creation du follow
            await getFollowUser(follower.id, target.id);
            // Une question du follower avec un commentaire du target
            followerQuestion = await getQuestion('follower question title', 'question content', { userId: target.id });
            targetComment = await addComment('target comment', followerQuestion.questionId, { userId: target.id });
            await addUserCommentAlert(target.id);
            // Une question du target
            targetQuestion = await getQuestion('target question title', 'question content', { userId: target.id });
            await addUserQuestionAlert(target.id);

        })
        it('should get all recent question and comment from a user followed with alerts', async () => {
            const expectedResult = [{
                questions: [{
                    authorId: targetQuestion.authorId,
                    content: targetQuestion.content,
                    questionId: targetQuestion.questionId,
                    title: targetQuestion.title,
                }],
                comments: [{
                    authorId: targetComment.authorId,
                    commentId: targetComment.commentId,
                    content: targetComment.content,
                    questionId: targetComment.questionId
                }]
            }];

            await supertest(app)
            .get(`${FOLLOW_USER_ENDPOINT}/alerts/`)
            .set('Authorization', follower.token)
            .send()
            .expect(httpStatus.OK)
            .then((response) => {
                const body = response.body;

                expect(body.status).toBe(true);

                expect(body.data).toMatchObject(expectedResult);
            });
        });
        it('should reset alerts from a specific user followed', async () => {
            await supertest(app)
            .post(`${FOLLOW_USER_ENDPOINT}/alerts/${target.id}/`)
            .set('Authorization', follower.token)
            .send()
            .expect(httpStatus.OK)
            .then((response) => {
                const body = response.body;

                expect(body.status).toBe(true);

               expect(body.response).toBe(FOLLOW_ALERT_RESET_WITH_SUCCESS)
            });
        });

    })
});
