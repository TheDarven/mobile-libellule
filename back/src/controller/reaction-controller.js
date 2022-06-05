const express = require('express')
const { REACTION_TYPE_NOT_IDENTIFIED, INVALID_BODY_DATA, REACTION_NO_LONGER_EXISTS, REACTION_DELETED_WITH_SUCCESS, QUESTION_NOT_IDENTIFIED, COMMENT_NOT_IDENTIFIED } = require("../util/status-message");
const sequelize = require('sequelize');
const { CodeError } = require("../util/error-handler");
const questionModel = require('../model/question.js')
const commentModel = require('../model/comment.js')
const reactionModel = require('../model/reaction.js')
const reactionTypeModel = require('../model/reaction-type');
const { getReactionByQuestion, createQuestionReaction, createCommentReaction, deleteReaction, getReactionType, getReactionByComment } = require('../service/reaction-service');
const { getCommentById } = require('../service/comment-service');
const { getQuestionById } = require('../service/question-service');
const router = express.Router()

router.get('/types/', (req, res, next) => {
    // #swagger.summary = 'Liste les types de réactions'
    // #swagger.description = "Donne la liste de types de reactions."
    /* #swagger.responses[200] = {
        schema: {
            "status": true,
            "data": [
                {
                    "reaction_type_id": 1,
                    "name": 'Upvote',
                    "image_path": 'upvote.svg'
                },
                {
                    "reaction_type_id": 2,
                    "name": 'Downvote',
                    "image_path": 'downvote.svg'
                },
                {
                    "reaction_type_id": 3,
                    "name": 'Report',
                    "image_path": 'report.svg'
                }
            ]
        }
    } */

    reactionTypeModel.findAll({
        attributes: [ 'reaction_type_id', 'name', 'image_path' ]
    })
    .then((data) => {
        res.json({ status: true, data });
    })
    .catch(error => next(error));
});

