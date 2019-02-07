const {FeatureName, isFeatureEnable} = require("./FeaturesManager");

const ShiftAnalyzer = require("./ShiftAnalyzer");
const moment = require('moment');
const Excel = require('exceljs');
const getHolidayName = require("./HolidayAnalyzer").getHolidayName;
const isHolidayEvening = require("./HolidayAnalyzer").isHolidayEvening;
const isHoliday = require("./HolidayAnalyzer").isHoliday;
const RowBorderStyle = {
    top: { style: "hair" },
    left: { style: "medium" },
    bottom: { style: "hair" },
    right: { style: "medium" }
};
const HeaderBorderStyle = {
    top: { style: "medium" },
    left: { style: "medium" },
    bottom: { style: "medium" },
    right: { style: "medium" }
};
moment.locale('he');

const createTitleDate = function (year, month) {
    return moment().year(year).month(month-1).format('MM-YYYY');
};

setSummaryHeaderColor = function(sheet) {
    setHeaderColor(sheet);
};

setEmployeeHeaderColor = function(sheet) {
    setHeaderColor(sheet);
};

let setHeaderColor = function (sheet) {
    let headerRow = sheet.getRow(1);

    setRowBold(headerRow);
    markBorders(sheet, headerRow, HeaderBorderStyle);
};

let setRowBold = function (row) {
    row.font = {bold: true};
};

function createSummaryColumns(sheet, company) {
    sheet.columns = [
        {header: 'שם עובד', key: 'employeeName', width: 20, style: {alignment: {horizontal: 'right'}}},
        {header: 'ת.ז.', key: 'employeeUid', width: 13, style: {alignment: {horizontal: 'center'}}},
        {header: '100% שעות', key: 'regularHours', width: 11, style: {alignment: {horizontal: 'center'}}},
        {header: '125% שעות', key: 'extra125Hours', width: 11, style: {alignment: {horizontal: 'center'}}},
        {header: '150% שעות', key: 'extra150Hours', width: 11, style: {alignment: {horizontal: 'center'}}},
        {header: '175% שעות', key: 'extra175Hours', width: 11, style: {alignment: {horizontal: 'center'}}},
        {header: '200% שעות', key: 'extra200Hours', width: 11, style: {alignment: {horizontal: 'center'}}},
        {header: 'שכ"ע לשעה', key: 'hourWage', width: 11, style: {alignment: {horizontal: 'center'}}},
        {header: 'סה"כ שעות', key: 'overallHours', width: 11, style: {alignment: {horizontal: 'center'}}},
        {header: 'משמרות', key: 'shiftsCount', width: 11, style: {alignment: {horizontal: 'center'}}},
        {header: 'נסיעות יומי', key: 'transportation', width: 11, style: {alignment: {horizontal: 'center'}}},
        {header: 'סה"כ נסיעות', key: 'monthlyCommuteCost', width: 11, style: {alignment: {horizontal: 'center'}}},
        {header: 'תוספות', key: 'monthlyExtraPay', width: 11, style: {alignment: {horizontal: 'center'}}},
        {header: 'סה"כ שכר', key: 'overallSalary', width: 11, style: {alignment: {horizontal: 'center'}}},
    ];

    setSummaryHeaderColor(sheet, company);
}

const addSummarySheet = (workbook, company, employees) => {
    // create a sheet with the first row and column frozen
    let sheet = addWorksheet(workbook, "סיכום");

    createSummaryColumns(sheet, company);
    createSummaryContent(sheet, employees);
};

let createSummaryContent = function (sheet, employees) {

    employees.forEach((employee) => {
        let addedRow = sheet.addRow({
            employeeName: employee.fullName,
            employeeUid: employee.uid,
            regularHours: employee.regularHours,
            extra125Hours: employee.extra125Hours,
            extra150Hours: employee.extra150Hours,
            extra175Hours: employee.extra175Hours,
            extra200Hours: employee.extra200Hours,
            overallHours: employee.overallHours,
            hourWage: employee.hourWage,
            shiftsCount: employee.shiftsCount,
            transportation: employee.transportation,
            monthlyCommuteCost: employee.monthlyCommuteCost,
            monthlyExtraPay: employee.monthlyExtraPay,
            overallSalary: employee.overallSalary,
        });

        markBorders(sheet, addedRow, RowBorderStyle);
    });
};

