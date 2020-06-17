const {Feature, isFeatureEnable, isCompanyHasPremium} = require("./FeaturesManager");
const ShiftAnalyzer = require("./ShiftAnalyzer");
const moment = require('moment');
const Excel = require('exceljs');
const EInsideWorkplace = require("../models/EInsideWorkplace");
const ShiftLogModel = require("../models/ShiftLogModel");
const {isTasksEnable, isAbsenceDaysEnable, isInnovativeAuthorityEnable} = require("./FeaturesManager");
const {MAX_FREE_EMPLOYEES_ALLOWED} = require("../constants");
const getHolidayName = require("./HolidayAnalyzer").getHolidayName;
const isIndependenceDay = require("./HolidayAnalyzer").isIndependenceDay;
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
const EXCEL_SHEET_NAME_LIMIT = 31;
const DATE_FORMAT = "YYYY-MM-DD";
const TIME_FORMAT = "HH:mm";

moment.locale('he');

const createTitleDate = (year, month) => moment().year(year).month(month - 1).format('MM-YYYY');

const setSummaryHeaderColor = sheet => {
    setHeaderColor(sheet);
};

const setEmployeeHeaderColor = sheet => {
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
    let columns = [
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
    ];

    if (isInnovativeAuthorityEnable(company))
        columns.push({header: 'מדע"ר %', key: 'innovativeAuthorityPercentage', width: 10, style: {alignment: {horizontal: 'center'}}});

    if (hasWorkplaces(company))
        columns.push({header: 'מחוץ לעבודה %', key: 'outOfOfficePercentage', width: 10, style: {alignment: {horizontal: 'center'}}});

    columns.push({header: 'סה"כ שכר', key: 'overallSalary', width: 11, style: {alignment: {horizontal: 'center'}}});

    sheet.columns = columns;

    setSummaryHeaderColor(sheet, company);
}

const createLimitedContentWarning = sheet => {
    sheet.addRow();
    const title = sheet.addRow({
        employeeName: `איפה כל העובדים?`,
    });
    const sentence1 = sheet.addRow({
        employeeName: `הינך במסלול החינמי המוגבל ל-${MAX_FREE_EMPLOYEES_ALLOWED} עובדים`,
    });

    const chat = sheet.addRow();
    chat.getCell('employeeName').value = {
        text: 'לשאלות נשמח לדבר איתך בצ\'אט',
        hyperlink: 'https://m.me/meebaOnFace'
    };

    let limitContentStyle = {
        type: 'pattern',
        pattern: 'solid',
        size: 20,
        color: {argb: 'FF9800'}
    };

    let chatStyle = {
        type: 'pattern',
        pattern: 'solid',
        size: 14,
        underline: true,
        color: {argb: '2196F3'}
    };

    title.getCell('employeeName').font = limitContentStyle;
    sentence1.getCell('employeeName').font = limitContentStyle;
    chat.getCell('employeeName').font = chatStyle;
};

const addSummarySheet = (workbook, company, employees, limitedReport) => {
    // create a sheet with the first row and column frozen
    let sheet = addWorksheet(workbook, "סיכום");

    createSummaryColumns(sheet, company);
    createSummaryContent(sheet, employees);

    if (limitedReport)
        createLimitedContentWarning(sheet);
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
            innovativeAuthorityPercentage: employee.innovativeAuthorityPercentage,
            outOfOfficePercentage: employee.outOfOfficePercentage,
            overallSalary: employee.overallSalary,
        });

        markBorders(sheet, addedRow, RowBorderStyle);
    });
};

const hasWorkplaces = company => company.workplaces && company.workplaces.length > 0;

const createBasicShiftsColumns = (sheet, company) => {
    let columns = [
        {header: 'תאריך', key: 'date', width: 13, style: {alignment: {horizontal: 'center'}}},
        {header: 'יום', key: 'dayInWeek', width: 7, style: {alignment: {horizontal: 'center'}}},
        {header: 'שעת התחלה', key: 'clockInTime', width: 13, style: {alignment: {horizontal: 'center'}}},
        {header: 'שעת סיום', key: 'clockOutTime', width: 13, style: {alignment: {horizontal: 'center'}}},
        {header: 'הפסקה', key: 'breakLength', width: 7, style: {alignment: {horizontal: 'center'}}},
        {header: 'שעות (עשרוני)', key: 'shiftLength', width: 13, style: {alignment: {horizontal: 'center'}}},
        {header: '100%', key: 'regularHours', width: 7, style: {alignment: {horizontal: 'center'}}},
        {header: '125%', key: 'extra125Hours', width: 7, style: {alignment: {horizontal: 'center'}}},
        {header: '150%', key: 'extra150Hours', width: 7, style: {alignment: {horizontal: 'center'}}},
        {header: '175%', key: 'extra175Hours', width: 7, style: {alignment: {horizontal: 'center'}}},
        {header: '200%', key: 'extra200Hours', width: 7, style: {alignment: {horizontal: 'center'}}},
    ];

    if (isFeatureEnable(company, Feature.CommuteModule)) {
        columns.push({
            header: 'החזר נסיעות',
            key: 'publicTransportation',
            width: 10,
            style: {alignment: {horizontal: 'center'}}
        });
    }

    return columns;
};

