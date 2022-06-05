// Testing question endpoint here
const app = require('../app')
const supertest = require('supertest')
const httpStatus = require("http-status")
const { REACTION_CREATED_WITH_SUCCESS, QUESTION_NOT_IDENTIFIED, REACTION_TYPE_NOT_IDENTIFIED, INVALID_TOKEN, COMMENT_NOT_IDENTIFIED, REACTION_DELETED_WITH_SUCCESS, REACTION_NO_LONGER_EXISTS, REACTION_MISSING_PERMISSION } = require("../util/status-message")
const { getUser, getQuestion, getFirstComment, getRandomReactionType } = require('../util/tests/model-utils')
const { REACTION_TYPES, repopulateReactionType } = require('../util/reaction-type')
const reactionModel = require('../model/reaction')

const BASIC_ENDPOINT = '/api/reactions/'
const TYPE_ENDPOINT = '/api/reactions/types/'
const QUESTION_ENDPOINT = '/api/reactions/questions/'
const COMMENT_ENDPOINT = '/api/reactions/comments/'

const RACCOUNT_NAME = "TestReaction"
const RACCOUNT_PASSWORD = "MyPassword"

const RQUESTION_TITLE = "Sample Title Reaction"
const RQUESTION_CONTENT = "Sample Content"

const RCOMMENT_CONTENT = "Sample Content Reaction"
jest.setTimeout(300000);