function createShiftsPerEmployeeColumns(sheet, company) {
    sheet.columns = [
        {header: 'תאריך', key: 'date', width: 13, style: {alignment: {horizontal: 'center'}}},
        {header: 'יום', key: 'dayInWeek', width: 7, style: {alignment: {horizontal: 'center'}}},
        {header: 'שעת התחלה', key: 'clockInTime', width: 13, style: {alignment: {horizontal: 'center'}}},
        {header: 'שעת סיום', key: 'clockOutTime', width: 13, style: {alignment: {horizontal: 'center'}}},
        {header: 'שעות (עשרוני)', key: 'shiftLength', width: 13, style: {alignment: {horizontal: 'center'}}},
        {header: '100%', key: 'regularHours', width: 7, style: {alignment: {horizontal: 'center'}}},
        {header: '125%', key: 'extra125Hours', width: 7, style: {alignment: {horizontal: 'center'}}},
        {header: '150%', key: 'extra150Hours', width: 7, style: {alignment: {horizontal: 'center'}}},
        {header: '175%', key: 'extra175Hours', width: 7, style: {alignment: {horizontal: 'center'}}},
        {header: '200%', key: 'extra200Hours', width: 7, style: {alignment: {horizontal: 'center'}}},
    ];

    if (isFeatureEnable(company, FeatureName.CommuteModule)) {
        sheet.columns = sheet.columns.concat([
            {header: 'החזר נסיעות', key: 'publicTransportation', width: 10, style: {alignment: {horizontal: 'center'}}},
            // {header: 'שעות נסיעה', key: 'commuteHours', width: 10, style: {alignment: {horizontal: 'center'}}},
            // {header: 'ק"מ', key: 'kmDriving', width: 10, style: {alignment: {horizontal: 'center'}}},
            // {header: 'חניה', key: 'parkingCost', width: 10, style: {alignment: {horizontal: 'center'}}},
            // {header: 'נסיעות יומי', key: 'commuteCost', width: 10, style: {alignment: {horizontal: 'center'}}},
        ]);
    }

    sheet.columns = sheet.columns.concat([
        {header: 'תוספות', key: 'monthlyExtraPay', width: 7, style: {alignment: {horizontal: 'center'}}},
        {header: 'הערות', key: 'comment', width: 30, style: {alignment: {horizontal: 'right'}}},
    ]);

    setEmployeeHeaderColor(sheet, company);
}

function shouldAddCommuteData(company, shift) {
    return isFeatureEnable(company, FeatureName.CommuteModule) && !!shift.commuteCost;
}

function addCommuteData(company, row, shift) {
    // let kmPay = company.settings.kmPay;
    // let hourCommutePay = company.settings.hourCommutePay;

    row = {
        ...row,
        publicTransportation: shift.commuteCost.publicTransportation,
        // commuteHours: shift.commuteCost.commuteHours,
        // kmDriving: shift.commuteCost.kmDriving,
        // parkingCost: shift.commuteCost.parkingCost,
        // commuteCost: shift.commuteCost.publicTransportation
            // shift.commuteCost.commuteHours * hourCommutePay +
            // shift.commuteCost.kmDriving * kmPay +
            // shift.commuteCost.parkingCost
    };

    return row;
}

let createShiftsPerEmployeeContent = function (sheet, employee, company, year, month ) {
    if (!employee.shifts || employee.shifts.length === 0)
        return;

    let startOfMonth = moment().year(year).month(month - 1).startOf('month');
    let endOfMonth = moment().year(year).month(month - 1).endOf('month');

    for (let m = moment(startOfMonth); m.isBefore(endOfMonth); m.add(1, 'days')) {
        let row = {
            date: m.format("DD/MM/YYYY"),
            dayInWeek: calcDayInWeek(m),
        };

        let shifts = getShifts(employee.shifts, m);

        if (!shifts || shifts.length === 0) {
            addDayRow(sheet, row, m);
            continue;
        }

        for (let i = 0 ; i < shifts.length ; i++)
        {
            let shift = shifts[i];

            let hoursAnalysis = shift.hoursAnalysis;
            row = {
                date: i === 0 ? row.date : "",
                dayInWeek: i === 0 ? row.dayInWeek : "",
                clockInTime: calcClockInTime(shift),
                clockOutTime: calcClockOutTime(shift),
                shiftLength: hoursAnalysis.shiftLength || "",
                regularHours: hoursAnalysis.regularHours || "",
                extra125Hours: hoursAnalysis.extra125Hours || "",
                extra150Hours: hoursAnalysis.extra150Hours || "",
                extra175Hours: hoursAnalysis.extra175Hours || "",
                extra200Hours: hoursAnalysis.extra200Hours || "",
                monthlyExtraPay: shift.extraPay || "",
            };

            if (shouldAddCommuteData(company, shift)) {
                row = addCommuteData(company, row, shift);
            }

            addDayRow(sheet, row, shift.clockInTime);
        }
    }
};

