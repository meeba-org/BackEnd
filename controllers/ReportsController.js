'use strict';
const express = require('express');
const router = express.Router();
const moment = require('moment');
const ShiftModel = require('../models/ShiftModel');
const CompanyModel = require('../models/CompanyModel');
const ExcelManager = require('../managers/ExcelManager');
const jwtService = require("./jwtService");
const ShiftAnalyzer = require("../managers/ShiftAnalyzer");
const routeWrapper = require("./apiManager").routeWrapper;
const {param, query } = require('express-validator/check');

//GET /reports/download report
router.get('/download',
    [
        query('year').exists(),
        query('month').exists(),
    ],
    (req, res) => routeWrapper(req, res, (req, res) => {

        const year = req.query.year || moment().format('YYYY');
        const month = req.query.month || moment().format('MM');

        let user = jwtService.getUserFromLocals(res);
        return CompanyModel.getByCompanyId(user.company._id)
            .then(company => {
                return ShiftModel.getShiftsInMonth(year, month, company)
                    .then((shifts) => {
                        let workbook = ExcelManager.createExcel(shifts, year, month, company);

                        let fileName = ExcelManager.createTitleDate(year, month) + '.xlsx';
                        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                        res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
                        return workbook.xlsx.write(res)
                            .then(function () {
                                res.end();
                            });
                    })
            })
    })
);

//GET /reports/monthly report
router.get('/monthly',
    [
        query('year').exists(),
        query('month').exists(),
    ],
    (req, res) => routeWrapper(req, res, (req, res) => {
        let userId = req.query.userId;

        const year = req.query.year || moment().format('YYYY');
        const month = req.query.month || moment().format('MM');

        const company = jwtService.getCompanyFromLocals(res);

        return ShiftModel.getShiftsInMonth(year, month, company, userId)
            .then((shifts) => {

                if (shifts) {
                    return ShiftAnalyzer.createEmployeeShiftsReports(shifts, company.settings);
                }
            });
    })
);

//GET /reports/tasks report
router.get('/tasks',
    [
        query('year').exists(),
        query('month').exists(),
    ],
    (req, res) => routeWrapper(req, res, (req, res) => {
        let userId = req.query.userId;

        const year = req.query.year || moment().format('YYYY');
        const month = req.query.month || moment().format('MM');

        const company = jwtService.getCompanyFromLocals(res);

        return ShiftModel.getShiftsInMonth(year, month, company, userId)
            .then((shifts) => {

                if (shifts) {
                    return ShiftAnalyzer.createEmployeeShiftsReports(shifts, company.settings);
                }
            });
    })
);

module.exports = router;
