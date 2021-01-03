/* eslint no-console: 0 */
const {MONTHLY_SUBSCRIPTION_PRICE} = require("../constants");

process.env.NODE_ENV = 'production';

const CompanyModel = require("../models/CompanyModel");
// eslint-disable-next-line no-unused-vars
const UserModel = require("../models/UserModel");
const config = require('../config');
const mongooseManager = require("../managers/MongooseManager");
// eslint-disable-next-line no-unused-vars
const {generateImmediatePayment} = require("../managers/iCreditManager");

function printSummary(failedCompanies) {
    if (failedCompanies.length === 0) {
        console.log("Great Success! All companies have been charged successfully!!!");
    } else {
        console.log("Sorry... The following companies has failed: ");
        failedCompanies.forEach(company => console.log(`name: ${company.name}, id: ${company.id}`));
    }
}

const chargePremiumCompanies = async () => {
    console.log("Subscription price is:", MONTHLY_SUBSCRIPTION_PRICE);
    let companies = await CompanyModel.getPremiumPlanCompanies();
    // let kidron = await CompanyModel.getByCompanyId("5fa9100b7faec90034222534");
    // let companies = [kidron];
    if (!companies || companies.length === 0) {
        console.log('No Premium companies found :-(');
        return;
    }

    console.log(`Premium Companies: ${companies.length}`);
    
    let failedCompanies = [];
    for (let company of companies) {
        try{
            console.log(`${company.name} - Charging company - id: ${company._id}`);
            // For testing comment the following line
             await generateImmediatePayment(company._id);
            console.log(`${company.name} - Success!`);
        }
        catch (e) {
            failedCompanies.push({name: company.name, id: company._id});
            console.log(`${company.name} - Failed!`);
        }
    }
    
    printSummary(failedCompanies);
};

const run = async () => {
    await mongooseManager.connect(config.dbUri);

    await chargePremiumCompanies();
    process.exit();
};

run();
