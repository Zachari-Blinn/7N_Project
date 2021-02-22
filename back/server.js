// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('mongoose-morgan');
const InitiateMongoServer = require('./src/config/db.config');
require('dotenv').config({ path: './src/config/config.env' });

// Load database
InitiateMongoServer();

// Create express app
const app = express();

// Logger
app.use(morgan({
  collection: 'log',
  connectionString: process.env.DB_URI
  }, {}, 'short'
));

// Setup CORS options
const corsOptions = { origin: '*' };

// Load CORS with options
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Function routes
app.use('/auth', require('./src/routes/auth.routes'));
app.use('/forum', require('./src/routes/forum.routes'));
app.use('/user', require('./src/routes/user.routes'));

app.listen(process.env.SERVER_PORT, () => {
  console.clear();
  console.log('Starting ' + process.env.NODE_ENV + ' server' + ' on ' + process.env.SERVER_PORT + ' port');
});

module.exports = app;