const createShiftChangesLogColumns = (sheet, company) => {
    let columns = [
        {header: 'תאריך', key: 'date', width: 13, style: {alignment: {horizontal: 'center'}}},
        {header: 'שעה', key: 'hour', width: 7, style: {alignment: {horizontal: 'center'}}},
        {header: 'שדה', key: 'field', width: 13, style: {alignment: {horizontal: 'center'}}},
        {header: 'ערך חדש', key: 'newValue', width: 13, style: {alignment: {horizontal: 'center'}}},
        {header: 'ערך ישן', key: 'oldValue', width: 13, style: {alignment: {horizontal: 'center'}}},
    ];

    sheet.columns = columns;

    setHeaderColor(sheet);
};

const createShiftsPerEmployeeColumns = (sheet, company) => {
    let columns = createBasicShiftsColumns(sheet, company);

    if (isTasksEnable(company) || isAbsenceDaysEnable(company)) {
        columns.push({header: 'משימה', key: 'task', width: 10, style: {alignment: {horizontal: 'center'}}});
    }

    if (hasWorkplaces(company)) {
        columns.push({header: 'מחוץ לעבודה', key: 'oooShift', width: 10, style: {alignment: {horizontal: 'center'}}});
    }

    const employeeColumns = [
        {header: 'תוספות', key: 'monthlyExtraPay', width: 7, style: {alignment: {horizontal: 'center'}}},
        {header: 'הערות', key: 'notes', width: 30, style: {alignment: {horizontal: 'right'}}},
    ];

    sheet.columns = columns.concat(employeeColumns);

    setEmployeeHeaderColor(sheet);
};

const createShiftsPerTaskColumns = (sheet, company) => {
    let columns = createBasicShiftsColumns(sheet, company);

    const taskColumns = [
        {header: 'תוספות', key: 'monthlyExtraPay', width: 7, style: {alignment: {horizontal: 'center'}}},
        {header: 'שם עובד', key: 'userName', width: 20, style: {alignment: {horizontal: 'right'}}},
        {header: 'ת.ז.', key: 'employeeUid', width: 13, style: {alignment: {horizontal: 'center'}}},
        {header: 'שכ"ע לשעה', key: 'hourWage', width: 11, style: {alignment: {horizontal: 'center'}}},
        {header: 'הערות', key: 'notes', width: 30, style: {alignment: {horizontal: 'right'}}},
    ];

    sheet.columns = columns.concat(taskColumns);

    setHeaderColor(sheet);
};

function shouldAddCommuteData(company, shift) {
    return isFeatureEnable(company, Feature.CommuteModule) && !!shift.commuteCost;
}

function shouldAddTasksData(company, shift) {
    return isTasksEnable(company) && !!shift.task;
}

function addCommuteData(company, row, shift) {
    row = {
        ...row,
        publicTransportation: shift.commuteCost.publicTransportation,
    };

    return row;
}

function addTasksData(company, row, shift) {
    let user = shift.user || {};

    row = {
        ...row,
        task: formatTask(shift.task),
        employeeUid: user.uid,
        hourWage: user.hourWage,
    };

    return row;
}

function formatTask(task) {
    return task.title;
}

const createShiftsPerTasksContent = function (sheet, task, company, year, month ) {
    createBasicShiftsContent(sheet, task, company, year, month );

};

const createShiftsPerEmployeesContent = function (sheet, employee, company, year, month ) {
    createBasicShiftsContent(sheet, employee, company, year, month );
};

const calcChanges = (oldValue, newValue) => {
    // TODO Implement this
    return {
        field: 'נסיעות',
        oldValue: 33,
        newValue: 55
    };
};

