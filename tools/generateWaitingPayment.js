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

let companyId = "5a1a9d1e9723c88e24ef4907";

const generateWaitingPayment = async (companyId) => {
    let company = await CompanyModel.getByCompanyId(companyId);
    if (!company)
        throw new Error(`Company id ${companyId} was not found`);

    if (!company.paymentData) {
        throw new Error(`No Payment daya for company id ${companyId}`);
    }

    let {email} = company;
    let {creditCardToken} = company.paymentData;

    if (!email || !creditCardToken)
        throw new Error(`email or creditCardToken is missing for company id ${companyId}`);
    await iCreditManager.generateWaitingPaymentAndSave(creditCardToken, email, companyId);
};

const run = async () => {
    try {
        await generateWaitingPayment(companyId);
        console.log("Success!");
    } catch (e) {
        console.error(e);
        console.log("Failed...");
    } finally {
        process.exit();
    }
};

run();
