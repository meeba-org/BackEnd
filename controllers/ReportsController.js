'use strict';
const express = require('express');
const router = express.Router();
const moment = require('moment');
const ShiftModel = require('../models/ShiftModel');
const ExcelManager = require('../managers/ExcelManager');
const jwtService = require("./jwtService");
const ShiftAnalyzer = require("../managers/ShiftAnalyzer");

//GET /reports/download report
router.get('/download', (req, res) => {
    req.checkQuery('year', 'year is required').notEmpty();
    req.checkQuery('month', 'month is required').notEmpty();

    const year = req.query.year || moment().format('YYYY');
    const month = req.query.month || moment().format('MM');

    req.getValidationResult()
        .then(function (result) {
            result.throw();

            const company = jwtService.getCompanyFromLocals(res);

            ShiftModel.getShiftsInMonth(year, month, company)
                .then((shifts) => {
                    let workbook = ExcelManager.createExcel(shifts, year, month, company);

                    let fileName = ExcelManager.createTitleDate(year, month) + '.xlsx';
                    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                    res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
                    return workbook.xlsx.write(res)
                        .then(function() {
                            res.end();
                        });
                })
                .catch((err) => res.status(500).json({message: err.message}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

//GET /reports/download report
router.get('/monthly', (req, res) => {
    req.checkQuery('year', 'year is required').notEmpty();
    req.checkQuery('month', 'month is required').notEmpty();
    let userId = req.query.userId;

    const year = req.query.year || moment().format('YYYY');
    const month = req.query.month || moment().format('MM');

    req.getValidationResult()
        .then(function (result) {
            result.throw();

            const company = jwtService.getCompanyFromLocals(res);

            ShiftModel.getShiftsInMonth(year, month, company, userId)
                .then((shifts) => {

                    if (shifts) {
                        let employeesMonthlyReports = ShiftAnalyzer.createEmployeeShiftsReports(shifts, company.settings);
                        return res.status(200).json(employeesMonthlyReports);
                    }
                })
                .catch((err) => res.status(500).json({message: err.message}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

module.exports = router;
