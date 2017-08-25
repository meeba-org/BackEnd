const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const util = require('util');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const User = require('../models/user');
const userController = require('../controllers/userController');

router.post('/register', (req, res) => {
    const uid = req.body.uid;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
    const role = req.body.role;

    // Validation
    req.checkBody('uid', 'id is required').notEmpty();
    req.checkBody('first_name', 'First name is required').notEmpty();
    req.checkBody('last_name', 'Last name is required').notEmpty();
    req.checkBody('role', 'Role is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();

    if (errors) {
        return res.status(400).json({message: errors});
    }
    else {
        // Passed
        const newUser = new User({
            uid: uid,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            role: role
        });

        User.create(newUser, (err, user) => {
            if (err) throw err;
            //console.log(user);
        });

        return res.status(200).json({message: "User is registered and can now login"});
    }
});

// passport.js works with the concept of strategies.
// They basically are a middleware function that a requests runs through before getting to the actual route.
// If your defined authentication strategy fails, which means that the callback will be called with an error that is not null or false as the second argument,
// the route will not be called, but a 401 Unauthorized response will be sent.
const jwtOptions = {}
// Our strategy is configured to read the JWT from the Authorization http headers of each request.
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
// The secretOrKey is the secret that our tokens will be signed with. Choose this wisely or use a private key.
jwtOptions.secretOrKey = 'tH1S1Sag00Dk3Y';
// Define Auth Strategy
var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    User.getByUid(jwt_payload.uid, (err, user) => {
        if (err) throw err;
        if (!user) {
            return next(null, false, {message: 'Unknown User'});
        }
        return next(null, user);
    });
});

passport.use(strategy);

// Creating a /login route to acquire a token
router.post('/login', function (req, res) {
    let uid = req.body.uid;
    let password = req.body.password;

    if (!uid || !password) {
        return res.status(401).json("uid or password are missing")
    }

    User.getByUid(uid)
        .then((user) => {
            if (!user) {
                return res.status(401).json({message: "no such user found"});
            }

            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                //TODO remove next line when bcrypt is fixed
                isMatch = true;
                if (!isMatch) {
                    return res.status(401).json({message: "password did not match"});
                }
                // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
                // set the payload for the JWT
                var payload = {uid: user.uid};
                // use the jsonwebtoken package to create the token and respond with it
                var token = jwt.sign(payload, jwtOptions.secretOrKey);
                return res.status(200).json({token: token});
            });
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
});

// Creating a /secret route, that only is available to logged in users with a JSON web token
// The passport.authenticate part means that we pass the request through our previously defined authentication strategy and run it.
// If it’s successful, we respond with the secret message, else the request will be unauthorized (401).
router.get('/secret', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json("Success! You can not see this without a token.");
});

router.get('/', (req, res) => {
    userController.getAll(req, res);
});

router.post('/', (req, res) => {
    req.checkBody('uid', 'uid is required').notEmpty();
    req.checkBody('first_name', 'First name is required').notEmpty();
    req.checkBody('last_name', 'Last name is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('role', 'Role is required').notEmpty();
    userController.create(req, res);

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
            return;
        }
    });

});

router.get('/:uid', (req, res) => {
    userController.getOne(req, res);
});

module.exports = router;
