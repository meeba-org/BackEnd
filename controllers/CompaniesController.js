'use strict';
const CompanyModel = require('../models/CompanyModel');
const express = require('express');
const routeWrapper = require("./apiManager").routeWrapper;
const router = express.Router();
const { body, param } = require('express-validator/check');

//GET /companies/{id} company
router.get('/:id',
    [
        param('id').exists(),
    ],
    (req, res) => routeWrapper(req, res, (req, res) => {
        const id = req.params.id;

        return CompanyModel.getByCompanyId(id)
            .then((company) => {
                if (company)
                    return res.status(200).json(company);
                return Promise.reject("Company with id " + id + " does not exist");
            });
    })
);

//GET /companies companies
router.get('/',
    (req, res) => routeWrapper(req, res, (req, res) => {
        return CompanyModel.getAllCompanies();
    })
);

//POST /companies company
router.post('/',
    (req, res) => routeWrapper(req, res, (req, res) => {
        return CompanyModel.createCompany(req.body);
    })
);

//PUT /companies company
router.put('/',
    [
        body('_id').exists()
    ],
    (req, res) => routeWrapper(req, res, (req, res) => {
        let newCompany = req.body;

        return CompanyModel.updateCompany(newCompany);
    })
);

//DELETE /companies/{id} companyId
router.delete('/:id',
    [
        param('id').exists(),
    ],
    (req, res) => routeWrapper(req, res, (req, res) => {
        const id = req.params.id;

        return CompanyModel.deleteCompany(id)
            .then(() => res.status(204).send());
    })
);

module.exports = router;
