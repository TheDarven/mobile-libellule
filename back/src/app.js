const express = require("express");
const controllerManager = require("./controller/controller-manager");
const app = express()
const status = require('http-status');

// Init endpoints
app.use('/api/', controllerManager)

// This middleware adds the json header to every response
app.use('/api/*', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
})

// Swagger Documentation
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Handle not valid route
app.use('*', (req, res) => {
    res
        .status(status.NOT_FOUND)
        .json({ status: false, message: 'Endpoint Not Found' })
})

module.exports = app;
