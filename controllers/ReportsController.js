'use strict';
const express = require('express');
const router = express.Router();
const moment = require('moment');
const AppManager = require('../managers/AppManager');
const CompanyModel = require('../models/CompanyModel');
const ExcelManager = require('../managers/ExcelManager');
const MichpalManager = require('../managers/MichpalManager');
const jwtService = require("./jwtService");
const ShiftAnalyzer = require("../managers/ShiftAnalyzer");
const TaskModel = require("../models/TaskModel");
const {param, query } = require('express-validator/check');
const {EXCEL, MICHPAL} = require('../models/EReportFormat');
const {reject, routeWrapper} = require("./apiManager");

//GET /reports/download report
router.get('/download',
    [
        query('year').exists(),
        query('month').exists(),
    ],
    (req, res) => routeWrapper(req, res, async (req, res) => {

        const year = req.query.year || moment().format('YYYY');
        const month = req.query.month || moment().format('MM');
        const format = req.query.format || MICHPAL;

        const companyFromLocals = jwtService.getCompanyFromLocals(res);
        const company = await CompanyModel.getByCompanyId(companyFromLocals._id);

        const results = await Promise.all([
            AppManager.getShiftsInMonth(year, month, company),
            TaskModel.getByCompanyId(company._id)
        ]);

        let shifts = results[0];
        let tasks = results[1];

        if (format === EXCEL) {
            return handleExcelFormat(shifts, year, month, company, tasks, res);
        }
        else if (format === MICHPAL) {
            return handleMichpalFormat(shifts, year, month, company, tasks, res);
        }

        return reject("פורמט לא נתמך", 401);
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

        const shifts = await AppManager.getShiftsInMonth(year, month, company, userId);
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
            AppManager.getShiftsInMonth(year, month, company, userId),
            TaskModel.getByCompanyId(company._id)
            ])
            .then((results) => {
                let shifts = results[0];
                let tasks = results[1];

                return ShiftAnalyzer.createTasksReport(shifts, company.settings, tasks);
            });
    })
);

const handleExcelFormat = (shifts, year, month, company, tasks, res) => {
    let workbook = ExcelManager.createExcel(shifts, year, month, company, tasks);

    let fileName = ExcelManager.createTitleDate(year, month) + '.xlsx';
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
    return workbook.xlsx.write(res)
        .then(function () {
            res.end();
        });
};

const handleMichpalFormat = async (shifts, year, month, company, tasks, res) => {
    res.setHeader('Content-disposition', 'attachment; filename=theDocument.txt');
    res.setHeader('Content-type', 'text/plain');
    res.charset = 'UTF-8';

    const data = MichpalManager.createMonthlyReport(shifts, year, month, company);

    res.write(data);
    res.end();
};

module.exports = router;
