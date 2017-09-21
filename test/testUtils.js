/**
 * Created by Chen on 08/01/2016.
 */
'use strict';

const CompanyModel = require('../models/CompanyModel');
const UserModel = require('../models/UserModel');
const ShiftModel = require('../models/ShiftModel');

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
//console.log("process.env.NODE_ENV: " + process.env.NODE_ENV);
process.env.NODE_ENV = 'test';
const config = require('../config');

const TIMEOUT = 20000;

function clearDB() {
    if (process.env.NODE_ENV !== "test")
        throw new Error("[testUtils.clearDB] - Error! - working on env which is not test environment is not allowed!!!");
    if (config.dbUrl !== config.TEST_DB)
        throw new Error("[testUtils.clearDB] - Error! - clear DB which is not test db is not allowed!!!");

    return Promise.all([
        CompanyModel.companiesCount(),
        UserModel.usersCount(),
        ShiftModel.shiftsCount(),
    ]).then((responses) => {
        responses.forEach(response => {
            if (response > 3)
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

function createMockedShiftPlainObject() {
    return {
        clockInTime: new Date()
        , clockOutTime: new Date(new Date().getTime() +  60 * 1000)
        , users: []
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
