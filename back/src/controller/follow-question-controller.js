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
                    "Question": {
                        "User": {
                            "display_name": "Beaver Riverbank Ground Beetle",
                            "user_id": 4,
                        },
                        "authorId": 4,
                        "creation_date": "2022-06-05T20:11:03.624Z",
                        "nbComment": 0,
                        "questionId": 4,
                        "title": "Another Sample Title",
                    },
                    "creation_date": "2022-06-06T18:05:20.798Z",
                    "followQuestionId": 8,
                    "followerId": 5,
                },
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
                "Question": {
                    "User": {
                        "display_name": "Beaver Riverbank Ground Beetle",
                        "user_id": 4,
                    },
                    "authorId": 4,
                    "creation_date": "2022-06-05T20:11:03.624Z",
                    "questionId": 4,
                    "title": "Another Sample Title",
                },
                "alerts": 1,
                "edition_date": "2022-06-06T18:09:26.588Z",
                },
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
    .then((data) => {
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
                    "alerts": 0,
                    "creation_date": "2022-06-06T18:08:14.695Z",
                    "edition_date": "2022-06-06T18:08:14.695Z",
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