describe('Reaction Endpoint Test', () => {

    let token, userID, question, comment, type, blankUser;

    it('fill content', async () => {
        const data = await getUser(RACCOUNT_NAME, RACCOUNT_PASSWORD);

        expect(data.token).toBeDefined();
        expect(data.id).toBeDefined();
        expect(data.user).toBeDefined();

        token = data.token;
        userID = data.id;

        question = await getQuestion(RQUESTION_TITLE, RQUESTION_CONTENT, data.user);

        expect(question).toBeDefined();
        expect(question).not.toBeNull();

        comment = await getFirstComment(question.questionId, RCOMMENT_CONTENT, data.user);

        expect(comment).toBeDefined();
        expect(comment).not.toBeNull();

        await repopulateReactionType();
        const typeData = await getRandomReactionType();

        expect(typeData).toBeDefined();
        expect(typeData).not.toBeNull();

        type = typeData.reactionTypeId;

        blankUser = await getUser('BlankUser', RACCOUNT_PASSWORD);
    })

    describe('Reaction of Question Create Test', () => {
        it('should test create', async () => {
            await supertest(app)
                .post(QUESTION_ENDPOINT + `${question.questionId}/`)
                .set('Authorization', token)
                .send({type})
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true);

                    const { reaction } = body.data;
                    expect(reaction.questionId).toBe(question.questionId)
                    expect(reaction.commentId).not.toBeDefined()
                    expect(reaction.type).toBe(type)

                    expect(body.response).toBe(REACTION_CREATED_WITH_SUCCESS)
                })
        })

        it('question should not exists', async () => {
            await supertest(app)
                .post(QUESTION_ENDPOINT + `5000000/`)
                .set('Authorization', token)
                .send({type})
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(QUESTION_NOT_IDENTIFIED)
                })
        })

        it('type should not exists', async () => {
            await supertest(app)
                .post(QUESTION_ENDPOINT + `${question.questionId}/`)
                .set('Authorization', token)
                .send({
                    type: 50000000
                })
                .expect(httpStatus.INTERNAL_SERVER_ERROR)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(REACTION_TYPE_NOT_IDENTIFIED)
                })
        })

        it('reaction should already exists', async () => {
            await supertest(app)
                .post(QUESTION_ENDPOINT + `${question.questionId}/`)
                .set('Authorization', 'invalid_token')
                .send({type})
                .expect(httpStatus.UNAUTHORIZED)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(INVALID_TOKEN)
                })
        })
    })

    describe('Reaction of Comment Create Test', () => {
        it('should test create', async () => {
            await supertest(app)
                .post(COMMENT_ENDPOINT + `${comment.commentId}/`)
                .set('Authorization', token)
                .send({type})
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true);

                    const { reaction } = body.data;
                    expect(reaction.commentId).toBe(comment.commentId)
                    expect(reaction.questionId).not.toBeDefined()
                    expect(reaction.type).toBe(type)

                    expect(body.response).toBe(REACTION_CREATED_WITH_SUCCESS)
                })
        })

        it('comment should not exists', async () => {
            await supertest(app)
                .post(COMMENT_ENDPOINT + `500000/`)
                .set('Authorization', token)
                .send({type})
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(COMMENT_NOT_IDENTIFIED)
                })
        })

        it('type should not exists', async () => {
            await supertest(app)
                .post(COMMENT_ENDPOINT + `${comment.commentId}/`)
                .set('Authorization', token)
                .send({
                    type: 50000000
                })
                .expect(httpStatus.INTERNAL_SERVER_ERROR)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(REACTION_TYPE_NOT_IDENTIFIED)
                })
        })

        it('reaction should already exists', async () => {
            await supertest(app)
                .post(COMMENT_ENDPOINT + `${comment.commentId}/`)
                .set('Authorization', 'invalid_token')
                .send({type})
                .expect(httpStatus.UNAUTHORIZED)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(INVALID_TOKEN)
                })
        })
    })

    describe('Reaction Types Get', () => {
        it('should test getter', async () => {
            await supertest(app)
                .get(TYPE_ENDPOINT)
                .send()
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true);

                    const types = body.data;
                    expect(types.length).toBe(REACTION_TYPES.length)
                })
        })
    })

    describe('Reaction of Type Get', () => {
        it('should test getter', async () => {
            await supertest(app)
                .get(BASIC_ENDPOINT + `${type}/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true);

                    const reactions = body.data;
                    expect(reactions.length).toBe(2)
                })
        })

        it('type should not exists', async () => {
            await supertest(app)
                .get(BASIC_ENDPOINT + `5000000/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(REACTION_TYPE_NOT_IDENTIFIED)
                })
        })

        it('user should not exists', async () => {
            await supertest(app)
                .get(BASIC_ENDPOINT + `${type}/`)
                .set('Authorization', 'invalid_token')
                .send()
                .expect(httpStatus.UNAUTHORIZED)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(INVALID_TOKEN)
                })
        })
    })

    describe('Reaction of Question Get', () => {
        it('should test getter', async () => {
            await supertest(app)
                .get(QUESTION_ENDPOINT + `${question.questionId}/`)
                .send()
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true);

                    const reaction = body.data[0];
                    expect(reaction.type).toBe(type)
                    expect(reaction.amount).toBe(1)
                })
        })

        it('question should not exists', async () => {
            await supertest(app)
                .get(QUESTION_ENDPOINT + `5000000/`)
                .send()
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(QUESTION_NOT_IDENTIFIED)
                })
        })
    })

    describe('Reaction of Comment Get', () => {
        it('should test getter', async () => {
            await supertest(app)
                .get(COMMENT_ENDPOINT + `${comment.commentId}/`)
                .send()
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true);

                    const reaction = body.data[0];
                    expect(reaction.type).toBe(type)
                    expect(reaction.amount).toBe(1)
                })
        })

        it('comment should not exists', async () => {
            await supertest(app)
                .get(COMMENT_ENDPOINT + `5000000/`)
                .send()
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(COMMENT_NOT_IDENTIFIED)
                })
        })
    })

    describe('Reaction of Question Delete', () => {
        it('reaction type should not exists', async () => {
            await supertest(app)
                .delete(QUESTION_ENDPOINT + `${question.questionId}/`)
                .set('Authorization', token)
                .send({ type: 50000000 })
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(REACTION_TYPE_NOT_IDENTIFIED)
                })
        })
        
        it('question should not exists', async () => {
            await supertest(app)
                .delete(QUESTION_ENDPOINT + `50000000/`)
                .set('Authorization', token)
                .send({type})
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(QUESTION_NOT_IDENTIFIED)
                })
        })

        it('user should not exists', async () => {
            await supertest(app)
                .delete(QUESTION_ENDPOINT + `${question.questionId}/`)
                .set('Authorization', 'invalid_token')
                .send({type})
                .expect(httpStatus.UNAUTHORIZED)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(INVALID_TOKEN)
                })
        })

        it('should test delete', async () => {
            await supertest(app)
                .delete(QUESTION_ENDPOINT + `${question.questionId}/`)
                .set('Authorization', token)
                .send({type})
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true);

                    expect(body.response).toBe(REACTION_DELETED_WITH_SUCCESS)
                })
        })

        it('reaction should no longer exists', async () => {
            await supertest(app)
                .delete(QUESTION_ENDPOINT + `${question.questionId}/`)
                .set('Authorization', token)
                .send({type})
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(REACTION_NO_LONGER_EXISTS)
                })
        })
    })

    describe('Reaction of Comment Delete', () => {
        it('reaction type should not exists', async () => {
            await supertest(app)
                .delete(COMMENT_ENDPOINT + `${comment.commentId}/`)
                .set('Authorization', token)
                .send({ type: 50000000 })
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(REACTION_TYPE_NOT_IDENTIFIED)
                })
        })

        it('comment should not exists', async () => {
            await supertest(app)
                .delete(COMMENT_ENDPOINT + `50000000/`)
                .set('Authorization', token)
                .send({type})
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(COMMENT_NOT_IDENTIFIED)
                })
        })

        it('user should not exists', async () => {
            await supertest(app)
                .delete(COMMENT_ENDPOINT + `${comment.commentId}/`)
                .set('Authorization', 'invalid_token')
                .send({type})
                .expect(httpStatus.UNAUTHORIZED)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(INVALID_TOKEN)
                })
        })

        it('should test delete', async () => {
            await supertest(app)
                .delete(COMMENT_ENDPOINT + `${comment.commentId}/`)
                .set('Authorization', token)
                .send({type})
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true);

                    expect(body.response).toBe(REACTION_DELETED_WITH_SUCCESS)
                })
        })

        it('reaction should no longer exists', async () => {
            await supertest(app)
                .delete(COMMENT_ENDPOINT + `${comment.commentId}/`)
                .set('Authorization', token)
                .send({type})
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(REACTION_NO_LONGER_EXISTS)
                })
        })
    })

    describe('Reaction Delete', () => {
        let reactionID;

        it('create required question reaction', async () => {
            const reaction = await reactionModel.create({
                userId: userID, type,
                questionId: question.questionId
            });

            expect(reaction).toBeDefined();
            expect(reaction).not.toBeNull();

            reactionID = reaction.reactionId;
        })

        it('user should not exists', async () => {
            await supertest(app)
                .delete(BASIC_ENDPOINT + `${reactionID}/`)
                .set('Authorization', 'invalid_token')
                .send()
                .expect(httpStatus.UNAUTHORIZED)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(INVALID_TOKEN)
                })
        })

        it('user should not have permission', async () => {
            await supertest(app)
                .delete(BASIC_ENDPOINT + `${reactionID}/`)
                .set('Authorization', blankUser.token)
                .send()
                .expect(httpStatus.INTERNAL_SERVER_ERROR)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(REACTION_MISSING_PERMISSION)
                })
        })

        it('reaction should not exists', async () => {
            await supertest(app)
                .delete(BASIC_ENDPOINT + `5000000/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.INTERNAL_SERVER_ERROR)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(REACTION_NO_LONGER_EXISTS)
                })
        })

        it('should test delete', async () => {
            await supertest(app)
                .delete(BASIC_ENDPOINT + `${reactionID}/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true);

                    expect(body.response).toBe(REACTION_DELETED_WITH_SUCCESS)
                })
        })

        it('reaction should no longer exists', async () => {
            await supertest(app)
                .delete(BASIC_ENDPOINT + `${reactionID}/`)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.INTERNAL_SERVER_ERROR)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false);

                    expect(body.response).toBe(REACTION_NO_LONGER_EXISTS)
                })
        })
    })
})
