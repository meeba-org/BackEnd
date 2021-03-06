const {Feature, isFeatureEnable, isCompanyHasPremium} = require("./FeaturesManager");
const ShiftAnalyzer = require("./ShiftAnalyzer");
const moment = require('moment');
const Excel = require('exceljs');
const EWorkplaceType = require("../models/EWorkplaceType");
const ShiftLogModel = require("../models/ShiftLogModel");
const {getByTaskId} = require("../models/TaskModel");
const {isTasksEnable, isAbsenceDaysEnable} = require("./FeaturesManager");
const {MAX_FREE_EMPLOYEES_ALLOWED} = require("../constants");
const getHolidayName = require("./HolidayAnalyzer").getHolidayName;
const isIndependenceDay = require("./HolidayAnalyzer").isIndependenceDay;
const isHolidayEvening = require("./HolidayAnalyzer").isHolidayEvening;
const isHoliday = require("./HolidayAnalyzer").isHoliday;
const EShiftStatus = require("../public/helpers/EShiftStatus");
const ETaskType = require("../models/ETaskType");
const {REGULAR} = require("../models/ETaskType");
const { parse2DigitsFloat, isInnovativeTaskRelatedShift } = require('./utils');
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
const DATE_FORMAT = "DD/MM/YYYY";
const TIME_FORMAT = "HH:mm";
const DATE_AND_TIME_FORMAT = `${TIME_FORMAT} ${DATE_FORMAT}`;
const DAILY_HOURS_TEKEN = 8.6; // https://www.kolzchut.org.il/he/%D7%99%D7%95%D7%9D_%D7%A2%D7%91%D7%95%D7%93%D7%94_%D7%95%D7%A9%D7%91%D7%95%D7%A2_%D7%A2%D7%91%D7%95%D7%93%D7%94
const FORZEN_ROWS_NUM = 3;

moment.locale('he');

const createTitleDate = (year, month) => moment().year(year).month(month - 1).format('MM-YYYY');

const setSummaryHeaderColor = sheet => {
    setHeaderColor(sheet);
};

const setEmployeeHeaderColor = sheet => {
    setHeaderColor(sheet, FORZEN_ROWS_NUM);
};

let setHeaderColor = function (sheet, headerRowStart = 1) {
    let headerRow = sheet.getRow(headerRowStart);

    setRowBold(headerRow);
    markBorders(sheet, headerRow, HeaderBorderStyle);
};

let setRowBold = function (row) {
    row.font = {bold: true};
};

const createSummaryColumns = (sheet, company) => {
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
        {header: 'ימי עבודה', key: 'workingDaysCount', width: 11, style: {alignment: {horizontal: 'center'}}},
        {header: 'נסיעות יומי', key: 'transportation', width: 11, style: {alignment: {horizontal: 'center'}}},
        {header: 'סה"כ נסיעות', key: 'monthlyCommuteCost', width: 11, style: {alignment: {horizontal: 'center'}}},
        {header: 'בסיס + תוספות', key: 'monthlyExtraPay', width: 11, style: {alignment: {horizontal: 'center'}}},
        {header: 'סה"כ שכר', key: 'overallSalary', width: 11, style: {alignment: {horizontal: 'center'}}}
    ];

    sheet.columns = columns;

    setSummaryHeaderColor(sheet, company);
};

function generateTaskKey(task, suffix) {
    return task._id + suffix;
}

const getCompanyTasks = tasks => tasks.filter(t => t.type === REGULAR);

const getAbsenceDaysTasks = tasks => tasks.filter(t => t.type !== REGULAR);

