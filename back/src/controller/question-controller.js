const express = require('express')
const { INVALID_BODY_DATA, QUESTION_BODY_INVALID_CONTENT_LENGTH,
    QUESTION_BODY_INVALID_TITLE_LENGTH,
    QUESTION_NOT_IDENTIFIED,
    USER_NOT_IDENTIFIED
} = require("../util/status-message");
const sequelize = require('sequelize');
const { CodeError } = require("../util/error-handler");
const { createQuestion, updateQuestion, deleteQuestion, getQuestionById } = require('../service/question-service')
const { getUserById } = require('../service/user-service')
const { alertUserFollowersQuestion } = require('../service/follow-user-service');
const questionModel = require('../model/question.js')
const userModel = require('../model/user.js')
const commentModel = require('../model/comment.js')
const reactionModel = require('../model/reaction.js');
const router = express.Router()

router.get('/', (req, res, next)  => {
    // #swagger.summary = 'Liste les questions'
    // #swagger.description = "Liste de toutes les questions sur la base de données pour tout les utilisateurs."
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
                    "User": {
                        "display_name": "Blue Ladybug"
                    },
                    "Reactions": [
                        {
                            "type": 1,
                            "amount": 1
                        }
                    ]
                },
                {
                    "id": 2,
                    "title": "Where is Santa Claus born ?",
                    "content": "Antartica is my best guess.",
                    "comm_amount": 0,
                    "creation_date": "2022-05-24T23:34:13.000Z",
                    "edition_date": "2022-05-24T23:34:13.000Z",
                    "User": {
                        "display_name": "Red Firefly"
                    },
                    "Reactions": []
                },
                {
                    "id": 3,
                    "title": "Why is the sky blue ?",
                    "content": "I do not know why the sky is blue when the grass is green.",
                    "comm_amount": 0,
                    "creation_date": "2022-05-24T23:34:13.000Z",
                    "edition_date": "2022-05-24T23:34:13.000Z",
                    "User": {
                        "display_name": "Blue Ladybug"
                    },
                    "Reactions": []
                }
            ]
        }
    } */

    // Launch Request
    const info = questionInfo();
    questionModel.findAll(info)
    .then((data) => {
        res.json({ status: true, data });
    })
    .catch(error => next(error));
});

router.get('/:question/', (req, res, next)  => {
    // #swagger.summary = 'Question spécificque'
    // #swagger.description = "Obtient la question spécifique à l'ID envoyé en paramètre."
    /* #swagger.responses[200] = {
        schema: {
            "status": true,
            "data": {
                "id": 1,
                "title": "What is the average length ?",
                "content": "I wanna know what is the average length of things.",
                "comm_amount": 0,
                "creation_date": "2022-05-24T23:34:13.000Z",
                "edition_date": "2022-05-24T23:34:13.000Z",
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
        }
    } */

    // Check Question
    getQuestionById(req.params.question)
    .then((question) => {

        if (question == null) {
            throw new CodeError(QUESTION_NOT_IDENTIFIED);
        }

        // Launch Request
        const info = questionInfo();
        info.where = {
            questionId: req.params.question
        };
        questionModel.findOne(info)
        .then((data) => {
            res.json({ status: true, data });
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

router.get('/users/:user', (req, res, next)  => {
    // #swagger.summary = "Liste les questions d'un utilisateur"
    // #swagger.description = "Liste de toutes les questions sur la base de données pour un utilisateur spécifique."
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
                    "User": {
                        "display_name": "Blue Ladybug"
                    },
                    "Reactions": [
                        {
                            "type": 1,
                            "amount": 1
                        }
                    ]
                },
                {
                    "id": 3,
                    "title": "Why is the sky blue ?",
                    "content": "I do not know why the sky is blue when the grass is green.",
                    "comm_amount": 0,
                    "creation_date": "2022-05-24T23:34:13.000Z",
                    "edition_date": "2022-05-24T23:34:13.000Z",
                    "User": {
                        "display_name": "Blue Ladybug"
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
        const info = questionInfo();
        info.where = {
            authorId: req.params.user
        };
        questionModel.findAll(info)
        .then((data) => {
            res.json({ status: true, data });
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

router.post('/', (req, res, next) => {
    // #swagger.summary = "Création d'une question"
    // #swagger.description = "Créé une question pour l'utilisateur actuellement connecté."
    // #swagger.parameters['authorization'] = { $ref: '#/components/parameters/authorization' }
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
    const { content, title } = body
    checkContent(content)
    checkTitle(title)

    const user = req.user

    // Create question
    createQuestion(content, title, user)
    .then(({response, data}) => {
        res.json({ status: true, response, data })
        alertUserFollowersQuestion({ targetId: user.userId });
    })
    .catch(error => next(error));
});

router.put('/:question/', (req, res, next) => {
    // #swagger.summary = 'Modifie une question'
    // #swagger.description = "Modifie une question spécifique appartenant à l'utilisateur actuellement connecté."
    // #swagger.parameters['authorization'] = { $ref: '#/components/parameters/authorization' }
    /* #swagger.requestBody = {
        required: true,
        schema: { $ref: '#/components/parameters/questionEdit' }
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
    .then((data) => {

        if (data == null) {
            throw new CodeError(QUESTION_NOT_IDENTIFIED);
        }

        // Update question
        updateQuestion(content, req.params.question, user)
        .then(({response}) => {
            res.json({ status: true, response })
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

router.delete('/:question/', (req, res, next) => {
    // #swagger.summary = 'Supprime une question'
    // #swagger.description = "Supprime une question spécifique appartenant à l'utilisateur actuellement connecté."
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

    // Check Question
    getQuestionById(req.params.question)
    .then((data) => {

        if (data == null) {
            throw new CodeError(QUESTION_NOT_IDENTIFIED);
        }

        // Delete question
        deleteQuestion(req.params.question, user)
        .then(({response}) => {
            res.json({ status: true, response })
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

function questionInfo()
{
    return {
        attributes: [
            ['question_id', 'id'],
            'title',
            'content',
            [sequelize.fn('count', sequelize.col('Comments.comment_id')), 'comm_amount'],
            'creation_date',
            'edition_date'
        ],
        group: [ 'id' ],
        order: [ [ 'creation_date', 'DESC' ] ],

        include: [
            {
                model: userModel,
                attributes: [ 'display_name', 'user_id' ],
                required: true
            },
            {
                model: commentModel,
                required: false,

                attributes: []
            },
            {
                model: reactionModel,
                required: false,

                attributes: []

                // attributes: [ 'type', [sequelize.fn('count', sequelize.col('reaction_id')), 'amount'] ],
                //group: 'type'
            }
        ]
    };
}

function checkContent(content)
{
    if (!content || content.length > 10000) {
        throw new CodeError(QUESTION_BODY_INVALID_CONTENT_LENGTH)
    }
}

function checkTitle(title)
{
    if (!title || title.length < 5 || title.length > 255) {
        throw new CodeError(QUESTION_BODY_INVALID_TITLE_LENGTH)
    }
}

module.exports = router;
