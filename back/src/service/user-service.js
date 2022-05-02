const userModel = require('../model/user')
const { USER_NOT_EXISTING, USER_LOGGED_WITH_SUCCESS, USER_NAME_ALREADY_USE, USER_CREATED_WITH_SUCCESS } = require("../util/status-message");
const { CodeError } = require("../util/error-handler");
const httpStatus = require("http-status");
const jws = require("jws");
const bcrypt = require("bcrypt");

async function loginUser(name, password) {
    // Verify identification
    const user = await userModel.findOne({
       where: { name }
    })
    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new CodeError(USER_NOT_EXISTING, httpStatus.NOT_FOUND)
    }

    // Build jws token
    const algorithm = process.env.JWS_ALGORITHM
    const secret = process.env.JWS_SECRET_KEY
    const signature = jws.sign({
        header: { alg: algorithm },
        payload: user.name,
        secret
    })

    return {
        response: USER_LOGGED_WITH_SUCCESS,
        data: signature
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
        const user = await userModel.create({ name, password })

        // Build jws token
        const algorithm = process.env.JWS_ALGORITHM
        const secret = process.env.JWS_SECRET_KEY
        const signature = jws.sign({
            header: { alg: algorithm },
            payload: user.name,
            secret
        })

        return {
            response: USER_CREATED_WITH_SUCCESS,
            data: signature
        }
    } catch (err) {
        console.log(err)
    }
}


module.exports = { loginUser, registerUser }