const createShiftChangesLogContent = (sheet, entity, company, shiftChangesLog ) => {

    for (let log of shiftChangesLog) {
        const {field, oldValue, newValue} = calcChanges(log.oldValue, log.newValue);

        let row = {
            date: moment(log.newValue.clockInTime).format(DATE_FORMAT),
            hour: moment(log.newValue.clockInTime).format(TIME_FORMAT),
            field,
            newValue,
            oldValue
        };

        sheet.addRow(row);
    }
};

const createBasicShiftsContent =  (sheet, entity, company, year, month ) => {
    if (!entity.shifts || entity.shifts.length === 0)
        return;

    let startOfMonth = moment().year(year).month(month - 1).startOf('month');
    let endOfMonth = moment().year(year).month(month - 1).endOf('month');

    for (let m = moment(startOfMonth); m.isBefore(endOfMonth); m.add(1, 'days')) {
        let row = {
            date: m.format("DD/MM/YYYY"),
            dayInWeek: calcDayInWeek(m),
        };

        let shifts = getShifts(entity.shifts, m);

        if (!shifts || shifts.length === 0) {
            addDayRow(sheet, row, m);
            continue;
        }

        for (let i = 0; i < shifts.length; i++) {
            let shift = shifts[i];

            let hoursAnalysis = shift.hoursAnalysis;
            row = {
                date: i === 0 ? row.date : "",
                dayInWeek: i === 0 ? row.dayInWeek : "",
                clockInTime: calcClockInTime(shift),
                clockOutTime: calcClockOutTime(shift),
                breakLength: hoursAnalysis.breakLength,
                shiftLength: hoursAnalysis.shiftLength || "",
                regularHours: hoursAnalysis.regularHours || "",
                extra125Hours: hoursAnalysis.extra125Hours || "",
                extra150Hours: hoursAnalysis.extra150Hours || "",
                extra175Hours: hoursAnalysis.extra175Hours || "",
                extra200Hours: hoursAnalysis.extra200Hours || "",
                monthlyExtraPay: shift.extraPay || "",
                userName: shift.user.fullName,
                notes: shift.note,
                oooShift: shift.isClockInInsideWorkplace === EInsideWorkplace.OUTSIDE ? "✔" : ""
            };

            if (shouldAddCommuteData(company, shift)) {
                row = addCommuteData(company, row, shift);
            }

            if (shouldAddTasksData(company, shift)) {
                row = addTasksData(company, row, shift);
            }

            addDayRow(sheet, row, shift.clockInTime);
        }
    }
};

function addTotalTransportation(employee, sheet) {
    let transportationData = {
        clockOutTime: 'נסיעות:',
        shiftLength: employee.monthlyCommuteCost,
    };

    let transportationRow = sheet.addRow(transportationData);
    setRowBold(transportationRow);
}

function addTotalExtraPay(employee, sheet) {
    let extraPayData = {
        clockOutTime: 'תוספות:',
        shiftLength: employee.monthlyExtraPay,
    };

    let extraPayDataRow = sheet.addRow(extraPayData);
    setRowBold(extraPayDataRow);
}

function addTotalSalary(entity, sheet) {
    let salaryData = {
        clockOutTime: 'שכר:',
        shiftLength: entity.overallSalary,
    };
    let salaryRow = sheet.addRow(salaryData);
    setRowBold(salaryRow);
}

const createTasksTotalSection = (sheet, employee) => {
    createBasicTotalSection(sheet, employee, false, false, false);
};

const createEmployeesTotalSection = (sheet, employee) => {
    createBasicTotalSection(sheet, employee, true, true, true);
};

const createBasicTotalSection = (sheet, employee, shouldAddTransportation, shouldAddExtraPay, shouldAddOverallSalary) => {
    let totalRowData = {
        clockOutTime: 'סה"כ:',
        shiftLength: employee.shiftLength || "",
        regularHours: employee.regularHours || "",
        extra125Hours: employee.extra125Hours || "",
        extra150Hours: employee.extra150Hours || "",
        extra175Hours: employee.extra175Hours || "",
        extra200Hours: employee.extra200Hours || "",
    };

    let totalRow = sheet.addRow(totalRowData);
    setRowBold(totalRow);

    if (shouldAddTransportation)
        addTotalTransportation(employee, sheet);

    if (shouldAddExtraPay)
        addTotalExtraPay(employee, sheet);

    if (shouldAddOverallSalary)
        addTotalSalary(employee, sheet);
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
    addTextToCell(addedRow, 'notes', holidayName, ", ");
};

