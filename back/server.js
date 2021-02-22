// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./src/config/db.config');
const mongoose = require('mongoose');
require('dotenv').config({ path: './src/config/config.env' });

// Load database
connectDB();

// Create express app
const app = express();

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

var environment = process.env.NODE_ENV;

app.listen(process.env.PORT, () => {
  console.clear();
  console.log('\x1b[44m%s\x1b[0m', 'Starting Server', environment);
});

module.exports = app;