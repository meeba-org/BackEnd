const express = require('express');
const router = express.Router();
const ejwt = require('express-jwt');
const general = require('./generalController');
const users = require('./UsersController');
const shifts = require('./ShiftsController');
const companies = require('./CompaniesController');
const goPremium = require('./GoPremiumController');
const tasks = require('./TasksController');
const reports = require('./ReportsController');
const config = require('../config');
const jwtService = require("./jwtService");
const UserModel = require('../models/UserModel');

router.use('/', general);

router.use('/api', ejwt({secret: config.secret}));
router.use('/api', extractUserMiddleware);
router.use('/api/shifts', shifts);
router.use('/api/reports', reports);
router.use('/api/tasks', tasks);
router.use('/api', restrictEmployee); // Beyond here api is not allowed for employees
router.use('/api/users', users);
router.use('/api/companies', companies);
router.use('/api/goPremium', goPremium);

router.use(function (err, req, res, next) {
     if (err.name === 'UnauthorizedError') {
        res.status(403).send('[Error] - invalid token, message: ' + err.message);
    }
    else if (err.name === 'PermissionError') {
        res.status(403).send('[Error] - Permission denied!');
    }
});

function restrictEmployee(req, res, next) {
    if (req.method.toLowerCase() === 'options')
        return next();

    let user = res.locals.user;
    if (!user || UserModel.isEmployee(user)) {
        let name = (!user || !user.fullName) ? "" : user.fullName;
        return res.status(403).send("user " + name + " is not authorized");
    }

    return next();
};

function extractUserMiddleware(req, res, next) {
    if (req.method.toLowerCase() === 'options')
        return next();

    try {
        res.locals.user = jwtService.getUserFromToken(req);
    }
    catch(err) {
        return res.status(500).send(err);
    }
    return next();
};

module.exports = router;
