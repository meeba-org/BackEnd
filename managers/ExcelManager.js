const ShiftAnalyzer = require("./ShiftAnalyzer");
const moment = require('moment');
var Excel = require('exceljs');

const createTitleDate = function (year, month) {
    return moment().year(year).month(month-1).format('MM-YYYY');
};

let setHeaderColor = function (sheet) {
    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1'].map(key => {
        sheet.getCell(key).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: 'cccccc'}
        };
    });
};

function createSummaryColumns(sheet) {
    sheet.columns = [
        {header: 'שם עובד', key: 'employeeName', width: 30, style: {alignment: {horizontal: 'right'}}},
        {header: '100% שעות', key: 'regularHours', width: 13, style: {alignment: {horizontal: 'right'}}},
        {header: '125% שעות', key: 'extra125Hours', width: 13, style: {alignment: {horizontal: 'right'}}},
        {header: '150% שעות', key: 'extra150Hours', width: 13, style: {alignment: {horizontal: 'right'}}},
        {header: '175% שעות', key: 'extra175Hours', width: 13, style: {alignment: {horizontal: 'right'}}},
        {header: '200% שעות', key: 'extra200Hours', width: 13, style: {alignment: {horizontal: 'right'}}},
        {header: 'שכ"ע לשעה', key: 'hourWage', width: 13, style: {alignment: {horizontal: 'right'}}},
        {header: 'סה"כ שעות', key: 'overallHours', width: 13, style: {alignment: {horizontal: 'right'}}},
        {header: 'משמרות', key: 'shiftsCount', width: 13, style: {alignment: {horizontal: 'right'}}},
        {header: 'נסיעות יומי', key: 'transportation', width: 13, style: {alignment: {horizontal: 'right'}}},
        {header: 'סה"כ נסיעות', key: 'overallTransportation', width: 13, style: {alignment: {horizontal: 'right'}}},
        {header: 'סה"כ שכר', key: 'overallSalary', width: 13, style: {alignment: {horizontal: 'right'}}},
    ];

    setHeaderColor(sheet);
}

const addSummarySheet = (workbook, company, shifts) => {
    // create a sheet with the first row and column frozen
    let sheet = workbook.addWorksheet("סיכום", {views:[ {state: 'frozen', xSplit: 1, ySplit:1, rightToLeft: true} ]});

    createSummaryColumns(sheet);
    createSummaryContent(sheet, shifts, company.settings);
};

let createSummaryContent = function (worksheet, shifts, settings) {
    if (!shifts || shifts.length == 0)
        return;

    let employees = ShiftAnalyzer.createEmployeeShiftsReports(shifts, settings);

    employees.forEach((employee) => {
        worksheet.addRow({
            employeeName: employee.firstName,
            regularHours: employee.regularHours,
            extra125Hours: employee.extra125Hours,
            extra150Hours: employee.extra150Hours,
            extra175Hours: employee.extra175Hours,
            extra200Hours: employee.extra200Hours,
            overallHours: employee.overallHours,
            hourWage: employee.hourWage,
            shiftsCount: employee.shiftsCount,
            transportation: employee.transportation,
            overallTransportation: employee.overallTransportation,
            overallSalary: employee.overallSalary,
        });
    });
};

function createShiftsPerEmployeeColumns(sheet) {
    sheet.columns = [
        {header: 'שם עובד', key: 'employeeName', width: 30, style: {alignment: {horizontal: 'right'}}},
        {header: 'תאריך', key: 'clockInDate', width: 20, style: {alignment: {horizontal: 'right'}}},
        {header: 'שעת התחלה', key: 'clockInTime', width: 20, style: {alignment: {horizontal: 'right'}}},
        {header: 'שעת סיום', key: 'clockOutTime', width: 20, style: {alignment: {horizontal: 'right'}}},
    ];

    setHeaderColor(sheet);
}

let createShiftsPerEmployeeContent = function (worksheet, shifts, settings) {
    if (!shifts || shifts.length === 0)
        return;

    let employees = ShiftAnalyzer.createEmployeeShiftsReports(shifts, settings);

    employees.forEach((employee) => {
        worksheet.addRow({employeeName: employee.firstName});

        if (employee.shifts) {
            employee.shifts.forEach((shift) => {
                worksheet.addRow({
                    clockInDate: calcClockInDate(shift),
                    clockInTime: calcClockInTime(shift),
                    clockOutTime: calcClockOutTime(shift),
                });
            });
        }
    });
};

const calcClockInDate = (shift) => {
    if (!shift || !shift.clockInTime)
        return "-";

    return moment(shift.clockInTime).format("DD/MM/YYYY");
};

const calcClockInTime = (shift) => {
    if (!shift || !shift.clockInTime)
        return "-";

    return moment(shift.clockInTime).format("HH:mm");
};

const calcClockOutTime = (shift) => {
    if (!shift || !shift.clockOutTime)
        return "-";

    return moment(shift.clockOutTime).format("HH:mm");
};

const addShiftsPerEmployeeSheet = (workbook, company, shifts) => {
    // create a sheet with the first row and column frozen
    let sheet = workbook.addWorksheet("משמרות לפי עובד", {views:[ {state: 'frozen', xSplit: 1, ySplit:1, rightToLeft: true} ]});

    createShiftsPerEmployeeColumns(sheet);
    createShiftsPerEmployeeContent(sheet, shifts, company.settings);
    return sheet;
};

let createWorkbook = function () {
    const workbook = new Excel.Workbook();
    workbook.creator = 'Meeba';
    workbook.created = new Date();
    return workbook;
};

const createExcel = (shifts, year, month, company) => {
    const workbook = createWorkbook();
    addSummarySheet(workbook, company, shifts, year, month);
    addShiftsPerEmployeeSheet(workbook, company, shifts, year, month );

    return workbook;
};

module.exports = {
    createExcel,
    createTitleDate
};

