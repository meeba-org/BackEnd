const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// Login
router.get('/login', (req, res) => {
  res.render('login');
});

// Register User
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const uid = req.body.uid;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  // Validation
  req.checkBody('uid', 'id is required').notEmpty();
  req.checkBody('first_name', 'First name is required').notEmpty();
  req.checkBody('last_name', 'Last name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors){
    res.render('register',{
      errors: errors
    });
  }
  else{
    // Passed
    const newUser = new User({
      uid: uid,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
    });

    User.createUser(newUser, (err, user) => {
      if (err) throw err;
      //console.log(user);
    });

    req.flash('success_msg', 'User is registered and can now login');

    res.redirect('/api/v1');
  }
});

// Define Auth Strategy
passport.use(new LocalStrategy({
    usernameField: 'uid',
    passwordField: 'password'
  },
  (uid, password, done) => {
    User.getUserByUid(uid, (err, user) => {
      if (err) throw err;
      if (!user){
        return done(null, false, {message: 'Unknown User'});
      }

      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) {
          return done(null, false, {message: 'Invalid password'});
        }
        return done(null, user);
      });
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/api/v1/users/login', failureFlash: true}),
  (req, res) => {
    res.redirect('/');
  });

router.get('/logout', (req, res) => {
  req.logout();

  req.flash('success_msg', 'You are logged out');

  res.redirect('/api/v1/users/login');
});

router.get('/:id', (req, res) => {
  User.getUserByUid(req.params.id, (err, user) => {
    if (err) throw err;
    res.json(user);
  });
});

module.exports = router;
