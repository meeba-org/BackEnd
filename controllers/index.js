const express = require('express');
const router = express.Router();
const ejwt = require('express-jwt');

const groups = require('./groupsController');
const operations = require('./operationsController');
const general = require('./generalController');
const users = require('./UsersController');
const shifts = require('./ShiftsController');
const config = require('../config');

router.use('/', general);

router.use('/api', ejwt({secret: config.secret}));
router.use('/api/users', users);
router.use('/api/shifts', shifts);
router.use('/api/groups', groups);
router.use('/api/operations', operations);

router.use(function (err, req, res) {
    if (err.name === 'UnauthorizedError') {
        res.status(403).send('[Error] - invalid token, message: ' + err.message);
    }
    else if (err.name === 'PermissionError') {
        res.status(403).send('[Error] - Permission denied!');
    }
    else if (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
