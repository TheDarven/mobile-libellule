const express = require('express')
const { INVALID_BODY_DATA,
    QUESTION_NOT_IDENTIFIED,
    USER_NOT_IDENTIFIED,
    COMMENT_BODY_INVALID_CONTENT_LENGTH,
    COMMENT_NOT_IDENTIFIED
} = require("../util/status-message");
const sequelize = require('sequelize');
const { CodeError } = require("../util/error-handler");
const { getQuestionById } = require('../service/question-service')
const { createComment, updateComment, deleteComment, getCommentById } = require('../service/comment-service')
const { getUserById } = require('../service/user-service')
const { alertQuestionFollowers } = require('../service/follow-question-service');
const { alertUserFollowersComment } = require('../service/follow-user-service');
const userModel = require('../model/user.js')
const commentModel = require('../model/comment.js')
const reactionModel = require('../model/reaction.js');
const router = express.Router()

router.get('/:comment/', (req, res, next)  => {
    // #swagger.summary = 'Commentaire spécifique'
    // #swagger.description = "Donne le commentaire spécifique à l'ID donné."
    /* #swagger.responses[200] = {
        schema: {
            "status": true,
            "data": {
                "id": 1,
                "content": "Grass is green ? Thought it was brown.",
                "creation_date": "2022-05-27T11:54:00.000Z",
                "edition_date": "2022-05-27T11:54:00.000Z",
                "User": {
                    "display_name": "DefaultDisplay",
                    "user_id": 1
                },
                "Reactions": []
            }
        }
    } */

    // Check Comment
    getCommentById(req.params.comment, commentInfo())
    .then((comment) => {

        if (comment == null) {
            throw new CodeError(COMMENT_NOT_IDENTIFIED);
        }

        res.json({ status: true, data: comment });
    })
    .catch(error => next(error));
});

