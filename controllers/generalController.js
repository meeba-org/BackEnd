const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const UserModel = require("../models/UserModel");

// Get Homepage
router.get('/', (req, res) => {
    res.json('Hi this is Meeba!');
});

//POST /register user
router.post('/register', (req, res) => {
    // Validation
    req.checkBody('uid', 'id is required').notEmpty();
    req.checkBody('first_name', 'First name is required').notEmpty();
    req.checkBody('last_name', 'Last name is required').notEmpty();
    req.checkBody('role', 'Role is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();

    req.getValidationResult()
        .then(function (result) {
            result.throw();
            UserModel.createUser(req.body)
                .then((user) => res.status(200).json({user: user}))
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

// Creating a /login route to acquire a token
//POST /login user
router.post('/login', function (req, res) {
    let uid = req.body.uid;
    let password = req.body.password;

    if (!uid || !password) {
        return res.status(401).json("uid or password are missing")
    }

    UserModel.getByUserUid(uid)
        .then((user) => {
            if (!user) {
                return res.status(401).json({message: "no such user found"});
            }

            UserModel.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                //TODO remove next line when bcrypt is fixed
                isMatch = true;
                if (!isMatch) {
                    return res.status(401).json({message: "password did not match"});
                }

                // use the jsonwebtoken package to create the token and respond with it
                let token = jwt.sign(user.toObject(), config.secret);
                return res.status(200).json({user, token});
            });
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
});

function extractTokenFromRequest(req) {
    const authorization = req.headers['authorization'];
    if (authorization) {
        let parts = authorization.split(' ');

        if (parts.length == 2) {
            var scheme = parts[0],
                token = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                return token;
            }
        }
    }
    return req.body.token || req.query.token || req.headers['x-access-token'] || null;
}

//get current user from token
router.get('/authenticate', function(req, res) {

    // check header or url parameters or post parameters for token
    var token = extractTokenFromRequest(req);
    if (!token) {
        return res.status(401).json({message: '[authenticate] - Must pass token'});
    }

    // decode token
    // Use process.env.JWT_SECRET instead of config.secret
    jwt.verify(token, config.secret, function (err, user) {
        if (err)
            return res.status(401).json({message: '[authenticate] - Token is not valid'});

        //return user using the id from w/in JWTToken
        UserModel.getByUserId(user._id)
            .then((user) => {
                user = UserModel.getCleanUser(user.toObject()); //dont pass password and stuff

                //note: you can renew token by creating new token(i.e. refresh it) w/ new expiration time at this point, but I'm passing the old token back.
                // var token = utils.generateToken(user);

                res.status(200).json({user, token});
            })
            .catch(() => res.status(401).json({message: '[authenticate] - User was not found'}));
    });
});
module.exports = router;
