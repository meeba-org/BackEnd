const ShiftAnalyzer = require("./ShiftAnalyzer");
const moment = require('moment');
var Excel = require('exceljs');

const createTitleDate = function (year, month) {
    return moment().year(year).month(month).format('MM-YYYY');
};

const createSheet = (workbook, year, month) => {
    let sheetTitleDate = createTitleDate(year, month);
    // create a sheet with the first row and column frozen
    let sheet = workbook.addWorksheet(sheetTitleDate, {views:[ {state: 'frozen', xSplit: 1, ySplit:1, rightToLeft: true} ]});

    sheet.columns = [
        { header: 'שם עובד', key: 'employeeName', width: 30, style: {alignment: {horizontal: 'right'} } },
        { header: '100% שעות', key: 'regularHours', width: 13, style: {alignment: {horizontal: 'right'} }  },
        { header: '125% שעות', key: 'extra125Hours', width: 13, style: {alignment: {horizontal: 'right'} }  },
        { header: '150% שעות', key: 'extra150Hours', width: 13, style: {alignment: {horizontal: 'right'} }  },
        { header: 'שכ"ע לשעה', key: 'hourFee', width: 13, style: {alignment: {horizontal: 'right'} }  },
        { header: 'סה"כ שעות', key: 'overallHours', width: 13, style: {alignment: {horizontal: 'right'} }  },
        { header: 'סה"כ שכר', key: 'payment', width: 13, style: {alignment: {horizontal: 'right'} }  },
    ];

    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1'].map(key => {
        sheet.getCell(key).fill = {
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'cccccc'}
        };
    });

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
            overallHours: employee.overallHours,
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

