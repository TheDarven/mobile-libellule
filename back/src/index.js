require('./util/env-loader')
require('./model/database-manager')

// Database
const app = require('./app');

// Starting server
const port = process.env.PORT;
app.listen(
    port,
    () => console.info('\x1b[32m✔ \x1b[0mServer listening on port', port)
)
