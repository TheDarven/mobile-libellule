const express = require('express')
const { INVALID_BODY_DATA, USER_NOT_IDENTIFIED } = require("../util/status-message");
const { CodeError } = require("../util/error-handler");
const { createFollowUser, deleteFollowUser, getFollowUserByUserId, getFollowUserById } = require('../service/follow-user-service');
const { getUserById } =  require('../service/user-service');
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
    .then((response) => {
        res.json({ status: true, response })
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
    .then((response) => {
        res.json({ status: true, response })
    }).catch(error => next(error));
});
module.exports = router;