const createIASummaryColumns = (sheet, company, tasks) => {

    const NUMBER_WIDTH = 9;
    
    let columns = [
        {header: 'תאריך', key: 'date', width: 13, style: {alignment: {horizontal: 'center'}}},
        {header: 'יום', key: 'dayInWeek', width: 7, style: {alignment: {horizontal: 'center'}}},
        {header: 'תקן', key: 'teken', width: 7, style: {alignment: {horizontal: 'center'}}},
        {header: 'כניסה שוטף', key: 'clockInTime', width: NUMBER_WIDTH, style: {alignment: {horizontal: 'center', wrapText: true}}},
        {header: 'כניסה רטרו', key: 'clockInTimeRetro', width: NUMBER_WIDTH, style: {alignment: {horizontal: 'center', wrapText: true}}},
        {header: 'יציאה שוטף', key: 'clockOutTime', width: NUMBER_WIDTH, style: {alignment: {horizontal: 'center', wrapText: true}}},
        {header: 'יציאה רטרו', key: 'clockOutTimeRetro', width: NUMBER_WIDTH, style: {alignment: {horizontal: 'center', wrapText: true}}},
        {header: 'שעות (עשרוני)', key: 'shiftLength', width: NUMBER_WIDTH, style: {alignment: {horizontal: 'center', wrapText: true}}},
    ];

    // Push tasks column
    let companyTasks = getCompanyTasks(tasks);
    for (const task of companyTasks) {
        columns.push({header: task.title + ' שוטף', key: generateTaskKey(task, 'shotef'), width: NUMBER_WIDTH, style: {alignment: {horizontal: 'center', wrapText: true}}});
        columns.push({header: task.title + ' רטרו', key: generateTaskKey(task, 'retro'), width: NUMBER_WIDTH, style: {alignment: {horizontal: 'center', wrapText: true}}});
    }
    
    let absenceDaysTasks = getAbsenceDaysTasks(tasks);
    for (const task of absenceDaysTasks) {
        columns.push({header: task.title, key: task.title, width: NUMBER_WIDTH, style: {alignment: {horizontal: 'center', wrapText: true}}});
    }
    
    columns.push({header: 'מיקום', key: 'workplaceType', width: 7, style: {alignment: {horizontal: 'center', wrapText: true}}});
    columns.push({header: 'הערות', key: 'notes', width: 30, style: {alignment: {horizontal: 'right'}}});
    
    sheet.columns = columns;

    setHeaderColor(sheet);
};

const initTaskTotal = tasks => {
    for (const task of tasks) {
        task.totalShotef = 0;
        task.totalRetro = 0;
        task.totalByWorkPlaceType = {
            [EWorkplaceType.OUTSIDE]: 0,
            [EWorkplaceType.OFFICE]: 0,
            [EWorkplaceType.HOME]: 0,
            [EWorkplaceType.HOT_SPOT]: 0,
            [EWorkplaceType.UNKNOWN]: 0,
        };
        
        // For absence days
        if (task.type !== REGULAR)
            task[`total${task.title}`] = 0;
    }
};

const createIADaysContent = (entity, year, month, sheet, tasks) => {
    if (!entity.shifts || entity.shifts.length === 0)
        return;

    let startOfMonth = moment().year(year).month(month - 1).startOf('month');
    let endOfMonth = moment().year(year).month(month - 1).endOf('month');
    initTaskTotal(tasks);

    for (let m = moment(startOfMonth); m.isBefore(endOfMonth); m.add(1, 'days')) {
        let row = {
            date: m.format("DD/MM/YYYY"),
            dayInWeek: calcDayInWeek(m),
            teken: calcTeken(m)
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
                teken: i === 0 ? row.teken : "",
                clockInTime: !shift.isClockInTimeRetro ? calcClockInTime(shift) : "",
                clockInTimeRetro: shift.isClockInTimeRetro ? calcClockInTime(shift) : "",
                clockOutTime: !shift.isClockOutTimeRetro ? calcClockOutTime(shift) : "",
                clockOutTimeRetro: shift.isClockOutTimeRetro ? calcClockOutTime(shift) : "",
                shiftLength: hoursAnalysis.shiftLength || "",
                notes: shift.note,
                workplaceType: calcWorkplaceTypeName(shift.workplaceType)
            };

            for (const task of tasks) {
                let value = shift.task && (shift.task._id.toString() === task._id.toString()) ? hoursAnalysis.shiftLength : "";
                
                if (task.type !== REGULAR) {
                    row[task.title] = value;
                    task[`total${task.title}`] += value || 0;
                    continue;
                }
                
                if (shift.isClockInTimeRetro || shift.isClockOutTimeRetro) {
                    row[generateTaskKey(task, 'retro')] = value;
                    task.totalRetro += value || 0;
                }
                else {
                    row[generateTaskKey(task, 'shotef')] = value;
                    task.totalShotef += value || 0;
                }

                task.totalByWorkPlaceType[shift.workplaceType] += value || 0;
            }

            addDayRow(sheet, row, shift.clockInTime);
        }
    }
};

