const express = require('express');
const router = express.Router();
const ejwt = require('express-jwt');
const general = require('./generalController');
const users = require('./UsersController');
const shifts = require('./ShiftsController');
const companies = require('./CompaniesController');
const config = require('../config');
const jwtService = require("./jwtService");

router.use('/', general);

router.use('/api', ejwt({secret: config.secret}));
router.use('/api', function (req, res, next) {
    if (req.method.toLowerCase() == 'options')
        next();

    res.locals.user = jwtService.getUserFromToken(req);
    next();
});

router.use('/api/users', users);
router.use('/api/shifts', shifts);
router.use('/api/companies', companies);

router.use(function (err, req, res) {
    if (err.name === 'UnauthorizedError') {
        res.status(403).send('[Error] - invalid token, message: ' + err.message);
    }
    else if (err.name === 'PermissionError') {
        res.status(403).send('[Error] - Permission denied!');
    }
    // else if (err) {
    //     console.log(err);
    //     res.status(500).send(err);
    // }
});

module.exports = router;