router.get('/questions/:question/', (req, res, next)  => {
    // #swagger.summary = 'Liste les commentaires d'une question'
    // #swagger.description = "Liste de tout les commentaires d'une question dont l'ID est spécifié."
    /* #swagger.responses[200] = {
        schema: {
            "status": true,
            "data": [
                {
                    "id": 1,
                    "content": "Grass is green ? Thought it was brown.",
                    "creation_date": "2022-05-27T11:54:00.000Z",
                    "edition_date": "2022-05-27T11:54:00.000Z",
                    "User": {
                        "display_name": "DefaultDisplay",
                        "user_id": 1
                    },
                    "Reactions": []
                },
                {
                    "id": 2,
                    "content": "Brown ? Are you crazy, it's yellow !",
                    "creation_date": "2022-05-27T11:54:54.000Z",
                    "edition_date": "2022-05-27T11:54:54.000Z",
                    "User": {
                        "display_name": "DefaultDisplay",
                        "user_id": 1
                    },
                    "Reactions": []
                },
                {
                    "id": 3,
                    "content": "What are you saying ? It's red for me",
                    "creation_date": "2022-05-27T11:55:23.000Z",
                    "edition_date": "2022-05-27T11:55:23.000Z",
                    "User": {
                        "display_name": "DefaultDisplay",
                        "user_id": 1
                    },
                    "Reactions": []
                }
            ]
        }
    } */

    // Check Question
    getQuestionById(req.params.question)
    .then((question) => {

        if (question == null) {
            throw new CodeError(QUESTION_NOT_IDENTIFIED);
        }

        // Launch Request
        const info = commentInfo();
        info.where = {
            questionId: req.params.question
        };
        commentModel.findAll(info)
        .then((data) => {
            res.json({ status: true, data });
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

router.get('/users/:user/', (req, res, next)  => {
    // #swagger.summary = 'Liste les commentaires d'un utilisateur'
    // #swagger.description = "Liste de tout les commentaires d'un utilisateur dont l'ID est spécifié."
    /* #swagger.responses[200] = {
        schema: {
            "status": true,
            "data": [
                {
                    "id": 1,
                    "content": "Grass is green ? Thought it was brown.",
                    "creation_date": "2022-05-27T11:54:00.000Z",
                    "edition_date": "2022-05-27T11:54:00.000Z",
                    "User": {
                        "display_name": "DefaultDisplay",
                        "user_id": 1
                    },
                    "Reactions": []
                },
                {
                    "id": 2,
                    "content": "Brown ? Are you crazy, it's yellow !",
                    "creation_date": "2022-05-27T11:54:54.000Z",
                    "edition_date": "2022-05-27T11:54:54.000Z",
                    "User": {
                        "display_name": "DefaultDisplay",
                        "user_id": 1
                    },
                    "Reactions": []
                },
                {
                    "id": 3,
                    "content": "What are you saying ? It's red for me",
                    "creation_date": "2022-05-27T11:55:23.000Z",
                    "edition_date": "2022-05-27T11:55:23.000Z",
                    "User": {
                        "display_name": "DefaultDisplay",
                        "user_id": 1
                    },
                    "Reactions": []
                },
                {
                    "id": 4,
                    "content": "What are you on about ?",
                    "creation_date": "2022-05-27T12:30:59.000Z",
                    "edition_date": "2022-05-27T12:30:59.000Z",
                    "User": {
                        "display_name": "DefaultDisplay",
                        "user_id": 1
                    },
                    "Reactions": []
                }
            ]
        }
    } */

    // Check User
    getUserById(req.params.user)
    .then((user) => {

        if (user == null) {
            throw new CodeError(USER_NOT_IDENTIFIED);
        }

        // Launch Request
        const info = commentInfo();
        info.where = {
            authorId: req.params.user
        };
        commentModel.findAll(info)
        .then((data) => {
            res.json({ status: true, data });
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

router.post('/questions/:question/', (req, res, next) => {
    // #swagger.summary = "Création d'un commentaire pour une question"
    // #swagger.description = "Créé un commentaire avec l'utilisateur actuellement connecté pour la question spécifiée."
    // #swagger.parameters['authorization'] = { $ref: '#/components/parameters/authorization' }
    /* #swagger.requestBody = {
        required: true,
        schema: { $ref: '#/components/parameters/comment' }
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
    const { content } = body
    checkContent(content)

    const user = req.user

    // Check Question
    getQuestionById(req.params.question)
    .then((questionResponse) => {

        if (questionResponse == null) {
            throw new CodeError(QUESTION_NOT_IDENTIFIED);
        }

        // Create comment
        createComment(content, req.params.question, user)
        .then(({response, data}) => {

            getCommentById(data, commentInfo())
            .then((comment) => {
                res.json({ status: true, response, data: comment })
                alertQuestionFollowers({ questionId: req.params.question }).catch((error => next(error)));
                alertUserFollowersComment({ targetId: user.id });
            })
            .catch(error => next(error));

        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

router.put('/:comment/', (req, res, next) => {
    // #swagger.summary = 'Modifie un commentaire'
    // #swagger.description = "Modifie un commentaire spécifique appartenant à l'utilisateur actuellement connecté."
    // #swagger.parameters['authorization'] = { $ref: '#/components/parameters/authorization' }
    /* #swagger.requestBody = {
        required: true,
        schema: { $ref: '#/components/parameters/comment' }
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
    const { content } = body
    checkContent(content)

    const user = req.user

    // Check Comment
    getCommentById(req.params.comment)
    .then((data) => {

        if (data == null) {
            throw new CodeError(COMMENT_NOT_IDENTIFIED);
        }

        // Update comment
        updateComment(content, req.params.comment, user)
        .then(({response}) => {
            res.json({ status: true, response })
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

router.delete('/:comment/', (req, res, next) => {
    // #swagger.summary = 'Supprime un commentaire'
    // #swagger.description = "Supprime un commentaire spécifique appartenant à l'utilisateur actuellement connecté."
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

    const user = req.user

    // Check Comment
    getCommentById(req.params.comment)
    .then((data) => {

        if (data == null) {
            throw new CodeError(COMMENT_NOT_IDENTIFIED);
        }

        // Delete question
        deleteComment(req.params.comment, user)
        .then(({response}) => {
            res.json({ status: true, response })
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

function commentInfo()
{
    return {
        attributes: [
            ['comment_id', 'id'],
            'content',
            'creation_date',
            'edition_date'
        ],
        group: [ 'id' ],
        order: [ [ 'creation_date', 'ASC' ] ],

        include: [
            {
                model: userModel,
                attributes: [ 'display_name', 'user_id' ],
                required: true
            },
            {
                model: reactionModel,
                required: false,

                attributes: [ 'type', [sequelize.fn('count', sequelize.col('reaction_id')), 'amount'] ],
                group: 'type'
            }
        ]
    };
}

function checkContent(content)
{
    if (!content || content.length > 10000) {
        throw new CodeError(COMMENT_BODY_INVALID_CONTENT_LENGTH)
    }
}

module.exports = router;