const addTextToCell = (row, cellId, newValue, delimiter) => {
    const currentCellValue = row.getCell(cellId).value;

    let newCellValue = currentCellValue;
    if (!!currentCellValue && !!newValue) // has old and new values
        newCellValue += delimiter + newValue;
    else if (!currentCellValue && !!newValue) // only new value
        newCellValue = newValue;

    row.getCell(cellId).value = newCellValue;
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

    if (isHoliday(day) || isHolidayEvening(day) || isIndependenceDay(day)) {
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
};

function getShifts(shifts, m) {
    let relevantShifts = [];
    for (const shift of shifts) {
        if (moment(shift.clockInTime).isSame(m, "day"))
            relevantShifts.push(shift);
    }

    return relevantShifts;
}

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

let addWorksheet = function (workbook, title, color) {
    title = title.replace(/'/g, ""); // Omit name with single quote "'"
    title = title.substring(0, EXCEL_SHEET_NAME_LIMIT);

    return workbook.addWorksheet(title, {
        properties: {
            tabColor:{argb: color}
        },
        views: [{
            state: 'frozen',
            xSplit: 1,
            ySplit: 1,
            rightToLeft: true
        }]
    });
};

const addShiftsPerEmployeeSheets = async (workbook, company, employees, year, month) => {
    let shiftChangesLog;
    if (isInnovativeAuthorityEnable(company))
        shiftChangesLog = await ShiftLogModel.getByCompanyId(company._id);

    for (const employee of employees) {
        // create a sheet with the first row and column frozen
        let sheet = addWorksheet(workbook, employee.fullName, "54A759");

        createShiftsPerEmployeeColumns(sheet, company);
        createShiftsPerEmployeesContent(sheet, employee, company, year, month);
        createEmployeesTotalSection(sheet, employee);

        // TODO preetify code
        if (isInnovativeAuthorityEnable(company)) {
            // create a sheet with the first row and column frozen
            let sheet = addWorksheet(workbook, `${employee.fullName} - דוח שינויים`, "a3d1a6");
            const employeeShiftChangesLog = shiftChangesLog.filter(log => log.newValue.user._id.toString() === employee._id.toString());

            createShiftChangesLogColumns(sheet, company);
            createShiftChangesLogContent(sheet, employee, company, employeeShiftChangesLog);
        }
    }

};

function generateTaskName(task) {
    if (!task.taskBreadCrumb || task.taskBreadCrumb.length === 0)
        return task.title;

    let name = '';
    for (let i = 0 ; i < task.taskBreadCrumb.length ; i++) {
        let b = task.taskBreadCrumb[i];
        if (i === 0)
            name += b.title;
        else
            name += "-->" + b.title;
    }
    return name;
}

const addShiftsPerTaskSheets = (workbook, company, tasks, year, month) => {
    tasks.forEach((task) => {
        // create a sheet with the first row and column frozen
        let sheet = addWorksheet(workbook, generateTaskName(task), "D49B6A");

        createShiftsPerTaskColumns(sheet, company);
        createShiftsPerTasksContent(sheet, task, company, year, month );
        createTasksTotalSection(sheet, task);
    });

};

let createWorkbook = function () {
    const workbook = new Excel.Workbook();
    workbook.creator = 'Meeba';
    workbook.created = new Date();
    return workbook;
};

function isLimitedReport(company, employees) {
    return !isCompanyHasPremium(company) && employees.length > MAX_FREE_EMPLOYEES_ALLOWED;
}

const processShiftsForEmployees = function (shifts, company) {
    if (!shifts || shifts.length === 0)
        return [];

    return ShiftAnalyzer.createEmployeeReports(shifts, company);
};

const processShiftsForTasks = function (shifts, company, tasks) {
    if (!shifts || shifts.length === 0)
        return [];
    return ShiftAnalyzer.createTasksReport(shifts, company, tasks);
};

const createExcel = async (shifts, year, month, company, rawTasks) => {
    const workbook = createWorkbook();
    let employees = processShiftsForEmployees(shifts, company);

    // If company is not premium take the MAX_FREE_EMPLOYEES_ALLOWED
    let limitedReport = isLimitedReport(company, employees);
    if (limitedReport)
        employees = employees.slice(0, MAX_FREE_EMPLOYEES_ALLOWED);

    let tasks = processShiftsForTasks(shifts, company, rawTasks);

    addSummarySheet(workbook, company, employees, limitedReport);
    await addShiftsPerEmployeeSheets(workbook, company, employees, year, month);
    addShiftsPerTaskSheets(workbook, company, tasks, year, month);

    return workbook;
};

module.exports = {
    createExcel,
    createTitleDate
};

