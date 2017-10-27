'use strict';
const CompanyModel = require('../models/CompanyModel');
const express = require('express');
const router = express.Router();

//GET /companies/{id} company
router.get('/:id', (req, res) => {
    req.checkParams('id', 'id is required').notEmpty();

    req.getValidationResult()
        .then(function (result) {
            result.throw();

            const id = req.params.id;

            CompanyModel.getByCompanyId(id)
                .then((company) => {
                    if (company)
                        return res.status(200).json(company);
                    return Promise.reject("Company with id " + id + " does not exist");
                })
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

//GET /companies companies
router.get('/', (req, res) => {
    CompanyModel.getAllCompanies()
        .then((companies) => res.status(200).json({companies: companies}))
        .catch((err) => res.status(500).json({message: err}));
});

//POST /companies company
router.post('/', (req, res) => {

    req.getValidationResult()
        .then(function (result) {
            result.throw();
            CompanyModel.createCompany(req.body)
                .then((company) => res.status(200).json({company: company}))
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

//PUT /companies company
router.put('/', (req, res) => {

    req.getValidationResult()
        .then(function (result) {
            result.throw();
            CompanyModel.updateCompany(req.body)
                .then((company) => res.status(200).json({company: company}))
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

//DELETE /companies/{id} companyId
router.delete('/:id', (req, res) => {
    req.checkParams('id', 'int id is required').notEmpty().isInt();

    return req.getValidationResult()
        .then(function (result) {
            result.throw();

            const id = req.params.id;

            return CompanyModel.deleteCompany(id)
                .then(() => {
                    return res.status(204).send();
                })
                .catch((err) => {
                    return res.status(500).json({message: err});
                });
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

module.exports = router;