const calcTotalInHours = (entity, tasks, sheet) => {
    // Total in hours
    let row = {
        shiftLength: entity.totalRegularHours || "", // Total hours excluding absence days
    };
    
    for (const task of tasks) {
        if (task.type === REGULAR) {
            row[generateTaskKey(task, 'shotef')] = task.totalShotef;
            row[generateTaskKey(task, 'retro')] = task.totalRetro;
        }
        else {
            row[task.title] = task[`total${task.title}`];
        }
    }

    row = addSummaryRow(sheet, row);

    // Add top border to those cells
    row.getCell("shiftLength").border = {...row.getCell("shiftLength").border, top: {style: "medium"}};
    for (const task of tasks) {
        if (task.type === REGULAR) {
            let shotefKey = generateTaskKey(task, 'shotef');
            let retroKey = generateTaskKey(task, 'retro');

            row.getCell(shotefKey).border = {...row.getCell(shotefKey).border, top: {style: "medium"}, left: {style: "thin"}};
            row.getCell(retroKey).border = {...row.getCell(retroKey).border, top: {style: "medium"}, right: {style: "thin"}};
        }
        else {
            row.getCell(task.title).border = {...row.getCell(task.title).border, top: {style: "medium"}};
        }
    }

    addSummaryLabel(sheet, row, 'סה"כ שעות');
    setRowBold(row);
};

const addSummaryLabel = (sheet, row, value) => {
    const cellIndex = 6;
    sheet.mergeCells(row._number, cellIndex + 1, row._number, cellIndex); // Merging cells
    row.getCell(cellIndex).value = value;
    row.getCell(cellIndex).alignment = {horizontal: 'left'};
    row.getCell(cellIndex).border = {right: {style: "medium"}};
};

const addSummaryRow = (sheet, row) => {
    row = sheet.addRow(row);

    row.getCell('חופש').border = {right: {style: "medium"}};
    row.getCell('notes').border = {right: {style: "medium"}, left: {style: "medium"}};
    return row;
}

const calcTaskResearchShotefPercentage = (task, entity) => {
    const { totalRegularHours } = entity;
    if (!isInnovativeTaskRelatedShift(task) || totalRegularHours === 0)
        return 0;
    
    return parse2DigitsFloat(task.totalShotef / totalRegularHours);
};

const calcTaskResearchRetroPercentage = (task, entity) => {
    const { totalRegularHours } = entity;
    if (!isInnovativeTaskRelatedShift(task) || totalRegularHours === 0)
        return 0;

    return parse2DigitsFloat(task.totalRetro / totalRegularHours);
};

const calcNumberOfTaskShifts = entity => {
    return entity.shifts.filter(s => s.task && s.task.type === ETaskType.REGULAR).length;
};

const calcAbsenceDaysHours = entity => {
    return entity.shifts
        .filter(s => s.task && s.task.type !== ETaskType.REGULAR)
        .reduce((sum, shift) => sum + shift.hoursAnalysis.shiftLength, 0); 
};

const calcTaskTotalPercentage = (totalTasksHours, entity) => {
    let taskShifts = calcNumberOfTaskShifts(entity);
    let absenceDaysHours = calcAbsenceDaysHours(entity);
    let totalTaskTekenHours = taskShifts * DAILY_HOURS_TEKEN;
    
    let denominator = Math.max(totalTasksHours + absenceDaysHours, totalTaskTekenHours);

    if (denominator === 0)
        return 0;
    
    return parse2DigitsFloat(totalTasksHours / denominator);
};

