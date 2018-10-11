const {FeatureName, isFeatureEnable} = require("./FeaturesManager");

const ShiftAnalyzer = require("./ShiftAnalyzer");
const moment = require('moment');
const Excel = require('exceljs');
const isHolidayEvening = require("./HolidayAnalyzer").isHolidayEvening;
const isHoliday = require("./HolidayAnalyzer").isHoliday;

moment.locale('he');

const createTitleDate = function (year, month) {
    return moment().year(year).month(month-1).format('MM-YYYY');
};

setSummaryHeaderColor = function(sheet) {
    let columns = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1'];

    setHeaderColor(sheet, columns);
};

setEmployeeHeaderColor = function(sheet) {
    let columns = ['A1', 'B1', 'C1', 'D1'];

    setHeaderColor(sheet, columns);
};

let setHeaderColor = function (sheet, columns) {
    columns.map(key => {
        sheet.getCell(key).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: 'cccccc'}
        };
    });
};

function createSummaryColumns(sheet, company) {
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

    setSummaryHeaderColor(sheet, company);
}

const addSummarySheet = (workbook, company, shifts) => {
    // create a sheet with the first row and column frozen
    let sheet = workbook.addWorksheet("שכר", {views:[ {state: 'frozen', xSplit: 1, ySplit:1, rightToLeft: true} ]});

    createSummaryColumns(sheet, company);
    createSummaryContent(sheet, shifts, company.settings);
};

let createSummaryContent = function (worksheet, shifts, settings) {
    if (!shifts || shifts.length === 0)
        return;

    let employees = ShiftAnalyzer.createEmployeeShiftsReports(shifts, settings);

    employees.forEach((employee) => {
        worksheet.addRow({
            employeeName: employee.fullName,
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

function createShiftsPerEmployeeColumns(sheet, company) {
    sheet.columns = [
        {header: 'תאריך', key: 'date', width: 20, style: {alignment: {horizontal: 'right'}}},
        {header: 'יום', key: 'dayInWeek', width: 10, style: {alignment: {horizontal: 'right'}}},
        {header: 'שעת התחלה', key: 'clockInTime', width: 20, style: {alignment: {horizontal: 'right'}}},
        {header: 'שעת סיום', key: 'clockOutTime', width: 20, style: {alignment: {horizontal: 'right'}}},
        {header: 'שעות', key: 'totalHours', width: 20, style: {alignment: {horizontal: 'right'}}},
        {header: '100%', key: 'regularHours', width: 20, style: {alignment: {horizontal: 'right'}}},
        {header: '125%', key: 'extra125Hours', width: 20, style: {alignment: {horizontal: 'right'}}},
        {header: '150%', key: 'extra150Hours', width: 20, style: {alignment: {horizontal: 'right'}}},
        {header: '175%', key: 'extra175Hours', width: 20, style: {alignment: {horizontal: 'right'}}},
        {header: '200%', key: 'extra200Hours', width: 20, style: {alignment: {horizontal: 'right'}}},
    ];

    if (isFeatureEnable(company, FeatureName.CommuteModule)) {
        sheet.columns = sheet.columns.concat([
            {header: 'תחבורה ציבורית', key: 'publicTransportation', width: 10, style: {alignment: {horizontal: 'right'}}},
            {header: 'שעות נסיעה', key: 'commuteHours', width: 10, style: {alignment: {horizontal: 'right'}}},
            {header: 'ק"מ', key: 'kmDriving', width: 10, style: {alignment: {horizontal: 'right'}}},
            {header: 'חניה', key: 'parkingCost', width: 10, style: {alignment: {horizontal: 'right'}}},
            {header: 'נסיעות יומי', key: 'commuteCost', width: 10, style: {alignment: {horizontal: 'right'}}},
        ]);
    }

    setEmployeeHeaderColor(sheet, company);
}

function shouldAddCommuteData(company, shift) {
    return isFeatureEnable(company, FeatureName.CommuteModule) && !!shift.commuteCost;
}

function addCommuteData(company, row, shift) {
    let kmPay = company.settings.kmPay;
    let hourCommutePay = company.settings.hourCommutePay;

    row = {
        ...row,
        publicTransportation: shift.commuteCost.publicTransportation,
        commuteHours: shift.commuteCost.commuteHours,
        kmDriving: shift.commuteCost.kmDriving,
        parkingCost: shift.commuteCost.parkingCost,
        commuteCost: shift.commuteCost.publicTransportation +
            shift.commuteCost.commuteHours * hourCommutePay +
            shift.commuteCost.kmDriving * kmPay +
            shift.commuteCost.parkingCost
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

        let shift = getShift(employee.shifts, m);

        if (!shift) {
            addShiftRow(sheet, row, m);
            continue;
        }

        row = {
            ...row,
            clockInTime: calcClockInTime(shift),
            clockOutTime: calcClockOutTime(shift),
            totalHours: 1111,
            regularHours: employee.regularHours,
            extra125Hours: employee.extra125Hours,
            extra150Hours: employee.extra150Hours,
            extra175Hours: employee.extra175Hours,
            extra200Hours: employee.extra200Hours,

        };

        if (shouldAddCommuteData(company, shift)) {
            row = addCommuteData(company, row, shift);
        }

        addShiftRow(sheet, row, shift.clockInTime);
    }

    // employee.shifts.forEach((shift) => {
    //     let row = {
    //         clockInDate: calcClockInDate(shift),
    //         dayInWeek: calcDayInWeek(shift),
    //         clockInTime: calcClockInTime(shift),
    //         clockOutTime: calcClockOutTime(shift),
    //     };
    //
    //     if (shouldAddCommuteData(company, shift)) {
    //         row = addCommuteData(company, row, shift);
    //     }
    //
    //     sheet.addRow(row);
    // });
};

function markRowAsHoliday(addedRow) {
    // TODO Need a different definition here
    let columns = ['date', 'dayInWeek'];

    columns.map(key => {
        addedRow.getCell(key).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: 'cccccc'}
        };
    });
}

function addShiftRow(sheet, row, shift) {
    let addedRow = sheet.addRow(row);

    if (isHoliday(shift) || isHolidayEvening(shift))
        markRowAsHoliday(addedRow);
}


function getShift(shifts, m) {
    for (const shift of shifts) {
        if (moment(shift.clockInTime).isSame(m, "day"))
            return shift;
    }

    return null;
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

const addShiftsPerEmployeeSheets = (workbook, company, shifts, year, month ) => {
    if (!shifts || shifts.length === 0)
        return;

    // TODO need to extract this out of this method
    let employees = ShiftAnalyzer.createEmployeeShiftsReports(shifts, company.settings);

    employees.forEach((employee) => {
        // create a sheet with the first row and column frozen
        let sheet = workbook.addWorksheet(employee.fullName, {views:[ {state: 'frozen', xSplit: 1, ySplit:1, rightToLeft: true} ]});

        createShiftsPerEmployeeColumns(sheet, company);
        createShiftsPerEmployeeContent(sheet, employee, company, year, month );
    });

}

let createWorkbook = function () {
    const workbook = new Excel.Workbook();
    workbook.creator = 'Meeba';
    workbook.created = new Date();
    return workbook;
};

const createExcel = (shifts, year, month, company) => {
    const workbook = createWorkbook();
    addSummarySheet(workbook, company, shifts, year, month);
    addShiftsPerEmployeeSheets(workbook, company, shifts, year, month );


    return workbook;
};

module.exports = {
    createExcel,
    createTitleDate
};