const createShiftsPerEmployeeTotalSection = (sheet, employee) => {
    let totalRowData = {
        clockOutTime: 'סה"כ:',
        shiftLength: employee.shiftLength || "",
        regularHours: employee.regularHours || "",
        extra125Hours: employee.extra125Hours || "",
        extra150Hours: employee.extra150Hours || "",
        extra175Hours: employee.extra175Hours || "",
        extra200Hours: employee.extra200Hours || "",
    }

    let totalRow = sheet.addRow(totalRowData);
    setRowBold(totalRow);

    let transportationData = {
        clockOutTime: 'נסיעות:',
        shiftLength: employee.monthlyCommuteCost ,
    }
    let transportationRow = sheet.addRow(transportationData);
    setRowBold(transportationRow);

    let extraPayData = {
        clockOutTime: 'תוספות:',
        shiftLength: employee.monthlyExtraPay ,
    }
    let extraPayDataRow = sheet.addRow(extraPayData);
    setRowBold(extraPayDataRow);

    let salaryData = {
        clockOutTime: 'שכר:',
        shiftLength: employee.overallSalary ,
    }
    let salaryRow = sheet.addRow(salaryData);
    setRowBold(salaryRow);
};

function markRowAsHoliday(sheet, addedRow) {
    sheet.columns.map(column => {
        addedRow.getCell(column.key).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: 'e6e6e6'}
        };
    });
}

let setHolidayName = function (addedRow, holidayName) {
    addedRow.getCell('comment').value = holidayName;
};

let markWarnings = function (addedRow) {
    if (addedRow.getCell('clockOutTime').value === '-') {
        addedRow.getCell('clockOutTime').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: 'ffd199'}
        };
    }
};

function addDayRow(sheet, row, day) {
    let addedRow = sheet.addRow(row);

    if (isHoliday(day) || isHolidayEvening(day)) {
        let holidayName = getHolidayName(day);
        setHolidayName(addedRow, holidayName);
        markRowAsHoliday(sheet, addedRow);
    }

    markWarnings(addedRow);
    markBorders(sheet, addedRow, RowBorderStyle);
}

const markBorders = (sheet, row, borderStyle) => {
    sheet.columns.map(column => {
        row.getCell(column.key).border = borderStyle;
    });
}

function getShifts(shifts, m) {
    let relevantShifts = [];
    for (const shift of shifts) {
        if (moment(shift.clockInTime).isSame(m, "day"))
            relevantShifts.push(shift);
    }

    return relevantShifts;
}

const calcClockInDate = (shift) => {
    if (!shift || !shift.clockInTime)
        return "-";

    return moment(shift.clockInTime).format("DD/MM/YYYY");
};

const calcDayInWeek = (m) => {
    if (!m)
        return "-";

    return moment(m).format("dddd");
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

let addWorksheet = function (workbook, title) {
    return workbook.addWorksheet(title, {
        views: [{
            state: 'frozen',
            xSplit: 1,
            ySplit: 1,
            rightToLeft: true
        }]
    });
};

const addShiftsPerEmployeeSheets = (workbook, company, employees, year, month) => {
    employees.forEach((employee) => {
        // create a sheet with the first row and column frozen
        let sheet = addWorksheet(workbook, employee.fullName);

        createShiftsPerEmployeeColumns(sheet, company);
        createShiftsPerEmployeeContent(sheet, employee, company, year, month );
        createShiftsPerEmployeeTotalSection(sheet, employee);
    });

}

let createWorkbook = function () {
    const workbook = new Excel.Workbook();
    workbook.creator = 'Meeba';
    workbook.created = new Date();
    return workbook;
};

const processShiftsToEmployees = function (shifts, company) {
    if (!shifts || shifts.length === 0)
        return [];
    return ShiftAnalyzer.createEmployeeShiftsReports(shifts, company.settings);
};

const createExcel = (shifts, year, month, company) => {
    const workbook = createWorkbook();
    let employees = processShiftsToEmployees(shifts, company);

    addSummarySheet(workbook, company, employees);
    addShiftsPerEmployeeSheets(workbook, company, employees, year, month);

    return workbook;
};

module.exports = {
    createExcel,
    createTitleDate
};