const calcResearchPercentage = (entity, tasks, sheet) => {
    // Total in percentage
    let row = {};
    let companyTasks = getCompanyTasks(tasks);
    
    for (const task of companyTasks) {
        row[generateTaskKey(task, 'shotef')] = calcTaskResearchShotefPercentage(task, entity);
        row[generateTaskKey(task, 'retro')] = calcTaskResearchRetroPercentage(task, entity);
    }
    
    row['shiftLength'] = entity.innovativeAuthorityPercentage;
    row = addSummaryRow(sheet, row);

    // Formatting the percentage sign...
    for (const task of companyTasks) {
        let cellShotef = row.getCell(generateTaskKey(task, 'shotef'));
        let cellRetro = row.getCell(generateTaskKey(task, 'retro'));
        cellShotef.style = {numFmt: '0%', alignment: {horizontal: "center"}};
        cellShotef.border = {left: {style: "thin"}};
        cellRetro.style = {numFmt: '0%', alignment: {horizontal: "center"}};
        cellRetro.border = {right: {style: "thin"}};
    }
    let totalInPercentageCell = row.getCell('shiftLength');
    totalInPercentageCell.style = {numFmt: '0%', alignment: {horizontal: "center"}};

    addSummaryLabel(sheet, row, 'תעסוקה במו"פ (%)');
    setRowBold(row);
};

const calcWorkplaceTypePercentageRow = (percentage, entity, tasks, sheet, workplaceType) => {
    let companyTasks = getCompanyTasks(tasks);
    let row = {
        workplaceType: percentage
    };
    
    if (entity.shiftLength > 0) {
        for (const task of companyTasks) {
            const taskTotal = task.totalShotef + task.totalRetro;
            row[generateTaskKey(task, 'shotef')] = taskTotal === 0 ? 0 : parse2DigitsFloat(task.totalByWorkPlaceType[workplaceType] / taskTotal);
        }
    }

    row = addSummaryRow(sheet, row);
    
    for (const task of companyTasks) {
        let cellShotef = row.getCell(generateTaskKey(task, 'shotef'));
        let cellRetro = row.getCell(generateTaskKey(task, 'retro'));
        sheet.mergeCells(row._number, cellShotef._column._number, row._number, cellRetro._column._number); // Merging cells
        cellShotef.style = {numFmt: '0%', alignment: {horizontal: "center"}};
        cellShotef.border = {left: {style: "thin"}};
        cellRetro.border = {right: {style: "thin"}};
    }
    
    let workplaceTypeCell = row.getCell('workplaceType');
    workplaceTypeCell.style = {numFmt: '0%', alignment: {horizontal: "center"}};

    const workplaceTypeName = calcWorkplaceTypeName(workplaceType);
    addSummaryLabel(sheet, row, '(%) ' + workplaceTypeName);
    setRowBold(row);
};

const calcWorkplaceTypeHoursRow = (hours, tasks, sheet, workplaceType) => {
    // Total in hours
    let row = {
        workplaceType: hours
    };
    
    let companyTasks = getCompanyTasks(tasks);
    for (const task of companyTasks) {
        row[generateTaskKey(task, 'shotef')] = task.totalByWorkPlaceType[workplaceType];
    }

    row = addSummaryRow(sheet, row);    
    
    for (const task of companyTasks) {
        let cellShotef = row.getCell(generateTaskKey(task, 'shotef'));
        let cellRetro = row.getCell(generateTaskKey(task, 'retro'));
        sheet.mergeCells(row._number, cellShotef._column._number, row._number, cellRetro._column._number); // Merging cells
        cellShotef.border = {right: {style: "thin"}, left: {style: "thin"}};
    }

    const workplaceTypeName = calcWorkplaceTypeName(workplaceType);
    addSummaryLabel(sheet, row, workplaceTypeName);
    setRowBold(row);
};

const calcWorkplaceTypeHours = (entity, workplaceType) => {
    let hours = 0;

    entity.shifts.forEach(shift => {
        if (!shift.task || shift.task.type !== ETaskType.REGULAR)
            return; // In IA mode we ignore shifts that does not belong to a Regular task - actually this should not happens! every shift should be related to a regular task
        
        if (shift.workplaceType === workplaceType)
            hours += shift.hoursAnalysis.shiftLength;
    });

    if (entity.totalRegularHours === 0)
        return 0;

    let percentage = parse2DigitsFloat(hours / entity.totalRegularHours);
    return {hours, percentage};
};

