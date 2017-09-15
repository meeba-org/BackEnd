/**
 * Created by Chen on 08/01/2016.
 */
'use strict';


//var config = require('../config');
var mongoose = require('mongoose');
var fs = require('fs');
var mime = require('mime');
var CompanyModel = require('../models/CompanyModel');
var UserModel = require('../models/UserModel');
var ShiftModel = require('../models/ShiftModel');

var UserService = require('../server/services/userService');

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
//console.log("process.env.NODE_ENV: " + process.env.NODE_ENV);
process.env.NODE_ENV = 'test';
var config = require('../server/config');

var TIMEOUT = 20000;

function clearDB(doneCallBack) {
    if (process.env.NODE_ENV !== "test")
        throw new Error("Error! - working on env which is not test environment is not allowed!!!");
    if (config.dbUrl !== config.TEST_DB_URL)
        throw new Error("Error! - clear DB which is not test db is not allowed!!!");

    var promises = [
        CompanyModel.remove().exec(),
        UserModel.remove().exec(),
        ShiftModel.remove().exec(),
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
    var promises = [
        UserService.createUser(getAdminUser())
    ];

    return Promise.all(promises);
}

function createMockedUserPlainObject() {
    var newUser = {
        uid: '031667330'
        , first_name: 'Chen'
        , last_name: 'Oppenhaim'
        , email: 'chenop@gmail.com'
        , username: "chenop"
        , password: "123456"
        , role: "employee"
    };
    return newUser;
}

function createMockedCompanyPlainObject(name) {
    var newCompany = {
        name: name,
    };
    return newCompany;
}

module.exports = {
    createMockedUserPlainObject: createMockedUserPlainObject
    , createMockedCompanyPlainObject: createMockedCompanyPlainObject
    , TIMEOUT: TIMEOUT
    , getAdminUser: getAdminUser
};
