/**
 * Created by Chen on 08/01/2016.
 */
'use strict';

const CompanyModel = require('../models/CompanyModel');
const UserModel = require('../models/UserModel');
const ShiftModel = require('../models/ShiftModel');
const moment = require('moment');
const mongoose = require("mongoose");

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
//console.log("process.env.NODE_ENV: " + process.env.NODE_ENV);
process.env.NODE_ENV = 'test';
const config = require('../config');

const TIMEOUT = 20000;

beforeEach(function (done) {
    this.timeout(TIMEOUT);
    if (mongoose.connection.db)
        return clearDB()
            .then(() => done());

    mongoose.connect(config.dbUrl, { useMongoClient: true})
        .then(() => {
            clearDB()
                .then(() => done());
        })
});

function clearDB() {
    if (process.env.NODE_ENV !== "test")
        throw new Error("[testUtils.clearDB] - Error! - working on env which is not test environment is not allowed!!!");
    if (config.dbUrl !== config.TEST_DB)
        throw new Error("[testUtils.clearDB] - Error! - clear DB which is not test db is not allowed!!!");

    return Promise.all([
        CompanyModel.companiesCount(),
        UserModel.usersCount(),
        ShiftModel.shiftsCount(),
    ])
    .then((responses) => {
        responses.forEach(response => {
            if (response > 4)
                throw new Error("[testUtils.clearDB] - Error! - clearing db with too much documents");
        });
    }).then(() => {
        return Promise.all([
            CompanyModel.deleteAllCompanies(),
            UserModel.deleteAllUsers(),
            ShiftModel.deleteAllShifts(),
        ]);
    });
}

function getAdminUser() {
    return {
        email: 'admin@gmail.com',
        role: 'admin',
        password: "123456"
    };
}

function createAdminUser() {
    const promises = [
        UserModel.createUser(getAdminUser())
    ];

    return Promise.all(promises);
}

function createMockedUserPlainObject(name = 'Chen') {
    return {
        uid: '031667330'
        , firstName: name
        , lastName: 'Oppenhaim'
        , email: 'chenop@gmail.com'
        , password: "123456"
        , role: "employee"
        , shifts: []
        //, company: {}
    };
}

function createMockedShiftPlainObject(clockInTime1, company) {

    let clockInTime = clockInTime1 || new Date();
    let clockOutTime = moment(clockInTime).add(8, 'hours');

    return {
        clockInTime: clockInTime
        , clockOutTime: clockOutTime
        , user: []
        , company: company
    };
}


function createMockedCompanyPlainObject(name) {
    return {
        name: name,
    };
}

module.exports = {
    createMockedUserPlainObject
    , createMockedCompanyPlainObject
    , createMockedShiftPlainObject
    , TIMEOUT
    , getAdminUser
    , clearDB
};
