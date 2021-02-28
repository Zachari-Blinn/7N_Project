// Import dependencies
const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('mongoose-morgan')
const InitiateMongoServer = require('./src/config/db.config')
require('dotenv').config({ path: './src/config/config.env' })

// Load database
InitiateMongoServer()

// Create express app
const app = express()

// Load Helmet
app.use(helmet())

// Logger
app.use(morgan({
  collection: 'log',
  connectionString: process.env.DB_URI
}, {}, 'short'
))

// Setup CORS options
const corsOptions = {
  origin: process.env.CORS_ORIGIN ?? '*'
}

// Load CORS with options
app.use(cors(corsOptions))

// Parse requests of content-type - application/json
app.use(bodyParser.json())

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/auth', require('./src/routes/auth.routes'))
app.use('/forum', require('./src/routes/forum.routes'))
app.use('/user', require('./src/routes/user.routes'))

app.listen(process.env.SERVER_PORT, () => {
  console.log('Starting server')

  function Server (port, env, cors) {
    this.port = port
    this.env = env
    this.cors = cors
  }

  const server = new Server(process.env.SERVER_PORT, process.env.NODE_ENV, process.env.CORS_ORIGIN)

  console.table(server)
})

module.exports = app
