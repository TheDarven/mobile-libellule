const dotenv = require('dotenv')
dotenv.config()
const app = require('./app');

const port = process.env.PORT;

app.listen(
    port,
    () => console.info('Server listening on port ', port)
)
