const express = require('express')
const router = express.Router()
const { TOKEN_NOT_PRESENT, INVALID_TOKEN, INVALID_TOKEN_USER } = require("../util/status-message");
const { CodeError } = require("../util/error-handler");
const httpStatus = require("http-status");
const userController = require('./user-controller');
const questionController = require('./question-controller');
const commentController = require('./comment-controller');
const reactionController = require('./reaction-controller');
const jwt = require("jsonwebtoken");
const { getUserById, createJwtToken } = require("../service/user-service");

const EXCLUDED_TOKEN_ENDPOINTS = [
    { path: '/api/users/', method: 'POST' },
    { path: '/api/users/login', method: 'POST' },
    { path: '/api/questions', method: 'GET' },
    { path: '/api/questions/*', method: 'GET' },
    { path: '/api/questions/users/*', method: 'GET' },
    { path: '/api/comments/*', method: 'GET' },
    { path: '/api/comments/questions/*', method: 'GET' },
    { path: '/api/comments/users/*', method: 'GET' },
    { path: '/api/reactions/types', method: 'GET' },
    { path: '/api/reactions/questions/*', method: 'GET' },
    { path: '/api/reactions/comments/*', method: 'GET' },
];

// Token middleware
router.use('/', async (req, res, next) => {
    // Bypass excluded endpoints
    const isExcludedPath = EXCLUDED_TOKEN_ENDPOINTS
        .find(excludedPath => req.originalUrl.match(excludedPath.path) && excludedPath.method === req.method) != null

    if (isExcludedPath) {
        return next()
    }

    // Verify if token is present
    const token = req.headers?.authorization
    if (!token) {
        return next(new CodeError(TOKEN_NOT_PRESENT, httpStatus.UNAUTHORIZED))
    }

    // Verify token
    let decoded;
    try {
        const secret = process.env.JWT_SECRET_KEY
        const algorithm = process.env.JWT_ALGORITHM
        decoded = jwt.verify(token, secret, { algorithm })
    } catch (err) {
        return next(new CodeError(INVALID_TOKEN, httpStatus.UNAUTHORIZED))
    }

    const loggedUser = await getUserById(decoded?.data?.userId);
    if (loggedUser == null) {
        return next(new CodeError(INVALID_TOKEN_USER, httpStatus.UNAUTHORIZED))
    }
    req.user = loggedUser

    // Refresh token on half expires time
    const exp = decoded.exp
    const currentTimestamp = Math.round(new Date() / 1000)
    const jwtExpiresIn = Math.round(process.env.JWT_EXPIRES_IN / 1000)
    if (currentTimestamp + (jwtExpiresIn / 2) > exp) {
        res.header('Authorization', createJwtToken(loggedUser))
    }

    return next();
})

router.use('/users', userController
    // #swagger.tags = ['Users']
    /* #swagger.responses[401] = {
        schema: { $ref: '#/components/responses/401' }
    } */
    /* #swagger.responses[200] = {
        headers: { $ref: '#/components/headers/refreshToken' }
    } */
);

router.use('/questions', questionController
    // #swagger.tags = ['Questions']
    /* #swagger.responses[401] = {
        schema: { $ref: '#/components/responses/401' }
    } */
    /* #swagger.responses[200] = {
        headers: { $ref: '#/components/headers/refreshToken' }
    } */
);

router.use('/comments', commentController
    // #swagger.tags = ['Comments']
    /* #swagger.responses[401] = {
        schema: { $ref: '#/components/responses/401' }
    } */
    /* #swagger.responses[200] = {
        headers: { $ref: '#/components/headers/refreshToken' }
    } */
);

router.use('/reactions', reactionController
    // #swagger.tags = ['Reactions']
    /* #swagger.responses[401] = {
        schema: { $ref: '#/components/responses/401' }
    } */
    /* #swagger.responses[200] = {
        headers: { $ref: '#/components/headers/refreshToken' }
    } */
);

module.exports = router
