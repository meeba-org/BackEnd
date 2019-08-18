process.env.NODE_ENV = 'production';

const CompanyModel = require("../models/CompanyModel");
const UserModel = require("../models/UserModel");
const mongoose = require('mongoose');
const config = require('../config');
const iCreditManager = require("../managers/iCreditManager");


mongoose.connect(config.dbUrl, {useNewUrlParser: true }, () => {
    console.log("Connected to DB successfully");
});

let companyId = "5a1a9d1e9723c88e24ef4907";

const generateImmediatePayment = async (companyId) => {
    let company = await CompanyModel.getByCompanyId(companyId);
    if (!company)
        throw new Error(`Company id ${companyId} was not found`);

    if (!company.paymentData) {
        throw new Error(`No Payment daya for company id ${companyId}`);
    }

    let {email} = company;
    let {creditCardToken, customerTransactionId, authNum} = company.paymentData;
    creditCardToken = "0a1b8304-36e6-4a11-bdc7-b43c92fc2a25"; // TODO  Test CCToken!!! - debug only - remove it in production

    if (!customerTransactionId || !creditCardToken || !authNum)
        throw new Error(`customerTransactionId or creditCardToken or authNum is missing for company id ${companyId}`);

    const result = await iCreditManager.generateImmediatePayment(creditCardToken, authNum, customerTransactionId, email);
    console.log(JSON.stringify(result));
};

const run = async () => {
    try {
        await generateImmediatePayment(companyId);
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
};

run();
