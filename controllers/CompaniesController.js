'use strict';
const CompanyModel = require('../models/CompanyModel');
const express = require('express');
const TaskModel = require("../models/TaskModel");
const {reject, resolve} = require("./apiManager");
const routeWrapper = require("./apiManager").routeWrapper;
const router = express.Router();
const { body, param } = require('express-validator/check');

//GET /companies/{id} company
/* Not in used */
router.get('/:id',
    [
        param('id').exists(),
    ],
    (req, res) => routeWrapper(req, res, (req, res) => {
        const id = req.params.id;

        return CompanyModel.getByCompanyId(id)
            .then((company) => {
                if (company)
                    return resolve(company);
                return reject("Company with id " + id + " does not exist", 401);
            });
    })
);

//GET /companies companies
/* Not in used */
router.get('/',
    (req, res) => routeWrapper(req, res, (req, res) => {
        return CompanyModel.getAllCompanies();
    })
);

//POST /companies company
/* Not in used */
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
/* Not in used */
router.delete('/:id',
    [
        param('id').exists(),
    ],
    (req, res) => routeWrapper(req, res, (req, res) => {
        const id = req.params.id;

        return CompanyModel.deleteCompany(id)
            .then(() => id);
    })
);

//PUT /companies company
router.put('/toggleIA',
    [
        body('company').exists(),
        body('enable').isBoolean().exists(),
    ],
    (req, res) => routeWrapper(req, res, async (req, res) => {
        let { company, enable } = req.body;

        const settings = {
            ...company.settings,
            "enableAbsenceDays": enable,
            "enableTasks": enable,
            "enableInnovativeAuthority": enable
        };
        company.settings = settings;
        
        const updatedCompany = await CompanyModel.updateCompany(company);
        const tasks = await TaskModel.getByCompanyId(company._id);
        
        return {
            company: updatedCompany,
            tasks
        };
    })
);

module.exports = router;
