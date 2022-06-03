const express = require('express')
const { INVALID_BODY_DATA } = require("../util/status-message");
const { CodeError } = require("../util/error-handler");
const { createFollowQuestion } = require('../service/follow-question-service')
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

    // Create follow question
    createFollowQuestion({
        questionId: body.questionId,
        followerId: user.userId
    }).then(({response}) => {
        res.json({ status: true, response })
    }).catch(error => next(error));
});

module.exports = router;