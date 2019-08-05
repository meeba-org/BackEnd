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
            "GroupPrivateToken":"f930c192-ea2b-4e53-8de8-27d3a74fab66",
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
            "IPNURL": "https://meeba.org.il/api/goPremium/ipn"
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

router.post('/ipn',
    (req, res) => routeWrapper(req, res, (req, res) => {
        console.log(res);
    })
);

module.exports = router;
