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
            },
            question: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                        required: true,
                        minLength: 5,
                        maxLength: 255,
                        example: 'Why is the sky blue ?'
                    },
                    content: {
                        type: 'string',
                        required: true,
                        maxLength: 10000,
                        example: 'I wonder why the sky is blue and not black.'
                    }
                }
            },
            questionEdit: {
                type: 'object',
                properties: {
                    content: {
                        type: 'string',
                        required: true,
                        maxLength: 10000,
                        example: 'I wonder why the sky is blue and not black.'
                    }
                }
            },
            comment: {
                type: 'object',
                properties: {
                    content: {
                        type: 'string',
                        required: true,
                        maxLength: 10000,
                        example: 'The sky was never blue, it IS black'
                    }
                }
            },
            reaction: {
                type: 'object',
                properties: {
                    type: {
                        type: 'integer',
                        required: true
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
