/* eslint no-console: 0 */
const {MONTHLY_SUBSCRIPTION_PRICE} = require("../constants");

process.env.NODE_ENV = 'production';

const CompanyModel = require("../models/CompanyModel");
// eslint-disable-next-line no-unused-vars
const UserModel = require("../models/UserModel");
const mongoose = require('mongoose');
const config = require('../config');
const iCreditManager = require("../managers/iCreditManager");


mongoose.connect(config.dbUrl, {useNewUrlParser: true }, () => {
    console.log("Connected to DB successfully");
});

const chargePremiumCompanies = async () => {
    console.log("Subscription price is:", MONTHLY_SUBSCRIPTION_PRICE);
    let companies = await CompanyModel.getPremiumPlanCompanies();
    if (!companies || companies.length === 0) {
        console.log('No Premium companies found :-(');
        return;
    }

    for (let company of companies) {
        try{
            console.log(`${company.name} - Charging company - id: ${company._id}`);
            // For testing comment the following line
            await iCreditManager.generateImmediatePayment(company._id);
            console.log(`${company.name} - Success!`);
        }
        catch (e) {
            console.log(`${company.name} - Failed!`);
        }
    }
};

const run = async () => {
    await chargePremiumCompanies();
    process.exit();
};

run();
