'use strict';
const express = require('express');
const router = express.Router();
const moment = require('moment');
const ShiftModel = require('../models/ShiftModel');
const CompanyModel = require('../models/CompanyModel');
const ExcelManager = require('../managers/ExcelManager');
const jwtService = require("./jwtService");
const ShiftAnalyzer = require("../managers/ShiftAnalyzer");
const TaskModel = require("../models/TaskModel");
const routeWrapper = require("./apiManager").routeWrapper;
const {param, query } = require('express-validator/check');

//GET /reports/download report
router.get('/download',
    [
        query('year').exists(),
        query('month').exists(),
    ],
    (req, res) => routeWrapper(req, res, async (req, res) => {

        const year = req.query.year || moment().format('YYYY');
        const month = req.query.month || moment().format('MM');

        const companyFromLocals = jwtService.getCompanyFromLocals(res);
        const company = await CompanyModel.getByCompanyId(companyFromLocals._id);

        return Promise.all([
            getShiftsInMonth(year, month, company),
            TaskModel.getByCompanyId(company._id)
        ])
            .then((results) => {
                let shifts = results[0];
                let tasks = results[1];

                let workbook = ExcelManager.createExcel(shifts, year, month, company, tasks);

                let fileName = ExcelManager.createTitleDate(year, month) + '.xlsx';
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
                return workbook.xlsx.write(res)
                    .then(function () {
                        res.end();
                    });
            });
    })
);

//GET /reports/monthly report
router.get('/monthly',
    [
        query('year').exists(),
        query('month').exists(),
    ],
    (req, res) => routeWrapper(req, res, async (req, res) => {
        let userId = req.query.userId;

        const year = req.query.year || moment().format('YYYY');
        const month = req.query.month || moment().format('MM');

        const companyFromLocals = jwtService.getCompanyFromLocals(res);
        const company = await CompanyModel.getByCompanyId(companyFromLocals._id);

        const shifts = await getShiftsInMonth(year, month, company, userId);
        return ShiftAnalyzer.createEmployeeReports(shifts, company.settings);
    })
);

//GET /reports/tasks report
router.get('/tasks',
    [
        query('year').exists(),
        query('month').exists(),
    ],
    (req, res) => routeWrapper(req, res, async (req, res) => {
        let userId = req.query.userId;

        const year = req.query.year || moment().format('YYYY');
        const month = req.query.month || moment().format('MM');

        const companyFromLocals = jwtService.getCompanyFromLocals(res);
        const company = await CompanyModel.getByCompanyId(companyFromLocals._id);

        return Promise.all([
            getShiftsInMonth(year, month, company, userId),
            TaskModel.getByCompanyId(company._id)
            ])
            .then((results) => {
                let shifts = results[0];
                let tasks = results[1];

                return ShiftAnalyzer.createTasksReport(shifts, company.settings, tasks);
            });
    })
);

const getShiftsInMonth = (year, month, company, userId) => {
    if (!year)
        throw new Error('[ShiftModel.getShiftsInMonth] - year is not valid');
    if (!month)
        throw new Error('[ShiftModel.getShiftsInMonth] - month is not valid');

    // moment consider month in a zero based
    month = month - 1;
    const startOfMonth = company.settings.startOfMonth;
    let startDate = moment().year(year).month(month).date(startOfMonth).startOf('day');
    let endDate = moment().year(year).month(month + 1).date(startOfMonth).startOf('day');

    return ShiftModel.getShiftsBetween(company, startDate, endDate, userId);
};

module.exports = router;
