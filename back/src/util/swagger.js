const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['src/app.js']

const schema = {
    components: {
        parameters: {
            authorization: {
                in: 'header',
                name: 'authorization',
                description: 'Token d\'authentification',
                required: true
            },
            user: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        required: true,
                        minLength: 3,
                        maxLength: 120,
                        example: 'myname'
                    },
                    password: {
                        type: 'string',
                        required: true,
                        minLength: 4,
                        maxLength: 120,
                        example: 'password'
                    }
                }
            }
        },
        responses: {
            400: {
                type: 'object',
                properties: {
                    response: {
                        type: 'string',
                        description: 'Description de l\'erreur'
                    },
                    status: {
                        type: 'boolean',
                        default: false
                    }
                }
            },
            401: {
                type: 'object',
                properties: {
                    response: {
                        type: 'string',
                        description: 'Description de l\'erreur'
                    },
                    status: {
                        type: 'boolean',
                        default: false
                    }
                }
            },
            404: {
                type: 'object',
                properties: {
                    response: {
                        type: 'string',
                        description: 'Description de l\'erreur'
                    },
                    status: {
                        type: 'boolean',
                        default: false
                    }
                }
            },
            emptyResponse: {
                type: 'object',
                properties: {
                    response: {
                        type: 'string',
                        description: 'Description de l\'opération réalisée'
                    },
                    status: {
                        type: 'boolean',
                        default: true
                    }
                }
            }
        },
        headers: {
            refreshToken: {
                authorization: {
                    schema: {
                        type: "string"
                    },
                    description: "Nouveau token d'authentification (si le précédent est à au moins moitié de vie)"
                }
            },
            token: {
                authorization: {
                    schema: {
                        type: "string"
                    },
                    description: "Token d'authentification"
                }
            }
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, schema)