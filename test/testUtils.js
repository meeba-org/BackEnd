/**
 * Created by Chen on 08/01/2016.
 */
'use strict';


const mongoose = require('mongoose');
const CompanyModel = require('../models/CompanyModel');
const UserModel = require('../models/UserModel');
const ShiftModel = require('../models/ShiftModel');

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
//console.log("process.env.NODE_ENV: " + process.env.NODE_ENV);
process.env.NODE_ENV = 'test';
const config = require('../config');

const TIMEOUT = 20000;

function clearDB(doneCallBack) {
    if (process.env.NODE_ENV !== "test")
        throw new Error("Error! - working on env which is not test environment is not allowed!!!");
    if (config.dbUrl !== config.TEST_DB)
        throw new Error("Error! - clear DB which is not test db is not allowed!!!");

    const promises = [
        CompanyModel.deleteAllCompanies(),
        UserModel.deleteAllUsers(),
        ShiftModel.deleteAllShifts(),
    ];

    Promise.all(promises)
        .then(function () {
            return createAdminUser();
        })
        .then(function () {
            doneCallBack();
        });
}

beforeEach(function (done) {
    this.timeout(TIMEOUT);

    if (mongoose.connection.readyState === 0) {
        mongoose.connect(config.dbUrl, function (err) {
            if (err) {
                throw err;
            }
            return clearDB(done);
        });
    } else {
        return clearDB(done);
    }
});


afterEach(function (done) {
    mongoose.disconnect();
    return done();
});

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

function createMockedUserPlainObject() {
    return {
        uid: '031667330'
        , first_name: 'Chen'
        , last_name: 'Oppenhaim'
        , email: 'chenop@gmail.com'
        , username: "chenop"
        , password: "123456"
        , role: "employee"
    };
}

function createMockedCompanyPlainObject(name) {
    return {
        name: name,
    };
}

module.exports = {
    createMockedUserPlainObject: createMockedUserPlainObject
    , createMockedCompanyPlainObject: createMockedCompanyPlainObject
    , TIMEOUT: TIMEOUT
    , getAdminUser: getAdminUser
};
