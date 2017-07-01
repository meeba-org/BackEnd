// server.js

// set up ============================================
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');

// Connect to mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/meebadb');
const db = mongoose.connection;

// Routes
const routes = require('./routes/index');
const users = require('./routes/users');
const groups = require('./routes/groups');
const operations = require('./routes/operations');

// Init App
const app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Cookie Parser Middleware
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport Init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use((req,res,next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.get('/', (req, res) => {
  res.redirect('/api/v1/');
});

app.use('/api/v1/', routes);
app.use('/api/v1/users', users);
app.use('/api/v1/groups', groups);
app.use('/api/v1/operations', operations);


//------------------------------------------------------------------//
// Set Port
app.set('port', process.env.PORT || 3000);

// Launch
app.listen(app.get('port'), () => {
	console.log('Meeba started listening on port ' + app.get('port'));
});

module.exports = app;