const createIASummaryRowContent = (entity, year, month, sheet, tasks) => {
    calcTotalInHours(entity, tasks, sheet);
    calcResearchPercentage(entity, tasks, sheet);
    
    for (let workplaceType of [EWorkplaceType.OFFICE, EWorkplaceType.HOME, EWorkplaceType.OUTSIDE, EWorkplaceType.HOT_SPOT, EWorkplaceType.UNKNOWN]) {
        let {hours, percentage} = calcWorkplaceTypeHours(entity, workplaceType);

        calcWorkplaceTypeHoursRow(hours, tasks, sheet, workplaceType);
        calcWorkplaceTypePercentageRow(percentage, entity, tasks, sheet, workplaceType);
    }
};

const createIAContent = (sheet, company, entity, year, month, tasks) => {
    createIADaysContent(entity, year, month, sheet, tasks);
    createIASummaryRowContent(entity, year, month, sheet, tasks);
};

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
            workingDaysCount: employee.workingDaysCount,
            transportation: employee.transportation,
            monthlyCommuteCost: employee.monthlyCommuteCost,
            monthlyExtraPay: employee.monthlyExtraPay,
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
        {header: 'תאריך', key: 'date', width: 13, style: {alignment: {vertical: 'top', horizontal: 'center'}}},
        {header: 'שעה', key: 'hour', width: 7, style: {alignment: {vertical: 'top', horizontal: 'center'}}},
        {header: 'עודכן ע"י', key: 'updatedBy', width: 10, style: {alignment: {vertical: 'top', horizontal: 'center'}}},
        {header: 'שינוי', key: 'field', width: 20, style: {alignment: {vertical: 'top', horizontal: 'center'}}},
        {header: 'ערך ישן', key: 'oldValue', width: 20, style: {alignment: {wrapText: true, vertical: 'top', horizontal: 'center'}}},
        {header: 'ערך חדש', key: 'newValue', width: 30, style: {alignment: {wrapText: true, vertical: 'top', horizontal: 'center'}}},
    ];

    sheet.columns = columns;

    setHeaderColor(sheet);
};

const setHeaderRows = (sheet, startCell, endCell, text) => {
    sheet.mergeCells(startCell, endCell);
    sheet.getCell('C1').value = text;
    const headerRow = sheet.getRow(1);
    headerRow.font = {bold: true, size: 18};
    headerRow.alignment = {vertical: 'middle', horizontal: 'center'};
};

const createShiftsPerEmployeeColumns = (sheet, company, employee) => {
    setHeaderRows(sheet, 'B1', 'O2', `${employee.fullName} - ${employee.uid}`);
    let columns = createBasicShiftsColumns(sheet, company);

    if (isTasksEnable(company) || isAbsenceDaysEnable(company)) {
        columns.push({header: 'משימה', key: 'task', width: 10, style: {alignment: {horizontal: 'center'}}});
    }

    const employeeColumns = [
        {header: 'תוספות', key: 'monthlyExtraPay', width: 7, style: {alignment: {horizontal: 'center'}}},
        {header: 'הערות', key: 'notes', width: 30, style: {alignment: {horizontal: 'right'}}},
    ];

    columns = columns.concat(employeeColumns);

    // Header names
    sheet.getRow(FORZEN_ROWS_NUM).values = columns.map(c => c.header);
    
    const processedColumns = columns.map(c => {
        let columnWithoutHeader = {...c};
        delete columnWithoutHeader.header;
        return columnWithoutHeader;
    });

    // We pass the columns without the 'header' key in order to have rows in the begining of the sheet that will function as a header
    // https://github.com/exceljs/exceljs/issues/433#issuecomment-343955264
    sheet.columns = processedColumns; 

    setEmployeeHeaderColor(sheet);
};

