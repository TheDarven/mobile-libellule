const httpStatus = require("http-status");
const { DEFAULT_ERROR, INVALID_BODY_DATA } = require("./status-message");

class CodeError extends Error {
    constructor (message, code = httpStatus.BAD_REQUEST) {
        super(message)
        this.code = code
    }
}

const errorHandler = () => (err, req, res, next) => {
    if (!err) {
        next()
        return
    }

    let errorMessage = null;
    let errorCode = httpStatus.BAD_REQUEST

    try {
        errorMessage = err.message;
    } catch (error) { }

    try {
        errorCode = err.code
    } catch (error) { }

    if (err.code === httpStatus.BAD_REQUEST && errorMessage == null) {
        errorMessage = INVALID_BODY_DATA
    }

    errorMessage = errorMessage ?? DEFAULT_ERROR

    res.status(errorCode)
        .json({ status: false, response: errorMessage })
}

module.exports = { errorHandler, CodeError };
