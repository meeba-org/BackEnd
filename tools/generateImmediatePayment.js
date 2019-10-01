/* eslint no-console: 0 */
process.env.NODE_ENV = 'production';

// eslint-disable-next-line no-unused-vars
const CompanyModel = require("../models/CompanyModel");
const UserModel = require("../models/UserModel");
const mongoose = require('mongoose');
const config = require('../config');
const iCreditManager = require("../managers/iCreditManager");


mongoose.connect(config.dbUrl, {useNewUrlParser: true }, () => {
    console.log("Connected to DB successfully");
});

let companyId = "5a1a9d1e9723c88e24ef4907";

const run = async () => {
    try {
        await iCreditManager.generateImmediatePayment(companyId);
        console.log("Success!");
    } catch (e) {
        console.error(e);
        console.log("Failed...");
    } finally {
        process.exit();
    }
};

run();
