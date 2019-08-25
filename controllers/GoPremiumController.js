const express = require('express');
const CompanyModel = require("../models/CompanyModel");
const {reject, resolve} = require("./apiManager");
const UserModel = require("../models/UserModel");
const PaymentModel = require("../models/PaymentModel");
const router = express.Router();
const routeWrapper = require("./apiManager").routeWrapper;
const jwtService = require("./jwtService");
const {Feature, addFeature} = require("./../managers/FeaturesManager");
const jwt = require('jsonwebtoken');
const config = require('../config');
const { body } = require('express-validator/check');
const EPlanType = require('../models/EPlanType');
const {createIframeUrl} = require("../managers/iCreditManager");


const EPaymentStatus = {
    START: 0,
    PAYMENT_DONE: 1,
};


// Getting iCredit payment url
router.get('/',
    (req, res) => routeWrapper(req, res, async (req, res) => {
        let company = jwtService.getCompanyFromLocals(res);
        let userFromToken = jwtService.getUserFromLocals(res);
        let user = await UserModel.getByUserId(userFromToken._id);

        if (!company || !user)
            return reject('משתמש לא ידוע - נסה להיכנס מחדש לחשבון');

        return await createIframeUrl(user, company);
    })
);

const getPayment = (companyId, publicSaleToken) => {
    return PaymentModel.getByCompanyIdAndToken(companyId, publicSaleToken);
};

const updatePaymentFinished = (payment) => {
    payment.status = EPaymentStatus.PAYMENT_DONE;
    return PaymentModel.updatePayment(payment);
};

/**
 * Given a user finished the payment form
 * Then:
 * 1. User is given a premium feature
 * 2. An updated meeba token is sent back to client
 */
router.post('/',
    [
        body('token').exists(),
    ],
    (req, res) => routeWrapper(req, res, async (req, res) => {
        let company = jwtService.getCompanyFromLocals(res);
        let user = jwtService.getUserFromLocals(res);
        let {token} = req.body; // This is the payment 3rd party token
        if (!company || !user)
            return reject('משתמש לא ידוע - נסה להיכנס מחדש לחשבון');

        let payment = await getPayment(company._id, token);
        if (!payment)
            return reject("פרטי תשלום לא תקינים");

        // Its valid!
        addFeature(company, Feature.Premium);
        company.plan = EPlanType.Premium;

        await updatePaymentFinished(payment);
        await CompanyModel.updateCompany(company);
        const updatedUser = await UserModel.getByUserId(user._id);

        // use the jsonwebtoken package to create the token and respond with it
        let meebaToken = jwt.sign(updatedUser.toObject(), config.secret); // This is meeba token
        return resolve({
            user,
            meebaToken
        });
    })
);

module.exports = router;
