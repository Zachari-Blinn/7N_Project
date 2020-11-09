// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db.config.js');
require('dotenv').config({path: './src/config/config.env'});
const {server} = require('./config/console.config');

// Load database
connectDB();

// Create express app
const app = express();

// Setup CORS options
const corsOptions = {origin: "*"};

// Load CORS with options
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Function routes
// TODO

app.listen(process.env.PORT, function () {
    console.clear();
    console.log("\x1b[44m%s\x1b[0m", "Starting Server");
    console.table([server]);
});