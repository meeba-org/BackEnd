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

const getUser = async (identifier, password) => {
    const user = await UserModel.getByUserIdentifier(identifier, true)
    if (!user) {
        throw new Error("שם משתמש לא קיים");
    }

    if (UserModel.isCompanyManager(user)) {
        if (!password)
            throw new Error("אנא הכנס סיסמא");

        let isMatch = UserModel.comparePassword(password, user.password);

        if (!isMatch) {
            throw new Error("סיסמא לא נכונה - נסה שנית");
        }
    } 
    
    return user;
};

// Creating a /login route to acquire a token
//POST /login user
router.post('/login',
    [
        body('uid', "אנא הכנס שם משתמש").not().isEmpty(),
    ],
    (req, res) => routeWrapper(req, res, async (req, res) => {
        let identifier = req.body.uid;
        let password = req.body.password;
        let user;

        try {
            user = getUser(identifier, password);
        }
        catch (err) {
            return reject(err.message, 401);
        }

        // use the jsonwebtoken package to create the token and respond with it
        let token = jwt.sign(user.toObject(), config.secret);
        return resolve({
            user,
            token
        });
    })
);

// Convert username to Firebase credentials
//POST /convertor user
router.post('/checkUserForFbExport',
    [
        body('uid', "אנא הכנס שם משתמש").not().isEmpty(),
    ],
    (req, res) => routeWrapper(req, res, async (req, res) => {
        let identifier = req.body.uid;
        let password = req.body.password;
        let user;

        try {
            user = getUser(identifier, password);
        }
        catch (err) {
            return reject(err.message, 401);
        }

        if (isFbUidExist(user))
            return reject("אנא היכנס עם המייל שלך", 401);

        // New user to Firebase
        return resolve("GetEmail");
    })
);

router.post('/exportUserToFb',
    [
        body('email', "אנא הכנס אימייל").not().isEmpty(),
    ],
    (req, res) => routeWrapper(req, res, async (req, res) => {
        let identifier = req.body.uid;
        let password = req.body.password;
        let user;

        try {
            user = getUser(identifier, password);
        }
        catch (err) {
            return reject(err.message, 401);
        }

        if (isFbUidExist(user))
            return reject("אנא היכנס עם המייל שלך", 401);

        // Create FbUser - Save token
        // Save Enail
        // Save fbUid
        
        // Return token
        // use the jsonwebtoken package to create the token and respond with it
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
