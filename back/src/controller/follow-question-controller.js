const express = require('express')
const { INVALID_BODY_DATA, QUESTION_NOT_IDENTIFIED } = require("../util/status-message");
const { CodeError } = require("../util/error-handler");
const { createFollowQuestion, deleteFollowQuestion, getFollowQuestionByUserId, getFollowQuestionById } = require('../service/follow-question-service');
const { getQuestionById } =  require('../service/question-service');
const router = express.Router()

router.post('/', (req, res, next) => {
    // #swagger.summary = "Création d'un follow d'un utilisateur vers une question"
    // #swagger.description = "Création d'un follow vers une question pour l'utilisateur actuellement connecté."
    // #swagger.parameters['authorization'] = { $ref: '#/components/parameters/authorization' }
    /* #swagger.parameters[questionId] = {
        required: true,
        in: 'body',
        type: 'object',
        schema: {
            $questionId: '1864301'
        }
    } */
    /* #swagger.requestBody = {
        required: true,
        schema: { $ref: '#/components/parameters/question' }
    } */
    /* #swagger.responses[200] = {
        schema: { $ref: '#/components/responses/emptyResponse' },
        headers: { $ref: '#/components/headers/token' }
    } */
    /* #swagger.responses[400] = {
        schema: { $ref: '#/components/responses/400' }
    } */
    /* #swagger.responses[404] = {
        schema: { $ref: '#/components/responses/404' }
    } */

    // Check inputs
    const body = req.body
    if (body == null) {
        throw new CodeError(INVALID_BODY_DATA)
    }
    const user = req.user

    // Check parameters
    if (!req.body.questionId) {
        throw new CodeError(QUESTION_NOT_IDENTIFIED);
    }
    getQuestionById(req.body.questionId)
    .then((questionResponse) => {
        if (questionResponse === null) throw new CodeError(QUESTION_NOT_IDENTIFIED);
        // Create follow question
        createFollowQuestion({
            questionId: body.questionId,
            followerId: user.userId
        }).then(({response}) => {
            res.json({ status: true, response })
        }).catch(error => next(error));
    }).catch(error => next(error));


    
});

router.delete('/', (req, res, next) => {
    // #swagger.summary = "Suppression d'un follow d'un utilisateur vers une question"
    // #swagger.description = "Suppression d'un follow vers une question pour l'utilisateur actuellement connecté."
    // #swagger.parameters['authorization'] = { $ref: '#/components/parameters/authorization' }
    /* #swagger.parameters[followQuestionId] = {
        required: true,
        in: 'body',
        type: 'object',
        schema: {
            $followQuestionId: '1864301'
        }
    } */
    /* #swagger.responses[200] = {
        schema: { $ref: '#/components/responses/emptyResponse' },
        headers: { $ref: '#/components/headers/token' }
    } */
    /* #swagger.responses[400] = {
        schema: { $ref: '#/components/responses/400' }
    } */
    /* #swagger.responses[404] = {
        schema: { $ref: '#/components/responses/404' }
    } */

    // Check inputs
    const body = req.body
    if (body == null) {
        throw new CodeError(INVALID_BODY_DATA)
    }
    const user = req.user

    // delete follow question
    deleteFollowQuestion({
        questionId: body.questionId,
        followerId: user.userId
    }).then(({response}) => {
        res.json({ status: true, response })
    }).catch(error => next(error));
});

router.get('/', (req, res, next) => {
    // #swagger.summary = "Recupère tous les follows vers des questions"
    // #swagger.description = "Recupère tous les follows vers des questions de l'utilisateur actuellement connecté."
    // #swagger.parameters['authorization'] = { $ref: '#/components/parameters/authorization' }
    /* #swagger.responses[200] = {
        schema: {
             "status": true,
            "data": [
                {
                    "id": 1,
                    "followerId": 2214,
                    "questionId": 1152
                },
                {
                    "id": 2,
                    "followerId": 2214,
                    "questionId": 4513
                }
            ]
        },
        headers: { $ref: '#/components/headers/token' }
    } */
    /* #swagger.responses[400] = {
        schema: { $ref: '#/components/responses/400' }
    } */
    /* #swagger.responses[404] = {
        schema: { $ref: '#/components/responses/404' }
    } */

    // Check inputs
    const user = req.user
    getFollowQuestionByUserId(user.userId)
    .then((response) => {
        res.json({ status: true, response })
    }).catch(error => next(error));
});
router.get('/:question/', (req, res, next) => {
    // #swagger.summary = "Recupère un follows vers une question précise"
    // #swagger.description = "Recupère un follow ver une question précise de l'utilisateur actuellement connecté."
    // #swagger.parameters['authorization'] = { $ref: '#/components/parameters/authorization' }
    /* #swagger.responses[200] = {
        schema: {
             "status": true,
            "data":
                {
                    "id": 1,
                    "followerId": 2214,
                    "questionId": 1152
                },
        },
        headers: { $ref: '#/components/headers/token' }
    } */
    /* #swagger.responses[400] = {
        schema: { $ref: '#/components/responses/400' }
    } */
    /* #swagger.responses[404] = {
        schema: { $ref: '#/components/responses/404' }
    } */

    // Check inputs
    const user = req.user
    getFollowQuestionById({
        followerId: user.userId,
        questionId: req.params.question
    })
    .then((response) => {
        res.json({ status: true, response })
    }).catch(error => next(error));
});
module.exports = router;