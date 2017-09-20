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

    // TODO Something is not working here on run (debug is ok...)
    return Promise.all([
        CompanyModel.count().exec(),
        UserModel.count().exec(),
        ShiftModel.count().exec(),
    ]).then((responses) => {
        console.log("clearDB 1");
        responses.forEach(response => {
            if (response > 3)
                throw new Error("[testUtils.clearDB] - Error! - clearing db with too much documents");
        });
    }).then(() => {
        console.log("clearDB 2");
        return Promise.all([
            CompanyModel.deleteAllCompanies(),
            UserModel.deleteAllUsers(),
            ShiftModel.deleteAllShifts(),
        ]).then(function () {
            console.log("clearDB 3");
            // return createAdminUser();
        });
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

function createMockedUserPlainObject(name) {
    return {
        uid: '031667330'
        , firstName: (!name) ? 'Chen' : name
        , lastName: 'Oppenhaim'
        , email: 'chenop@gmail.com'
        , password: "123456"
        , role: "employee"
        , shifts: []
        , company: {}
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
    , TIMEOUT
    , getAdminUser
    , clearDB
};
