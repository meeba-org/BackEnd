process.env.NODE_ENV = 'production';

const CompanyModel = require("../models/CompanyModel");
const UserModel = require("../models/UserModel");
const mongoose = require('mongoose');
const config = require('../config');
const iCreditManager = require("../managers/iCreditManager");


mongoose.connect(config.dbUrl, {useNewUrlParser: true }, () => {
    console.log("Connected to DB successfully");
});

const chargePremiumCompanies = async () => {
    let companies = await CompanyModel.getPremiumPlanCompanies();
    if (!companies || companies.length === 0) {
        console.log('No Premium companies found :-(');
        return;
    }

    for (let company of companies) {
        try{
            await iCreditManager.generateImmediatePayment(company._id);
        }
        catch (e) {
            console.log(e);
        }
    }
};

const run = async () => {
    try {
        await chargePremiumCompanies();
        console.log("Success!");
    } catch (e) {
        console.error(e);
        console.log("Failed...");
    } finally {
        process.exit();
    }
};

run();
