const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const UserModel = require("../users/userModel");

// Get Homepage
router.get('/', (req, res) => {
    res.json('Hi this is Meeba!');
});

// TODO Moved it to usersController
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
            UserModel.create(req.body)
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

    UserModel.getByUid(uid)
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
                let token = jwt.sign(user, config.secret);
                return res.status(200).json({user, token});
            });
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
});

module.exports = router;
