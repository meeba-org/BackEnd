// server.js

// set up ============================================
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const config = require('./config');
const enforce = require("express-sslify");
const mongooseManager = require("./managers/MongooseManager");
const compression = require('compression');

// Connect to mongoose
mongooseManager.connect(config.dbUri);
// Init App
const app = express();

// Compress all responses
app.use(compression());

// redirect http requests to https
if (process.env.NODE_ENV === 'production')
    app.use(enforce.HTTPS({ trustProtoHeader: true }));

// Support CORS for development env
if (process.env.NODE_ENV === 'development')
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        next();
    });

// Body Parser Middleware
// parse application/json
app.use(bodyParser.json());
app.use(expressValidator());

// Cookie Parser Middleware
app.use(cookieParser());

// Set Static Folder
app.use(express.static('public/*.html'));
app.use(express.static('public/styles/images'));
app.use(express.static('public/styles/docs'));
app.use(express.static('dist'));

// Set Controllers
app.use('/', require('./controllers'));

//------------------------------------------------------------------//
// Set Port
app.set('port', process.env.PORT || 4000);

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

// Launch
app.listen(app.get('port'), () => {
	console.log('Meeba started listening on port ' + app.get('port'));
});

module.exports = app;
