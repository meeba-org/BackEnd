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
const axios = require('axios');

router.get('/',
    (req, res) => routeWrapper(req, res, (req, res) => {
        let company = jwtService.getCompanyFromLocals(res);
        let user = jwtService.getUserFromLocals(res);
        if (!company || !user)
            return reject('משתמש לא ידוע - נסה להיכנס מחדש לחשבון');

        let data = {
            "GroupPrivateToken":"a1408bfc-18da-49dc-aa77-d65870f7943e",
            "Items":[{
                "Quantity":1,
                "UnitPrice":100,
                "Description": "מנוי חודשי לאתר מיבא"
            }],
            "RedirectURL":"http://www.ynet.co.il",
            "ExemptVAT":true,
            "MaxPayments":1,
            "SaleType": 3, // איסוף כרטיס בלבד - ללא גבייה
            "EmailAddress": user.email,
            "IPNURL": "https://meeba.org.il/api/general/ipn",
            "Custom1": company._id // Storing this in order to link the return transaction token to the company
        };

        return axios.post('https://testicredit.rivhit.co.il/API/PaymentPageRequest.svc/GetUrl',data)
            .then(response => {
                console.log(response);
                PaymentModel.createPayment(response.data); // No need to wait for it
                return response.data.URL;
            });
    })
);

router.post('/',
    (req, res) => routeWrapper(req, res, (req, res) => {
        let company = jwtService.getCompanyFromLocals(res);
        let user = jwtService.getUserFromLocals(res);
        if (!company || !user)
            return reject('משתמש לא ידוע - נסה להיכנס מחדש לחשבון');

        addFeature(company, Feature.Premium);
        return CompanyModel.updateCompany(company)
            .then(() => UserModel.getByUserId(user._id))
            .then((user) => {

                // use the jsonwebtoken package to create the token and respond with it
                let token = jwt.sign(user.toObject(), config.secret);
                return resolve({
                    user,
                    token
                });
            });
    })
);

module.exports = router;
