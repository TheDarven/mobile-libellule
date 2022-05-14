const dotenv = require('dotenv')
const env = process.env.NODE_ENV?.trim() ?? 'development'
dotenv.config({ path: `.env.${env}` })

module.exports = dotenv
