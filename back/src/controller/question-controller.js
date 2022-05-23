const express = require('express')
const { INVALID_BODY_DATA, QUESTION_BODY_INVALID_CONTENT_LENGTH,
    QUESTION_BODY_INVALID_TITLE_LENGTH
} = require("../util/status-message");
const sequelize = require('sequelize');
const { CodeError } = require("../util/error-handler");
const { createQuestion, updateQuestion, deleteQuestion } = require('../service/question-service')
const questionModel = require('../model/question.js')
const userModel = require('../model/user.js')
const commentModel = require('../model/comment.js')
const reactionModel = require('../model/reaction.js');
const router = express.Router()

router.get('/', (req, res, next)  => {

    // Launch Request
    const info = questionInfo();
    questionModel.findAll(info)
    .then((data) => {
        res.json({ status: true, data });
    })
    .catch(error => next(error));
});

router.get('/:question/', (req, res, next)  => {

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
});

router.get('/users/:user/', (req, res, next)  => {

    // Launch Request
    const info = questionInfo();
    info.include[0].where = {
        userId: req.params.user
    };
    questionModel.findAll(info)
    .then((data) => {
        res.json({ status: true, data });
    })
    .catch(error => next(error));
});

router.post('/', (req, res, next) => {

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
    .then(({response}) => {
        res.json({ status: true, response })
    })
    .catch(error => next(error));
});

router.put('/:question/', (req, res, next) => {

    // Check inputs
    const body = req.body
    if (body == null) {
        throw new CodeError(INVALID_BODY_DATA)
    }
    const { content } = body
    checkContent(content)

    const user = req.user

    // Update question
    updateQuestion(content, req.params.question, user)
    .then(({response}) => {
        res.json({ status: true, response })
    })
    .catch(error => next(error));
});

router.delete('/:question/', (req, res, next) => {

    const user = req.user

    // Delete question
    deleteQuestion(req.params.question, user)
    .then(({response}) => {
        res.json({ status: true, response })
    })
    .catch(error => next(error));
});

function questionInfo()
{
    return {
        attributes: [ 'title', 'content', [sequelize.fn('count', sequelize.col('comments.comment_id')), 'comm_amount'] ],
        group: 'title',

        include: [
            {
                model: userModel,
                attributes: [ 'display_name' ],
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

                attributes: [ 'type', [sequelize.fn('count', sequelize.col('reaction_id')), 'amount'] ],
                group: 'type'
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