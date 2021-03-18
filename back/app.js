// Import dependencies
const http = require('http')
const app = require('express')()
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const InitiateMongoServer = require('./src/config/db.config')
require('dotenv').config()

// Load database
InitiateMongoServer()

// Load Helmet
app.use(helmet())

// Setup CORS options
const corsOptions = {
  origin: '*'
}

// Load CORS with options
app.use(cors(corsOptions))

// Parse requests of content-type - application/json
app.use(bodyParser.json())

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', require('./src/routes/auth.routes'))
app.use('/api/category', require('./src/routes/category.routes'))
app.use('/api/forum', require('./src/routes/forum.routes'))
app.use('/api/party', require('./src/routes/party.routes'))
app.use('/api/reply', require('./src/routes/reply.routes'))
app.use('/api/topic', require('./src/routes/topic.routes'))
app.use('/api/user', require('./src/routes/user.routes'))

// test integration socket.io
const server = http.createServer(app)

// Socket IO
const SocketIo = require('socket.io')

const io = SocketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST']
  }
})

io.on('connection', async (socket) => {
  console.log('User connected')

  socket.on('disconnect', function () {
    console.log('User disconnected')
  })
})

server.listen(process.env.SERVER_PORT, function () {
  console.log('Starting server')

  function Server (port, env, cors) {
    this.port = port
    this.env = env
    this.cors = cors
  }

  const server = new Server(process.env.SERVER_PORT, process.env.NODE_ENV, process.env.CORS_ORIGIN)

  console.table(server)
})

module.exports = server
