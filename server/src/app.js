// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/config.db.js');

// Setup env variable in /src/config/config.env
require('dotenv').config({path: './src/config/config.env'});

// Load database
connectDB();

// Create express app
const app = express();

// Setup CORS options
const corsOptions = {origin: "*"};

// Load CORS with options
app.use(cors(corsOptions));

// Load MORGAN with parameter
app.use(morgan('dev'));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Function routes
// TODO

function State(type, status, port, env) {
    this.type = type;
    this.status = status;
    this.port = port;
    this.env = env;
}

let server = new State("SERVER", "OK", process.env.PORT, process.env.NODE_ENV);

app.listen(process.env.PORT, function () {
    console.clear();
    console.log("\x1b[44m%s\x1b[0m", "Starting Server");
    console.table([server]);
});