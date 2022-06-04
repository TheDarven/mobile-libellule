const express = require('express')
const { INVALID_BODY_DATA, USER_NOT_IDENTIFIED } = require("../util/status-message");
const { CodeError } = require("../util/error-handler");
const { createFollowUser, deleteFollowUser, getFollowUserByUserId, getFollowUserById, resetUserAlerts } = require('../service/follow-user-service');
const { getUserById } =  require('../service/user-service');
const { getLastQuestionsFromUser } =  require('../service/question-service');
const { getLastCommentsFromUser } =  require('../service/comment-service');
const router = express.Router()

router.post('/', (req, res, next) => {
    // #swagger.summary = "Création d'un follow d'un utilisateur vers une user"
    // #swagger.description = "Création d'un follow vers une user pour l'utilisateur actuellement connecté."
    // #swagger.parameters['authorization'] = { $ref: '#/components/parameters/authorization' }
    /* #swagger.parameters[userId] = {
        required: true,
        in: 'body',
        type: 'object',
        schema: {
            $targetId: '1864301'
        }
    } */
    /* #swagger.requestBody = {
        required: true,
        schema: { $ref: '#/components/parameters/user' }
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
    if (!req.body.userId) {
        throw new CodeError(USER_NOT_IDENTIFIED);
    }
    getUserById(req.body.userId)
    .then((userResponse) => {
        if (userResponse === null) throw new CodeError(USER_NOT_IDENTIFIED);
        // Create follow user
        createFollowUser({
            targetId: body.userId,
            userId: user.userId
        }).then(({response}) => {
            res.json({ status: true, response })
        }).catch(error => next(error));
    }).catch(error => next(error));



});

router.delete('/:user/', (req, res, next) => {
    // #swagger.summary = "Suppression d'un follow d'un utilisateur vers une user"
    // #swagger.description = "Suppression d'un follow vers une user pour l'utilisateur actuellement connecté."
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

    // delete follow user
    deleteFollowUser({
        targetId: req.params.user,
        userId: user.userId
    }).then(({response}) => {
        res.json({ status: true, response })
    }).catch(error => next(error));
});

router.get('/', (req, res, next) => {
    // #swagger.summary = "Recupère tous les follows vers des users"
    // #swagger.description = "Recupère tous les follows vers des users de l'utilisateur actuellement connecté."
    // #swagger.parameters['authorization'] = { $ref: '#/components/parameters/authorization' }
    /* #swagger.responses[200] = {
        schema: {
             "status": true,
            "data": [
                {
                    "followUserId": 1,
                    "followerId": 2214,
                    "userId": 1152
                },
                {
                    "followUserId": 2,
                    "followerId": 2214,
                    "userId": 4513
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
    getFollowUserByUserId(user.userId)
    .then((data) => {
        res.json({ status: true, data })
    }).catch(error => next(error));
});

router.get('/alerts/', (req, res, next) => {
    // #swagger.summary = "Recupère les follows vers un user précis qui a posté une question ou un commentaire récemment"
    // #swagger.description = "Recupère les follow d'un utilisateur connecté, vers un user précis qui a posté récemennt"
    // #swagger.parameters['authorization'] = { $ref: '#/components/parameters/authorization' }
    /* #swagger.responses[200] = {
        schema: {
            "status": true,
            "data": {
                "questions": [
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
                "comments": [
                    {
                        "id": 1,
                        "content": "Grass is green ? Thought it was brown.",
                        "creation_date": "2022-05-27T11:54:00.000Z",
                        "edition_date": "2022-05-27T11:54:00.000Z",
                        "User": {
                            "display_name": "DefaultDisplay"
                        },
                        "Reactions": []
                    },
                ]
            }
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
    getFollowUserByUserId(user.userId)
    .then((follows) => {
        const promise = follows.map(async (follow) => {
            const questions = await getLastQuestionsFromUser({ authorId: follow.targetId, nbQuestion: follow.questionAlerts });
            const comments = await getLastCommentsFromUser({ authorId: follow.targetId, nbComment: follow.commentAlerts });
            return {
                questions,
                comments,
                targetId: follow.targetId,
            }
        });
        Promise.all(promise).then((data) => {
            res.json({ status: true, data })
        })
    }).catch(error => next(error));
});

router.post('/alerts/:user/', (req, res, next) => {
    // #swagger.summary = "Remet à zéro le compteur d'alertes d'un utilisateur suivi"
    /* #swagger.description = "Remet à zéro le compteur d'alertes d'un utilisateur suivie par un utilisateur connecté"
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
    resetUserAlerts({ userId: user.userId, targetId: req.params.user }).then((response) => {
        res.json({ status: true, response });
    }).catch(error => next(error));
});

router.get('/:user/', (req, res, next) => {
    // #swagger.summary = "Recupère un follows vers une user précise"
    // #swagger.description = "Recupère un follow ver une user précise de l'utilisateur actuellement connecté."
    // #swagger.parameters['authorization'] = { $ref: '#/components/parameters/authorization' }
    /* #swagger.responses[200] = {
        schema: {
             "status": true,
            "data":
                {
                    "followUserId": 1,
                    "followerId": 2214,
                    "userId": 1152
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
    getFollowUserById({
        userId: user.userId,
        targetId: req.params.user
    })
    .then((data) => {
        res.json({ status: true, data })
    }).catch(error => next(error));
});
module.exports = router;
