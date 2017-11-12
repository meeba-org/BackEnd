const ShiftAnalyzer = require("./ShiftAnalyzer");
const moment = require('moment');
var Excel = require('exceljs');

const createTitleDate = function (year, month) {
    return moment().year(year).month(month).format('MM-YYYY');
};

const createSheet = (workbook, year, month) => {
    let sheetTitleDate = createTitleDate(year, month);
    // create a sheet with the first row and column frozen
    let sheet = workbook.addWorksheet(sheetTitleDate, {views:[{xSplit: 1, ySplit:1}]});

    sheet.columns = [
        { header: 'שם עובד', key: 'employeeName', width: 40 },
        { header: '100% שעות', key: 'regularHours', width: 15 },
        { header: '125% שעות', key: 'extra125Hours', width: 15 },
        { header: '150% שעות', key: 'extra150Hours', width: 15 },
        { header: 'שכ"ע לשעה', key: 'hourFee', width: 15 },
        { header: 'סה"כ שעות', key: 'overallHours', width: 15 },
        { header: 'סה"כ שכר', key: 'payment', width: 15 },
    ];
    return sheet;
};

let createContent = function (shifts, worksheet) {
    if (!shifts || shifts.length == 0)
        return;

    let employees = ShiftAnalyzer.createEmployeeShiftsReports(shifts);

    employees.forEach((employee) => {
        worksheet.addRow({
            employeeName: employee.firstName,
            regularHours: employee.regularHours,
            extra125Hours: employee.extra125Hours,
            extra150Hours: employee.extra150Hours,
            overallHours: 100,//employee.regularHours + employee.extra125Hours + employee.extra150Hours,
        });
    });
};
let createWorkbook = function () {
    const workbook = new Excel.Workbook();
    workbook.creator = 'Meeba';
    workbook.created = new Date();
    return workbook;
};

const createExcel = (shifts, year, month, company) => {
    const workbook = createWorkbook();
    let worksheet = createSheet(workbook, year, month);
    createContent(shifts, worksheet);

    return workbook;
};

module.exports = {
    createExcel,
    createTitleDate
};

