const express = require('express')
const { INVALID_BODY_DATA, USER_BODY_INVALID_NAME_LENGTH, USER_BODY_INVALID_PASSWORD_LENGTH,
    USER_BODY_INVALID_NAME_FORMAT
} = require("../util/status-message");
const { CodeError } = require("../util/error-handler");
const { loginUser, registerUser } = require("../service/user-service");
const router = express.Router()

router.post('/login', (req, res, next) => {
    // #swagger.summary = 'Connexion pour un utilisateur'
    // #swagger.description = 'Connexion pour un utilisateur. Retourne un token d'authentification.'

    // Check inputs
    const body = req.body
    if (body == null) {
        throw new CodeError(INVALID_BODY_DATA)
    }
    const { name, password } = body
    checkName(name)
    checkPassword(password)

    // Use service
    loginUser(name, password)
        .then(({ response, data }) => {
            res.header('Authorization', data)
            res.json({ status: true, response })
        })
        .catch(error => next(error))
});

router.post('', (req, res, next) => {
    // Check inputs
    const body = req.body
    if (body == null) {
        throw new CodeError(INVALID_BODY_DATA)
    }
    const { name, password } = body
    checkName(name)
    checkPassword(password)

    // Use service
    registerUser(name, password)
        .then(({ response, data }) => {
            res.header('Authorization', data)
            res.json({ status: true, response })
        })
        .catch(error => next(error))
})

router.get('/whoami', (req, res) => {
    const user = req.user
    res.json({ status: true, data: { name: user.name, displayName: user.displayName }})
})

function checkName(name) {
    if (!name || name.length < 3 || name.length > 120) {
        throw new CodeError(USER_BODY_INVALID_NAME_LENGTH)
    }

    const regexp = new RegExp('(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])', 'g');
    if (!regexp.test(name) || name.includes(' ')) {
        throw new CodeError(USER_BODY_INVALID_NAME_FORMAT)
    }
}

function checkPassword(password) {
    if (!password || password.length < 4 || password.length > 120) {
        throw new CodeError(USER_BODY_INVALID_PASSWORD_LENGTH)
    }
}

module.exports = router;
