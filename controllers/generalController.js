const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const UserModel = require("../models/UserModel");
const jwtService = require("./jwtService");
const AppManager = require('../managers/AppManager');

//POST /register user
router.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let retypePassword = req.body.retypePassword;

    if (!username || !password || !retypePassword)
        return res.status(401).send({message: "שדות חסרים"});

    if (password != retypePassword)
        return res.status(401).send({message: "סיסמאות אינן תואמות"});

    return UserModel.getByUserName(username)
        .then(user => {
            if (user)
                return res.status(401).send({message: "שם משתמש קיים"});

            return AppManager.registerCompanyManager(username, password);
        })
        .then((user) => {
            // use the jsonwebtoken package to create the token and respond with it
            let token = jwt.sign(user.toObject(), config.secret);
            return res.status(200).json({user, token});
        })
        .catch((err) => res.status(500).json({message: err.message}));
});

// Creating a /login route to acquire a token
//POST /login user
router.post('/login', function (req, res) {
    let identifier = req.body.uid;
    let password = req.body.password;

    if (!identifier) {
        return res.status(401).send({message: "אנא הכנס שם משתמש"});
    }

    return UserModel.getByUserIdentifier(identifier, true)
        .then((user) => {
            if (!user) {
                return res.status(401).send({message: "שם משתמש לא קיים"});
            }

            if (UserModel.isCompanyManager(user)) {
                if (!password)
                    return res.status(401).json({message: "אנא הכנס סיסמא"});

                let isMatch = UserModel.comparePassword(password, user.password);

                if (!isMatch) {
                    return res.status(401).json({message: "סיסמא לא נכונה - נסה שנית"});
                }
            }

            // use the jsonwebtoken package to create the token and respond with it
            let token = jwt.sign(user.toObject(), config.secret);
            return res.status(200).json({user, token});
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
});

//get current user from token
router.get('/authenticate', function(req, res) {

    // check header or url parameters or post parameters for token
    var token = jwtService.extractTokenFromRequest(req);
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
                user = UserModel.getCleanUser(user.toObject()); //don't pass password and stuff

                //note: you can renew token by creating new token(i.e. refresh it) w/ new expiration time at this point, but I'm passing the old token back.
                // var token = utils.generateToken(user);

                res.status(200).json({user, token});
            })
            .catch(() => res.status(401).json({message: '[authenticate] - User was not found'}));
    });
});
module.exports = router;
