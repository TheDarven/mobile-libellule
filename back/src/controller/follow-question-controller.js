const express = require('express')
const { INVALID_BODY_DATA, QUESTION_NOT_IDENTIFIED } = require("../util/status-message");
const { CodeError } = require("../util/error-handler");
const {
    createFollowQuestion,
    deleteFollowQuestion,
    getFollowQuestionByUserId,
    getFollowQuestionById,
    getUpdatedFollowQuestionByUserId,
    resetQuestionAlerts
} = require('../service/follow-question-service');
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

router.delete('/:question/', (req, res, next) => {
    // #swagger.summary = "Suppression d'un follow d'un utilisateur vers une question"
    // #swagger.description = "Suppression d'un follow vers une question pour l'utilisateur actuellement connecté."
    // #swagger.parameters['authorization'] = { $ref: '#/components/parameters/authorization' }
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
    const user = req.user

    // delete follow question
    deleteFollowQuestion({
        questionId: req.params.question,
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
    .then((data) => {
        res.json({ status: true, data })
    }).catch(error => next(error));
});
router.get('/alerts/', (req, res, next) => {
    // #swagger.summary = "Récupère toutes les question mise à jours suivies par l'utilisateur connecté"
    /* #swagger.description = "Recupère toutes les questions suivies par l'utilisateur connecté,
        qui on été mises à jour ou ayant reçu des commentaires." */
    // #swagger.parameters['authorization'] = { $ref: '#/components/parameters/authorization' }
    /* #swagger.responses[200] = {
        schema: {
            "status": true,
            "data": [
                {
                    "id": 1,
                    "title": "What is the average length ?",
                    "content": "I wanna know what is the average length of things.",
                    "comm_amount": 0,
                    "creation_date": "2022-05-24T23:34:13.000Z",
                    "edition_date": "2022-05-24T23:34:13.000Z",
                    "alerts": 12,
                    "User": {
                        "display_name": "Blue Ladybug"
                    },
                    "Reactions": [
                        {
                            "type": 1,
                            "amount": 1
                        }
                    ]
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
    const user = req.user;
    getUpdatedFollowQuestionByUserId(user.userId)
    .then((questionFollows) => {
        const data = questionFollows.map((follow) => {
            return {
                ...((follow.dataValues).Question.dataValues),
                alerts: follow.alerts
            }
        })
        res.json({ status: true, data });
    }).catch(error => next(error));
});

router.post('/alerts/:question/', (req, res, next) => {
    // #swagger.summary = "Remet à zéro le compteur d'alertes d'une question suivie"
    /* #swagger.description = "Remet à zéro le compteur d'alertes d'une question suivie par un utilisateur connecté"
    // #swagger.parameters['authorization'] = { $ref: '#/components/parameters/authorization' }
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
    const user = req.user;
    resetQuestionAlerts({ followerId: user.userId, questionId: req.params.question }).then((response) => {
        res.json({ status: true, response });
    }).catch(error => next(error));
});

router.get('/:question/', (req, res, next) => {
    // #swagger.summary = "Recupère un follow vers une question précise"
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
    .then((data) => {
        res.json({ status: true, data })
    }).catch(error => next(error));
});
module.exports = router;
