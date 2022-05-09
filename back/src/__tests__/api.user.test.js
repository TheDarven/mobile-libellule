// Testing user endpoint here
const jwt = require("jsonwebtoken")

const app = require('../app')
const supertest = require('supertest')
const httpStatus = require("http-status")
const { USER_CREATED_WITH_SUCCESS, USER_LOGGED_WITH_SUCCESS, USER_BODY_INVALID_PASSWORD_LENGTH,
    USER_BODY_INVALID_NAME_LENGTH, USER_BODY_INVALID_NAME_FORMAT, USER_NAME_ALREADY_USE, USER_NOT_EXISTING,
    TOKEN_NOT_PRESENT, INVALID_TOKEN
} = require("../util/status-message")

const SIGNUP_ENDPOINT = '/api/users/'
const SIGNIN_ENDPOINT = '/api/users/login'
const WHOAMI_ENDPOINT = '/api/users/whoami'

const ACCOUNT_NAME = "Test"
const ACCOUNT_PASSWORD = "MyPassword"

describe('User Endpoint Test',() => {

    let token;

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
                    const body = response._body

                    expect(body.status).toBe(true)

                    expect(body.response).toBe(USER_CREATED_WITH_SUCCESS)

                    const header = response.headers

                    expect(header.authorization).toBeTruthy() // Not empty

                    const algorithm = process.env.JWT_ALGORITHM
                    const secret = process.env.JWT_SECRET_KEY
                    jwt.verify(header.authorization, secret, { algorithm }, (error, decoded) => {
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


                    const header = response.headers

                    expect(header.authorization).toBeTruthy() // Not empty

                    const algorithm = process.env.JWT_ALGORITHM
                    const secret = process.env.JWT_SECRET_KEY
                    jwt.verify(header.authorization, secret, { algorithm }, (error, decoded) => {
                        expect(error).toBeNull() // Token valid
                        expect(decoded).toBeTruthy() // Token not empty
                    })

                    token = header.authorization
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

    describe('User WhoAmI Test', () => {
        it('should test whoami', async () => {
            await supertest(app)
                .get(WHOAMI_ENDPOINT)
                .set('Authorization', token)
                .send()
                .expect(httpStatus.OK)
                .then((response) => {
                    const body = response._body

                    expect(body.status).toBe(true)

                    expect(body.data?.name).toBe(ACCOUNT_NAME)
                })
        })

        it('should test whoami without token', async () => {
            await supertest(app)
                .get(WHOAMI_ENDPOINT)
                .send()
                .expect(httpStatus.UNAUTHORIZED)
                .then((response) => {
                    const body = response._body

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(TOKEN_NOT_PRESENT)
                })
        })

        it ('should test whoami without valid token', async () => {
            await supertest(app)
                .get(WHOAMI_ENDPOINT)
                .set('Authorization', 'invalid_token')
                .send()
                .expect(httpStatus.UNAUTHORIZED)
                .then((response) => {
                    const body = response._body

                    expect(body.status).toBe(false)

                    expect(body.response).toBe(INVALID_TOKEN)
                })
        })
    })
})
