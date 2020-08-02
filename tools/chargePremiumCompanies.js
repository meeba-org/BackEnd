/* eslint no-console: 0 */
const {MONTHLY_SUBSCRIPTION_PRICE} = require("../constants");

process.env.NODE_ENV = 'production';

const CompanyModel = require("../models/CompanyModel");
// eslint-disable-next-line no-unused-vars
const UserModel = require("../models/UserModel");
const config = require('../config');
const mongooseManager = require("../managers/MongooseManager");

const chargePremiumCompanies = async () => {
    console.log("Subscription price is:", MONTHLY_SUBSCRIPTION_PRICE);
    let companies = await CompanyModel.getPremiumPlanCompanies();
    if (!companies || companies.length === 0) {
        console.log('No Premium companies found :-(');
        return;
    }

    console.log(`Premium Companies: ${companies.length}`);
    
    for (let company of companies) {
        try{
            console.log(`${company.name} - Charging company - id: ${company._id}`);
            // For testing comment the following line
            // await iCreditManager.generateImmediatePayment(company._id);
            console.log(`${company.name} - Success!`);
        }
        catch (e) {
            console.log(`${company.name} - Failed!`);
        }
    }
};

const run = async () => {
    await mongooseManager.connect(config.dbUrl);

    await chargePremiumCompanies();
    process.exit();
};

run();