const createShiftsPerTaskColumns = (sheet, company, task) => {
    setHeaderRows(sheet, 'B1', 'Q2', task.title);
    let columns = createBasicShiftsColumns(sheet, company);

    const taskColumns = [
        {header: 'תוספות', key: 'monthlyExtraPay', width: 7, style: {alignment: {horizontal: 'center'}}},
        {header: 'שם עובד', key: 'userName', width: 20, style: {alignment: {horizontal: 'right'}}},
        {header: 'ת.ז.', key: 'employeeUid', width: 13, style: {alignment: {horizontal: 'center'}}},
        {header: 'שכ"ע לשעה', key: 'hourWage', width: 11, style: {alignment: {horizontal: 'center'}}},
        {header: 'הערות', key: 'notes', width: 30, style: {alignment: {horizontal: 'right'}}},
    ];

    columns = columns.concat(taskColumns);
    // Header names
    sheet.getRow(FORZEN_ROWS_NUM).values = columns.map(c => c.header);

    const processedColumns = columns.map(c => {
        let columnWithoutHeader = {...c};
        delete columnWithoutHeader.header;
        return columnWithoutHeader;
    });

    // We pass the columns without the 'header' key in order to have rows in the begining of the sheet that will function as a header
    // https://github.com/exceljs/exceljs/issues/433#issuecomment-343955264
    sheet.columns = processedColumns;

    setHeaderColor(sheet, FORZEN_ROWS_NUM);
};

function shouldAddCommuteData(company, shift) {
    return isFeatureEnable(company, Feature.CommuteModule) && !!shift.commuteCost;
}

