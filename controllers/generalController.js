const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const UserModel = require("../models/UserModel");
const CompanyModel = require("../models/CompanyModel");
const jwtService = require("./jwtService");
const AppManager = require('../managers/AppManager');
const iCreditManager = require('../managers/iCreditManager');
const {reject, resolve} = require("./apiManager");
const routeWrapper = require("./apiManager").routeWrapper;
const {body} = require('express-validator/check');
const bodyParser = require('body-parser');
const {createUser} = require('../managers/FirebaseManager');

const registerToFirebase = async userData => {
    const fbUser = await createUser(userData);
    userData.fbUid = fbUser.uid;
};

//POST /register user
router.post('/register',
    [
        body('username', "שדות חסרים").exists(),
        body('email', "שדות חסרים").exists(),
        body('password', "שדות חסרים").exists(),
    ],
    (req, res) => routeWrapper(req, res, async (req, res) => {
        let userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };

        let user = await UserModel.getByUserName(userData.username);
        if (user)
            return reject("שם משתמש קיים", 401);
        
        // await registerToFirebase(userData);
        user = await AppManager.registerCompanyManager(userData);
        
        // use the jsonwebtoken package to create the token and respond with it
        const token = jwtService.sign(user);
        
        return resolve({
            user,
            token
        });
    })
);

// Creating a /login route to acquire a token
//POST /login user
router.post('/login',
    [
        body('identifier', "אנא הכנס שם משתמש או אימייל").not().isEmpty(),
    ],
    (req, res) => routeWrapper(req, res, async (req, res) => {
        let identifier = req.body.identifier;
        let password = req.body.password;

        const user = await UserModel.getByUserIdentifier(identifier, true)
        if (!user) {
            return reject("שם משתמש או אימייל לא נמצאו", 401);
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
        let token = jwtService.sign(user);
        return resolve({
            user,
            token
        });
    })
);

//get current user from token
router.get('/authenticate',
    (req, res) => routeWrapper(req, res, (req, res) => {

        // Check header or url parameters or post parameters for token
        var token = jwtService.extractTokenFromRequest(req);
        if (!token) {
            return reject("[authenticate] - Must pass token", 401);
        }

        // Decode token
        // TODO move into jwtService
        return jwt.verify(token, config.secret, async (err, user) => {
            if (err)
                return reject(`[authenticate] - Token is not valid, Error: ${err.message}`, 401);

            //return user using the id from w/in JWTToken
            try {
                user = await UserModel.getByUserId(user._id);
                user = UserModel.getCleanUser(user.toObject()); // Don't pass password and stuff

                //note: you can renew token by creating new token(i.e. refresh it) w/ new expiration time at this point, but I'm passing the old token back.
                // var token = utils.generateToken(user);

                return await resolve({
                    user,
                    token
                });
            }
            catch (err) {
                return await reject('[authenticate] - User was not found', 401);
            }
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

router.post('/api/general/ipn', bodyParser.urlencoded({ extended: true }),
    (req, res) => routeWrapper(req, res, async (req, res) => {
        try {
            let data = req.body;
            console.log("ipn response: " + JSON.stringify(data));

            await iCreditManager.handleIPNCall(data);
            return await resolve();
        }
        catch (err) {
            console.error(err.message);
            return await reject(err);
        }
    })
);

module.exports = router;
