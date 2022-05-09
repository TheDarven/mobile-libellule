const express = require('express')
const router = express.Router()
const { TOKEN_NOT_PRESENT, INVALID_TOKEN } = require("../util/status-message");
const { CodeError } = require("../util/error-handler");
const httpStatus = require("http-status");
const userController = require('./user-controller');
const jwt = require("jsonwebtoken");
const { getUserById, createJwtToken } = require("../service/user-service");

const EXCLUDED_TOKEN_ENDPOINTS = [
    { path: '/api/users', method: 'POST' },
    { path: '/api/users/login', method: 'POST' }
];

// Token middleware
router.use('*', async (req, res, next) => {
    // Bypass excluded endpoints
    const isExcludedPath = EXCLUDED_TOKEN_ENDPOINTS
        .find(excludedPath => excludedPath.path === req.originalUrl && excludedPath.method === req.method) != null

    if (isExcludedPath) {
        return next()
    }

    // Verify if token is present
    let token = req.headers?.authorization
    if (!token || !token.startsWith('Bearer ')) {
        return next(new CodeError(TOKEN_NOT_PRESENT, httpStatus.UNAUTHORIZED))
    }
    token = token.replace('Bearer ', '')

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
        return next(new CodeError(INVALID_TOKEN, httpStatus.UNAUTHORIZED))
    }
    req.user = loggedUser

    // Refresh token on half expires time
    const exp = decoded.exp
    const currentTimestamp = Math.round(new Date() / 1000)
    const jwtExpiresIn = Math.round(process.env.JWT_EXPIRES_IN / 1000)
    if (currentTimestamp + (jwtExpiresIn / 2) > exp) {
        res.header('Authorization', `Bearer ${createJwtToken(loggedUser)}`)
    }

    return next();
})

router.use('/users', userController);

module.exports = router