function shouldAddTasksData(company, shift) {
    return (isTasksEnable(company) || isAbsenceDaysEnable(company)) && !!shift.task;
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

const buildField= (text, status) => {
    return status === EShiftStatus.PENDING_UPDATE ? `בקשה ל${text}` : text;
};

const fetchTaskTitle = async taskId => {
    if (!taskId)
        return "";

    let task = await getByTaskId(taskId);
    return task && task.title;
};

const calcNewShiftField = async (status, shift) => {
    let task = await getByTaskId(shift.task);
    let taskTypeText;
    switch (task && task.type) {
        case ETaskType.SICK:
            taskTypeText = "מחלה";
            break;
        case ETaskType.VACATION:
            taskTypeText = "חופש";
            break;
        case ETaskType.RESERVE:
            taskTypeText = "מילואים";
            break;
        case ETaskType.REGULAR:
        default:
            taskTypeText = "משמרת";
            break;
    }
    const sentence = `יצירת ${taskTypeText}`;
    return (status === EShiftStatus.PENDING_CREATE) ? `בקשה ל${sentence}` : sentence;
};

const calcChanges = async (oldValue, newValue, status) => {
    let field = "לא ידוע";
    let oldValueStr;
    let newValueStr;

    if (!oldValue && newValue) {
        field = await calcNewShiftField(status, newValue);
        oldValueStr = "";
        newValueStr = `--> ${moment(newValue.clockInTime).format(DATE_AND_TIME_FORMAT)}
<-- ${newValue.clockOutTime && moment(newValue.clockOutTime).format(DATE_AND_TIME_FORMAT)}`;
    }
    else if (oldValue.status !== EShiftStatus.APPROVED && newValue.status === EShiftStatus.APPROVED) {
        field = "אישור שינוי";
        oldValueStr = "";
        newValueStr = `--> ${moment(newValue.clockInTime).format(DATE_AND_TIME_FORMAT)}
<-- ${newValue.clockOutTime && moment(newValue.clockOutTime).format(DATE_AND_TIME_FORMAT)}`;
    }
    // Log is about request to update a shift
    else if (moment(oldValue.clockInTime).diff(moment(newValue.clockInTime), 'minutes') !== 0) {
        field = buildField("עדכון כניסה", status);
        oldValueStr = moment(oldValue.clockInTime).format(DATE_AND_TIME_FORMAT);
        newValueStr = moment(newValue.clockInTime).format(DATE_AND_TIME_FORMAT);
    } else if (moment(oldValue.clockOutTime).diff(moment(newValue.clockOutTime), 'minutes') !== 0) {
        field = buildField("עדכון יציאה", status);
        oldValueStr = moment(oldValue.clockOutTime).format(DATE_AND_TIME_FORMAT);
        newValueStr = moment(newValue.clockOutTime).format(DATE_AND_TIME_FORMAT);
    } else if (oldValue.commuteCost.publicTransportation !== newValue.commuteCost.publicTransportation) {
        field = buildField("עדכון נסיעות", status);
        oldValueStr = oldValue.commuteCost.publicTransportation;
        newValueStr = newValue.commuteCost.publicTransportation;
    } else if (oldValue.extraPay !== newValue.extraPay) {
        field = buildField("עדכון בונוס", status);
        oldValueStr = oldValue.extraPay;
        newValueStr = newValue.extraPay;
    } else if (oldValue.task !== newValue.task) {
        field = buildField("עדכון משימה", status);

        oldValueStr = await fetchTaskTitle(oldValue.task);
        newValueStr = await fetchTaskTitle(newValue.task);
    }

    return {
        field,
        oldValue: oldValueStr,
        newValue: newValueStr,
    };
};

const createShiftChangesLogContent = async (sheet, entity, company, shiftChangesLog) => {

    for (let log of shiftChangesLog) {
        const {field, oldValue, newValue} = await calcChanges(log.oldValue, log.newValue, log.status);

        let row = {
            date: moment(log.createdAt).format(DATE_FORMAT), // Date & hour of the change
            hour: moment(log.createdAt).format(TIME_FORMAT),
            updatedBy: log.updatedBy && log.updatedBy.fullName,
            field,
            newValue,
            oldValue
        };

        sheet.addRow(row);
    }
};

const calcWorkplaceTypeName = workplaceType => {
    switch (workplaceType) {
        case EWorkplaceType.OUTSIDE:
            return "חוץ";
        case EWorkplaceType.OFFICE:
            return "משרד";
        case EWorkplaceType.HOME:
            return "בית";
        case EWorkplaceType.HOT_SPOT: // Not in used added because IA wanted
            return "נקודה חמה";
        case EWorkplaceType.UNKNOWN:
        default:
            return "לא ידוע";
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
        clockOutTime: 'בסיס + תוספות:',
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

const isSpecialDay = day => isHoliday(day) || isHolidayEvening(day) || isIndependenceDay(day);

function addDayRow(sheet, row, day) {
    let addedRow = sheet.addRow(row);

    if (isSpecialDay(day)) {
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

const calcTeken = (m) => {
    if (!m)
        return "";

    return (!isSpecialDay(m)) ? DAILY_HOURS_TEKEN : ""; 
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

const isWorksheetNameExists = (workbook, title) => workbook._worksheets.find(w => w && w.name === title);

const handleTitle = (title, workbook) => {
    title = title.replace(/'/g, ""); // Omit name with single quote "'" (bug fix)
    title = title.substring(0, EXCEL_SHEET_NAME_LIMIT);
    while (isWorksheetNameExists(workbook, title)) // Preventing the same name employee (bug fix)
        title += '1';
    return title;
};

const addWorksheet = (workbook, title, color, header, frozenRows = 1) => {
    title = handleTitle(title, workbook);

    return workbook.addWorksheet(title, {
        properties: {
            tabColor:{argb: color}
        },
        views: [{
            state: 'frozen',
            xSplit: 1,
            ySplit: frozenRows,
            rightToLeft: true
        }],
        headerFooter: {
            oddHeader : header // BUG - https://github.com/exceljs/exceljs/issues/1325
        },
        pageSetup:{
            paperSize: 9, // A4
            orientation:'landscape',
            fitToPage: true
        }
    });
};

const addIAEmployeeChangesLogSheet = async (workbook, employee, shiftChangesLog, company, month, year) => {
    try {
        let header = `מיבא שעון נוכחות - חברת ${company.name} - ${employee.fullName} דוח שינויים - חודש ${month}/${year}`;
        let sheet = addWorksheet(workbook, `${employee.fullName} - דוח שינויים`, "a3d1a6", header);

        // Get the changes relevant for the specific employee
        const employeeShiftChangesLog = shiftChangesLog.filter(log => log.newValue.user._id.toString() === employee._id.toString());

        createShiftChangesLogColumns(sheet, company);
        await createShiftChangesLogContent(sheet, employee, company, employeeShiftChangesLog);
        createIASheetFooter(sheet, false);
    } catch (e) {
        console.error(e);
    }
};

const addShiftsPerEmployeeSheets = async (workbook, company, employees, year, month) => {
    for (const employee of employees) {
        // create a sheet with the first row and column frozen
        let sheet = addWorksheet(workbook, employee.fullName, "54A759", undefined, FORZEN_ROWS_NUM);

        createShiftsPerEmployeeColumns(sheet, company, employee);
        createShiftsPerEmployeesContent(sheet, employee, company, year, month);
        createEmployeesTotalSection(sheet, employee);
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
        let sheet = addWorksheet(workbook, generateTaskName(task), "D49B6A", undefined, FORZEN_ROWS_NUM);

        createShiftsPerTaskColumns(sheet, company, task);
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

const addIAEmployeeSheet = async (workbook, company, employee, year, month, tasks) => {
    let header = `מיבא שעון נוכחות - חברת ${company.name} - ${employee.fullName} - חודש ${month}/${year}`;
    
    // create a sheet with the first row and column frozen
    let sheet = addWorksheet(workbook, employee.fullName, null, header);
    
    createIASummaryColumns(sheet, company, tasks);
    createIAContent(sheet, company, employee, year, month, tasks);
    createIASheetFooter(sheet, true);
};

const addFooterField = (sheet, row, title, value, shouldAddDate = true) => {
    var cellIndex = 2;
    sheet.mergeCells(row._number, cellIndex + 2, row._number, cellIndex); // Merging cells
    row.getCell(cellIndex).value = title;
    row.getCell(cellIndex).style = {alignment: {horizontal: 'center'}};

    cellIndex += 3;
    sheet.mergeCells(row._number, cellIndex + 2, row._number, cellIndex); // Merging cells
    if (value)
        row.getCell(cellIndex + 2).value = value;
    row.getCell(cellIndex + 2).border = {bottom: {style: "medium"}};

    if (shouldAddDate) {
        cellIndex += 3;
        sheet.mergeCells(row._number, cellIndex + 1, row._number, cellIndex); // Merging cells
        row.getCell(cellIndex).value = "תאריך";
        row.getCell(cellIndex).style = {alignment: {horizontal: 'center'}};

        cellIndex += 2;
        sheet.mergeCells(row._number, cellIndex + 2, row._number, cellIndex); // Merging cells
        row.getCell(cellIndex).border = {bottom: {style: "medium"}};
    }
};

const createIASheetFooter = (sheet, shouldAddStatement) => {
    sheet.addRow();
    let row = sheet.addRow();
    let columnsLength = sheet.columns.length;

    if (shouldAddStatement) {
        sheet.mergeCells(row._number, columnsLength, row._number, 2); // Merging cells
        row.getCell(2).value = 'הריני מצהיר כי דו"ח שעות זה משקף את חלוקת שעות עבודתי במשימות השונות, וכי ידוע לי כי דו"ח זה ישמש לתביעת תמיכה כספית שתוגש ע"י החברה, לרשות החדשנות, משרד הכלכלה';
    }
    
    row = sheet.addRow();
    row = sheet.addRow();
    addFooterField(sheet, row, 'אישור עובד וחתימה');

    row = sheet.addRow();
    row = sheet.addRow();
    addFooterField(sheet, row, 'אישור מנהל וחתימה');

    row = sheet.addRow();
    row = sheet.addRow();
    addFooterField(sheet, row, 'תאריך הפקת הדוח', moment().format(DATE_AND_TIME_FORMAT), false);
};

const createInnovationAuthorityExcel = async (shifts, year, month, company, tasks) => {
    const workbook = createWorkbook();
    
    let employees = processShiftsForEmployees(shifts, company);

    let startDate = moment().year(year).month(month - 1).startOf('month');
    let endDate = moment().year(year).month(month).startOf('month');
    let shiftChangesLog = await ShiftLogModel.getLogsBetween(company, startDate, endDate);

    for (const employee of employees) {
        await addIAEmployeeSheet(workbook, company, employee, year, month, tasks);
        
        await addIAEmployeeChangesLogSheet(workbook, employee, shiftChangesLog, company, month, year);
    }
    return workbook;
};

module.exports = {
    createExcel,
    createInnovationAuthorityExcel,
    createTitleDate
};

