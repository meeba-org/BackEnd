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
const axios = require('axios');

const EPaymentStatus = {
    START: 0,
    PAYMENT_DONE: 1,
};

router.get('/',
    (req, res) => routeWrapper(req, res, (req, res) => {
        let company = jwtService.getCompanyFromLocals(res);
        let user = jwtService.getUserFromLocals(res);
        if (!company || !user)
            return reject('משתמש לא ידוע - נסה להיכנס מחדש לחשבון');

        let data = {
            "GroupPrivateToken":"f930c192-ea2b-4e53-8de8-27d3a74fab66",
            "Items":[{
                "Quantity":1,
                "UnitPrice":100,
                "Description": "מנוי חודשי לאתר מיבא"
            }],
            "RedirectURL":"https://meeba.org.il/paymentSuccess",
            "ExemptVAT":true,
            "MaxPayments":1,
        };

        return axios.post('https://testicredit.rivhit.co.il/API/PaymentPageRequest.svc/GetUrl',data)
            .then(response => {
                let {URL, PrivateSaleToken, PublicSaleToken} = response.data;
                const payment = {
                    user: user._id,
                    url: URL,
                    privateSaleToken: PrivateSaleToken,
                    publicSaleToken: PublicSaleToken,
                    status: EPaymentStatus.START
                };
                PaymentModel.createPayment(payment); // No need to wait for it
                return response.data.URL;
            });
    })
);

const getPayment = (userId, publicSaleToken) => {
    return PaymentModel.getByUserIdAndToken(userId, publicSaleToken);
};

const updatePaymentFinished = (payment) => {
    payment.status = EPaymentStatus.PAYMENT_DONE;
    return PaymentModel.updatePayment(payment);
};

router.post('/',
    [
        body('token').exists(),
    ],
    (req, res) => routeWrapper(req, res, (req, res) => {
        let company = jwtService.getCompanyFromLocals(res);
        let user = jwtService.getUserFromLocals(res);
        let {token} = req.body; // This is the payment 3rd party token
        if (!company || !user)
            return reject('משתמש לא ידוע - נסה להיכנס מחדש לחשבון');

        return getPayment(user._id, token)
            .then(payment => {
                if (!payment)
                    return reject("פרטי תשלום לא תקינים");

                // Its valid!
                addFeature(company, Feature.Premium);
                return updatePaymentFinished(payment)
                    .then(() => CompanyModel.updateCompany(company))
                    .then(() => UserModel.getByUserId(user._id))
                    .then((user) => {

                        // use the jsonwebtoken package to create the token and respond with it
                        let token = jwt.sign(user.toObject(), config.secret); // This is meeba token
                        return resolve({
                            user,
                            token
                        });
                    });
            });
    })
);

module.exports = router;
