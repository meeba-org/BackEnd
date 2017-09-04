// server.js

// set up ============================================
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');

// Connect to mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin12@ds139242.mlab.com:39242/heroku_9mpwf6zf', {useMongoClient: true});

// Init App
const app = express();

// Support webpack-dev-server
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Body Parser Middleware
// parse application/json
app.use(bodyParser.json());
app.use(expressValidator());
// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended:true
}));

// Cookie Parser Middleware
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Set Controllers
app.use('/', require('./controllers'));

//------------------------------------------------------------------//
// Set Port
app.set('port', process.env.PORT || 3000);

// Launch
app.listen(app.get('port'), () => {
	console.log('Meeba started listening on port ' + app.get('port'));
});

module.exports = app;
