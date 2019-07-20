const express = require('express');
const CompanyModel = require("../models/CompanyModel");
const {reject, resolve} = require("./apiManager");
const UserModel = require("../models/UserModel");
const router = express.Router();
const routeWrapper = require("./apiManager").routeWrapper;
const jwtService = require("./jwtService");
const {Feature, addFeature} = require("./../managers/FeaturesManager");
const jwt = require('jsonwebtoken');
const config = require('../config');

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
