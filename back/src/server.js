// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
// eslint-disable-next-line no-unused-vars
// const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db.config.js');
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
app.use('/auth', require('./routes/auth.routes'));
app.use('/user', require('./routes/user.routes'));

app.listen(process.env.PORT, () => {
  console.clear();
  console.log('\x1b[44m%s\x1b[0m', 'Starting Server');
});
