/**
 * Created by Chen on 08/01/2016.
 */
'use strict';

const CompanyModel = require('../models/CompanyModel');
const UserModel = require('../models/UserModel');
const ShiftModel = require('../models/ShiftModel');
const PaymentModel = require('../models/PaymentModel');
const moment = require('moment');
const mongoose = require("mongoose");
const mongooseManager = require("../managers/MongooseManager");

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
//console.log("process.env.NODE_ENV: " + process.env.NODE_ENV);
process.env.NODE_ENV = 'test';
const config = require('../config');
const TaskModel = require("../models/TaskModel");

const TIMEOUT = 20000;

beforeEach( async () => {
    this.timeout(TIMEOUT);
    if (mongoose.connection.db)
        return clearDB();

    await mongooseManager.connect(config.dbUrl);
    return clearDB();
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
        TaskModel.tasksCount(),
        PaymentModel.paymentsCount()
    ])
    .then((responses) => {
        responses.forEach(response => {
            if (response > 4)
                throw new Error("[testUtils.clearDB] - Error! - something suspicious --> clearing db with too much documents (verify you are not on production)");
        });
    }).then(() => {
        return Promise.all([
            CompanyModel.deleteAllCompanies(),
            UserModel.deleteAllUsers(),
            ShiftModel.deleteAllShifts(),
            TaskModel.deleteAllTasks(),
            PaymentModel.deleteAllPayments()
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
        , username: 'chenop'
        , fullName: name
        , email: 'chenop@gmail.com'
        , password: "123456"
        , role: "employee"
        , shifts: []
        //, company: {}
    };
}

function createMockedShiftPlainObject(clockInTime1, company, user) {

    let clockInTime = clockInTime1 || new Date();
    let clockOutTime = moment(clockInTime).add(8, 'hours');

    return {
        clockInTime: clockInTime
        , clockOutTime: clockOutTime
        , user: user
        , company: company
    };
}


const createMockedCompanyPlainObject = name => ({
    name,
});

const createMockedPaymentPlainObject = company => ({
    company,
    publicSaleToken: "111-222-333",
    privateSaleToken: "444-555-666",
    status: 0
});

const createMockedTaskPlainObject = (title, parent) => ({
    title,
    company: require('mongoose').Types.ObjectId(),
    parent,
});

module.exports = {
    createMockedUserPlainObject
    , createMockedCompanyPlainObject
    , createMockedTaskPlainObject
    , createMockedShiftPlainObject
    , createMockedPaymentPlainObject
    , TIMEOUT
    , getAdminUser
    , clearDB
};
