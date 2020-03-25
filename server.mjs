// server.js

// set up ============================================
import cookieParser from "cookie-parser";
import express from "express";
import bodyParser from "body-parser";
import expressValidator from "express-validator";
import mongoose from "mongoose";
import config from "./config";
import enforce from "express-sslify";
import compression from "compression";

// Connect to mongoose
mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl, {useNewUrlParser: true }, () => {
    console.log("Connected to DB successfully");
});

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
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
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
