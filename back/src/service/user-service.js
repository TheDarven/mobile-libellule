const userModel = require('../model/user')
const { USER_NOT_EXISTING, USER_LOGGED_WITH_SUCCESS, USER_NAME_ALREADY_USE, USER_CREATED_WITH_SUCCESS,
    USER_CREATION_FAILED
} = require("../util/status-message");
const { CodeError } = require("../util/error-handler");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function loginUser(name, password) {
    // Verify identification
    const user = await userModel.findOne({
       where: { name }
    })
    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new CodeError(USER_NOT_EXISTING, httpStatus.NOT_FOUND)
    }

    return {
        response: USER_LOGGED_WITH_SUCCESS,
        data: createJwtToken(user)
    }
}

async function registerUser(name, password) {
    // Verify if name already use
    const userWithSameName = await userModel.findOne({
        where: { name }
    })
    if (userWithSameName != null) {
        throw new CodeError(USER_NAME_ALREADY_USE, httpStatus.NOT_FOUND)
    }

    // Create user
    try {
        const user = await userModel.create({ name, password, displayName: 'DefaultDisplay' })

        return {
            response: USER_CREATED_WITH_SUCCESS,
            data: createJwtToken(user)
        }
    } catch (err) {
        throw new CodeError(USER_CREATION_FAILED, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

function createJwtToken(user) {
    // Build jwt token
    const secret = process.env.JWT_SECRET_KEY
    const algorithm = process.env.JWT_ALGORITHM
    const expiresIn = process.env.JWT_EXPIRES_IN
    return jwt.sign({ data: user.name }, secret, { expiresIn, algorithm });
}


module.exports = { loginUser, registerUser }
