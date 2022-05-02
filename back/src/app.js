const express = require("express");
const controllerManager = require("./controller/controller-manager");
const app = express()
const status = require('http-status');

// Configure Express App Instance
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// This middleware adds the json header to every response
app.use('*', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
})

// Init endpoints
app.use('/api/', controllerManager)

// Swagger Documentation
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Catch errors
const { errorHandler } = require("./util/error-handler");
app.use(errorHandler())

// Handle invalid endpoints
app.use('*', (req, res) => {
    res
        .status(status.NOT_FOUND)
        .json({ status: false, message: 'Endpoint Not Found' })
})

module.exports = app;
