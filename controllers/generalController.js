const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const UserModel = require("../models/UserModel");
const CompanyModel = require("../models/CompanyModel");
const jwtService = require("./jwtService");
const AppManager = require('../managers/AppManager');
const {reject, resolve} = require("./apiManager");
const routeWrapper = require("./apiManager").routeWrapper;
const {body} = require('express-validator/check');

//POST /register user
router.post('/register',
    [
        body('username', "שדות חסרים").exists(),
        body('password', "שדות חסרים").exists(),
        body('retypePassword', "שדות חסרים").exists(),
    ],
    (req, res) => routeWrapper(req, res, (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let retypePassword = req.body.retypePassword;

        if (password !== retypePassword)
            return reject("סיסמאות אינן תואמות", 401);

        return UserModel.getByUserName(username)
            .then(user => {
                if (user)
                    return reject("שם משתמש קיים", 401);

                return AppManager.registerCompanyManager(username, password);
            })
            .then((user) => {
                // use the jsonwebtoken package to create the token and respond with it
                let token = jwt.sign(user.toObject(), config.secret);
                return resolve({
                    user,
                    token
                });
            })
    })
);

// Creating a /login route to acquire a token
//POST /login user
router.post('/login',
    [
        body('uid', "אנא הכנס שם משתמש").exists(),
    ],
    (req, res) => routeWrapper(req, res, (req, res) => {
        let identifier = req.body.uid;
        let password = req.body.password;

        return UserModel.getByUserIdentifier(identifier, true)
            .then((user) => {
                if (!user) {
                    return reject("שם משתמש לא קיים", 401);
                }

                if (UserModel.isCompanyManager(user)) {
                    if (!password)
                        return reject("אנא הכנס סיסמא", 401);

                    let isMatch = UserModel.comparePassword(password, user.password);

                    if (!isMatch) {
                        return reject("סיסמא לא נכונה - נסה שנית", 401);
                    }
                }

                // use the jsonwebtoken package to create the token and respond with it
                let token = jwt.sign(user.toObject(), config.secret);
                return resolve({
                    user,
                    token
                });
            })
    })
);

//get current user from token
router.get('/authenticate',
    (req, res) => routeWrapper(req, res, (req, res) => {

        // check header or url parameters or post parameters for token
        var token = jwtService.extractTokenFromRequest(req);
        if (!token) {
            return reject("[authenticate] - Must pass token", 401);
        }

        // decode token
        // Use process.env.JWT_SECRET instead of config.secret
        return jwt.verify(token, config.secret, function (err, user) {
            if (err)
                return reject('[authenticate] - Token is not valid', 401);

            //return user using the id from w/in JWTToken
            return UserModel.getByUserId(user._id)
                .then((user) => {
                    user = UserModel.getCleanUser(user.toObject()); //don't pass password and stuff

                    //note: you can renew token by creating new token(i.e. refresh it) w/ new expiration time at this point, but I'm passing the old token back.
                    // var token = utils.generateToken(user);

                    return resolve({
                        user,
                        token
                    });
                })
                .catch(() => reject('[authenticate] - User was not found', 401));
        });
    })
);

router.get('/api/general/meta',
    (req, res) => routeWrapper(req, res, (req, res) => {
        return Promise.all([
            CompanyModel.companiesCount(),
            UserModel.usersCount(),
        ])
        .then((resultArr) => {
            return Promise.resolve({
                companiesCount: resultArr[0],
                usersCount: resultArr[1],
                isDevEnv: process.env.NODE_ENV === 'development'
            });
        });
    })
);


router.post('/api/general/ipn',
    (req, res) => routeWrapper(req, res, (req, res) => {
        try {
            console.log('testing ipn start');
            let preetifyRes = JSON.stringify(req, null, 4);
            console.log("testing ipn req: " + preetifyRes);
            // let preetifyData = JSON.stringify(req.data, null, 4);
            // console.log("testing ipn data: " + preetifyData);

            return resolve();
        }
        catch (e) {
            console.log(e);
            return reject(e);
        }
    })
);

module.exports = router;