router.get('/:type/', (req, res, next) => {
    // #swagger.summary = 'Liste les réactions d'un type'
    // #swagger.description = "Donne la liste des réactions en fonction d'un certain type."
    /* #swagger.responses[200] = {
        schema: {
            "status": true,
            "data": [
                {
                    "reaction_id": 1,
                    "user_id": 1,
                    "question_id": 1,
                    "comment_id": null,
                    "type": 3
                },
                {
                    "reaction_id": 2,
                    "user_id": 1,
                    "question_id": null,
                    "comment_id": 1,
                    "type": 3
                }
            ]
        }
    } */

    // Check Type
    reactionTypeModel.findOne({
        where: {
            reactionTypeId: req.params.type
        }
    })
    .then((type) => {

        if (type == null) {
            throw new CodeError(REACTION_TYPE_NOT_IDENTIFIED);
        }

        const user = req.user;

        reactionModel.findAll({
            attributes: [ 'reaction_id', 'user_id', 'question_id', 'comment_id', 'type' ],
            where: {
                userId: user.userId,
                type: req.params.type
            }
        })
        .then((data) => {
            res.json({ status: true, data });
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

router.get('/questions/:question/', (req, res, next) => {
    // #swagger.summary = 'Liste les types de réactions d'une question'
    // #swagger.description = "Donne la liste des reactions d'une question spécifique."
    /* #swagger.responses[200] = {
        schema: {
            "status": true,
            "data": [
                {
                    "reaction_id": 1,
                    "user_id": 1,
                    "question_id": 1,
                    "comment_id": null,
                    "type": 3
                }
            ]
        }
    } */

    questionModel.findOne({
        where: {
            questionId: req.params.question
        }
    })
    .then((data) => {
        if (data == null) {
            throw new CodeError(QUESTION_NOT_IDENTIFIED);
        }

        reactionModel.findAll({
            attributes: [ 'type', [sequelize.fn('count', sequelize.col('reaction_id')), 'amount'] ],
            where: {
                questionId: req.params.question
            },
            group: 'type'
        })
        .then((data) => {
            res.json({ status: true, data });
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

router.get('/comments/:comment/', (req, res, next) => {
    // #swagger.summary = 'Liste les types de réactions d'un commentaire'
    // #swagger.description = "Donne la liste des reactions d'un commentaire spécifique."
    /* #swagger.responses[200] = {
        schema: {
            "status": true,
            "data": [
                {
                    "reaction_id": 2,
                    "user_id": 1,
                    "question_id": null,
                    "comment_id": 1,
                    "type": 3
                }
            ]
        }
    } */

    commentModel.findOne({
        where: {
            commentId: req.params.comment
        }
    })
    .then((data) => {
        if (data == null) {
            throw new CodeError(COMMENT_NOT_IDENTIFIED);
        }

        reactionModel.findAll({
            attributes: [ 'type', [sequelize.fn('count', sequelize.col('reaction_id')), 'amount'] ],
            where: {
                commentId: req.params.comment
            },
            group: 'type'
        })
        .then((data) => {
            res.json({ status: true, data });
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

router.post('/questions/:question/', (req, res, next) => {
    // #swagger.summary = "Création d'une réaction pour une question"
    // #swagger.description = "Créé une réaction avec l'utilisateur courrant pour une question."
    // #swagger.parameters['authorization'] = { $ref: '#/components/parameters/authorization' }
    /* #swagger.requestBody = {
        required: true,
        schema: { $ref: '#/components/parameters/reaction' }
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
    const body = req.body;
    if (body == null) {
        throw new CodeError(INVALID_BODY_DATA);
    }
    const { type } = body;

    const user = req.user;

    getQuestionById(req.params.question)
    .then((question) => {

        if (question == null) {
            throw new CodeError(QUESTION_NOT_IDENTIFIED)
        }

        createQuestionReaction(parseInt(req.params.question), type, user)
        .then(({response, data}) => {
            res.json({ status: true, response, data });
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

router.post('/comments/:comment/', (req, res, next) => {
    // #swagger.summary = "Création d'une réaction pour un commentaire"
    // #swagger.description = "Créé une réaction avec l'utilisateur courrant pour un commentaire."
    // #swagger.parameters['authorization'] = { $ref: '#/components/parameters/authorization' }
    /* #swagger.requestBody = {
        required: true,
        schema: { $ref: '#/components/parameters/reaction' }
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
    const body = req.body;
    if (body == null) {
        throw new CodeError(INVALID_BODY_DATA);
    }
    const { type } = body;

    const user = req.user;

    getCommentById(req.params.comment)
    .then((comment) => {

        if (comment == null) {
            throw new CodeError(COMMENT_NOT_IDENTIFIED)
        }

        createCommentReaction(parseInt(req.params.comment), type, user)
        .then(({response, data}) => {
            res.json({ status: true, response, data });
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

router.delete('/:reaction/', (req, res, next) => {
    // #swagger.summary = 'Supprime une réaction'
    // #swagger.description = "Supprime une réaction spécifique appartenant à l'utilisateur actuellement connecté."
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

    const user = req.user;

    deleteReaction(req.params.reaction, user)
    .then(({response, data}) => {
        res.json({ status: true, response, data });
    })
    .catch(error => next(error));
});

router.delete('/questions/:question/', (req, res, next) => {
    // #swagger.summary = 'Supprime la réaction d'une question'
    // #swagger.description = "Supprime la réaction d'une question appartenant à l'utilisateur actuellement connecté."
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
    const body = req.body;
    if (body == null) {
        throw new CodeError(INVALID_BODY_DATA);
    }
    const { type } = body;

    const user = req.user;

    getReactionType(type)
    .then((reactionType) => {

        if (reactionType == null) {
            throw new CodeError(REACTION_TYPE_NOT_IDENTIFIED)
        }

        getQuestionById(req.params.question)
        .then((question) => {
    
            if (question == null) {
                throw new CodeError(QUESTION_NOT_IDENTIFIED);
            }
            
            getReactionByQuestion(req.params.question, type, user)
            .then((reaction) => {
    
                if (reaction == null) {
                    throw new CodeError(REACTION_NO_LONGER_EXISTS);
                }
    
                reactionModel.destroy({
                    where: {
                        reactionId: reaction.reactionId
                    }
                })
                .then((data) => {
                    res.json({ status: true, response: REACTION_DELETED_WITH_SUCCESS, data })
                })
                .catch(error => next(error));
            })
            .catch(error => next(error));
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

router.delete('/comments/:comment/', (req, res, next) => {
    // #swagger.summary = 'Supprime la réaction d'un commentaire'
    // #swagger.description = "Supprime la réaction d'un commentaire appartenant à l'utilisateur actuellement connecté."
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
    const body = req.body;
    if (body == null) {
        throw new CodeError(INVALID_BODY_DATA);
    }
    const { type } = body;

    const user = req.user;

    getReactionType(type)
    .then((reactionType) => {
        
        if (reactionType == null) {
            throw new CodeError(REACTION_TYPE_NOT_IDENTIFIED)
        }

        getCommentById(req.params.comment)
        .then((comment) => {

            if (comment == null) {
                throw new CodeError(COMMENT_NOT_IDENTIFIED);
            }

            getReactionByComment(req.params.comment, type, user)
            .then((reaction) => {

                if (reaction == null) {
                    throw new CodeError(REACTION_NO_LONGER_EXISTS);
                }

                reactionModel.destroy({
                    where: {
                        reactionId: reaction.reactionId
                    }
                })
                .then((data) => {
                    res.json({ status: true, response: REACTION_DELETED_WITH_SUCCESS, data })
                })
                .catch(error => next(error));
            })
            .catch(error => next(error));
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

module.exports = router;
