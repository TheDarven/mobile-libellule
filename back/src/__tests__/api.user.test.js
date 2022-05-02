// Testing user endpoint here
const jwt = require("jsonwebtoken")

const app = require('../app')
const userModel = require('../model/user')
const supertest = require('supertest')
const httpStatus = require("http-status")
const { USER_CREATED_WITH_SUCCESS, USER_LOGGED_WITH_SUCCESS, USER_BODY_INVALID_PASSWORD_LENGTH,
    USER_BODY_INVALID_NAME_LENGTH, USER_BODY_INVALID_NAME_FORMAT, USER_NAME_ALREADY_USE, USER_NOT_EXISTING
} = require("../util/status-message")

const SIGNUP_ENDPOINT = '/api/users/'
const SIGNIN_ENDPOINT = '/api/users/login'

const ACCOUNT_NAME = "Test"
const ACCOUNT_PASSWORD = "MyPassword"

describe('User Endpoint Test',() => {

    afterAll(async () => {
        return await emptyDatabase()
    })

    beforeAll(async () => {
        return await emptyDatabase()
    })

    describe('User SignUp Test', () => {
        it('should test signup', async () => {
            await supertest(app)
                .post(SIGNUP_ENDPOINT)
                .send({
                    name: ACCOUNT_NAME,
                    password: ACCOUNT_PASSWORD
                })
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true)

                    expect(body.response).toBe(USER_CREATED_WITH_SUCCESS)

                    expect(body.data).toBeTruthy() // Not empty

                    const algorithm = process.env.JWT_ALGORITHM
                    const secret = process.env.JWT_SECRET_KEY
                    jwt.verify(body.data, secret, { algorithm }, (error, decoded) => {
                        expect(error).toBeNull() // Token valid
                        expect(decoded).toBeTruthy() // Token not empty
                    })
                })
        })

        it('should test signup name too long', async () => {
            await supertest(app)
                .post(SIGNUP_ENDPOINT)
                .send({
                    name: 'a'.repeat(121),
                    password: ACCOUNT_PASSWORD
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(USER_BODY_INVALID_NAME_LENGTH)
                })
        })

        it('should test signup name too short', async () => {
            await supertest(app)
                .post(SIGNUP_ENDPOINT)
                .send({
                    name: 'aa',
                    password: ACCOUNT_PASSWORD
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(USER_BODY_INVALID_NAME_LENGTH)
                })
        })

        it('should test signup name invalid format', async () => {
            await supertest(app)
                .post(SIGNUP_ENDPOINT)
                .send({
                    name: 'Name with space',
                    password: ACCOUNT_PASSWORD
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(USER_BODY_INVALID_NAME_FORMAT)
                })
        })

        it('should test signup password too long', async () => {
            await supertest(app)
                .post(SIGNUP_ENDPOINT)
                .send({
                    name: ACCOUNT_NAME,
                    password: 'a'.repeat(121),
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(USER_BODY_INVALID_PASSWORD_LENGTH)
                })
        })

        it('should test signup password too short', async () => {
            await supertest(app)
                .post(SIGNUP_ENDPOINT)
                .send({
                    name: ACCOUNT_NAME,
                    password: 'a'.repeat(3),
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(USER_BODY_INVALID_PASSWORD_LENGTH)
                })
        })

        it('should test signup name already use', async () => {
            await supertest(app)
                .post(SIGNUP_ENDPOINT)
                .send({
                    name: ACCOUNT_NAME,
                    password: ACCOUNT_PASSWORD
                })
                .expect(httpStatus.NOT_FOUND)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(USER_NAME_ALREADY_USE)
                })
        })
    })

    describe('User SignIn Test', () => {
        it('should test signin', async () => {
            await supertest(app)
                .post(SIGNIN_ENDPOINT)
                .send({
                    name: ACCOUNT_NAME,
                    password: ACCOUNT_PASSWORD
                })
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(true)

                    expect(body.response).toBe(USER_LOGGED_WITH_SUCCESS)

                    expect(body.data).toBeTruthy() // Not empty

                    const algorithm = process.env.JWT_ALGORITHM
                    const secret = process.env.JWT_SECRET_KEY
                    jwt.verify(body.data, secret, { algorithm }, (error, decoded) => {
                        expect(error).toBeNull() // Token valid
                        expect(decoded).toBeTruthy() // Token not empty
                    })
                })
        })

        it('should test signin name not exist', async () => {
            await supertest(app)
                .post(SIGNIN_ENDPOINT)
                .send({
                    name: `${ACCOUNT_NAME}a`,
                    password: ACCOUNT_PASSWORD
                })
                .expect(httpStatus.NOT_FOUND)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(USER_NOT_EXISTING)
                })
        })

        it('should test signin invalid password', async () => {
            await supertest(app)
                .post(SIGNIN_ENDPOINT)
                .send({
                    name: ACCOUNT_NAME,
                    password: `${ACCOUNT_PASSWORD}a`
                })
                .expect(httpStatus.NOT_FOUND)
                .then((response) => {
                    const body = response._body;

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(USER_NOT_EXISTING)
                })
        })
    })
})

async function emptyDatabase() {
    return await userModel.destroy({
        where: {},
        truncate: true
    })
}
