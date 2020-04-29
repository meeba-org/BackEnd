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
const {fbAdmin} = require('../managers/FirebaseManager');

//POST /register user
router.post('/register',
    [
        // body('username', "שדות חסרים").exists(),
        // body('password', "שדות חסרים").exists(),
        // body('retypePassword', "שדות חסרים").exists(),
    ],
    (req, res) => routeWrapper(req, res, async (req, res) => {
        const decodedIdToken = await jwtService.getDecodedIdTokenFromReq(req);
        const user = await AppManager.registerCompanyManager(decodedIdToken.email, decodedIdToken.uid);

        console.log("[register] - user: ", user.toObject());
        return resolve({user});
    })
);

// TODO - is register working??? not clear...
// TODO - understand get users and get shifts

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
        // body('uid', "אנא הכנס שם משתמש").not().isEmpty(),
    ],
    (req, res) => routeWrapper(req, res, async (req, res) => {
        let user;
        try {
            const fbUid = await jwtService.getFbUidFromToken(req);
            user = await UserModel.getUserByFbUid(fbUid);
        }
        catch (err) {
            return reject(err.message, 401);
        }

        return resolve({ user });
    })
);

// Convert username to Firebase credentials
//POST /checkUserForFbExport user
router.post('/checkUserForFbExport',
    [
        body('uid', "אנא הכנס שם משתמש").not().isEmpty(),
    ],
    (req, res) => routeWrapper(req, res, async (req, res) => {
        let identifier = req.body.uid;
        let password = req.body.password;
        let user;

        try {
            user = await getUser(identifier, password);
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
        let identifier = req.body.identifier;
        let email = req.body.email;
        let password = req.body.password;
        let user;

        try {
            user = await getUser(identifier, password);
        }
        catch (err) {
            return reject(err.message, 401);
        }

        // TODO consider doing the login for credentials with username
        if (isFbUidExist(user))
            return reject("כניסה עם שם המשתמש אינה מורשית יותר, אנא היכנס עם המייל שלך", 401);

        // Create user in Firebase - Save token
        const fbUser = await fbAdmin.auth().createUser({
            email,
            password
        });

        // Save Email and fbUid
        user.email = email;
        user.fbUid = fbUser.uid;

        UserModel.updateUser(user);
        
        // Return user
        return resolve({
            user
        });
    })
);

//get current user from token
router.get('/authenticate',
    (req, res) => routeWrapper(req, res, async (req, res) => {

        try {
            let user = await jwtService.getUserFromToken(req);
            user = UserModel.getCleanUser(user.toObject()); // Don't pass password and stuff
    
            return await resolve({user});
        }
        catch (err) {
            return await reject('[authenticate] - User was not found', 401);
        }
    })
);

router.get('/general/meta',
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

router.post('/general/ipn', bodyParser.urlencoded({ extended: true }),
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

const isFbUidExist = (user) => !!user.fbUid;

module.exports = router;
