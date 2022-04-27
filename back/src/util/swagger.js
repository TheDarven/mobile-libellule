const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['src/controller/controller-manager.js']

swaggerAutogen(outputFile, endpointsFiles)
