const {createEmployeeReports} = require ("./ShiftAnalyzer");

const BRUTO_NETO_CODE = ' '; // Not relevant
const CLIENT_EXISTENCE = '0'; // Not relevant -0 Meaning: report does not include client reporting
const SIGN = '+';  // Not Relevant
const UNIT_PRICE = '0000000000'; // Not relevant - price of each unit
const UNIT_PRICE_SIGN = '+'; // Not relevant
const CLIENT_CODE = '   '; // Not relevant
const RESERVED = '      '; // Not relevant
const RECORD_CODE = '1'; // Regular record

const EReportSymbol = {
    USED_VACATION_DAYS: '101',
    USED_SICK_DAYS: '102',
    USED_RESERVE_DUTY_DAYS: '104',
    WORK_DAYS: '124',
    WORK_HOURS: '125',
    WORK_DAYS_IN_OFFICE: '126',
    WORK_HOURS_IN_OFFICE: '127'
};

const generateReportSymbolsMap = (employeeReport, michpalSettings) => {
    const map = {
        [EReportSymbol.WORK_DAYS]: employeeReport.shiftsCount,
        [EReportSymbol.WORK_HOURS]: employeeReport.shiftLength,
    };

    if (employeeReport.vacationDays > 0)
        map[EReportSymbol.USED_VACATION_DAYS] = employeeReport.vacationDays;
    if (employeeReport.sickDays > 0)
        map[EReportSymbol.USED_SICK_DAYS] = employeeReport.sickDays;
    if (employeeReport.reserveDutiesDays > 0)
        map[EReportSymbol.USED_RESERVE_DUTY_DAYS] = employeeReport.reserveDutiesDays;

    if (michpalSettings.regularHoursCode)
        map[michpalSettings.regularHoursCode] = employeeReport.regularHours;
    if (michpalSettings.extra125HoursCode && employeeReport.extra125Hours > 0)
        map[michpalSettings.extra125HoursCode] = employeeReport.extra125Hours;
    if (michpalSettings.extra150HoursCode && employeeReport.extra150Hours > 0)
        map[michpalSettings.extra150HoursCode] = employeeReport.extra150Hours;
    if (michpalSettings.extra175HoursCode && employeeReport.extra175Hours > 0)
        map[michpalSettings.extra175HoursCode] = employeeReport.extra175Hours;
    if (michpalSettings.extra200HoursCode && employeeReport.extra200Hours > 0)
        map[michpalSettings.extra200HoursCode] = employeeReport.extra200Hours;
    return map;
};

const generateEmployeeData = (employeeReport, michpalId, yymm, michpalSettings) => {
    michpalId = padStart(michpalId, 3, '0');
    // Per Employee
    const employeeMichpalId = padStart(employeeReport.michpalId || '1', 9, ' '); // The michpal id of the employee
    const employeeUid = padStart(employeeReport.uid, 9, ' ');

    // Calculate Per Employee
    const reportSymbolsMap = generateReportSymbolsMap(employeeReport,  michpalSettings);
    let data = '';

    for (let [reportSymbol, value] of Object.entries(reportSymbolsMap)) {
        const paddedValue = padStart(value * 100, 10, '0');
        const paddedReportSymbol = padStart(reportSymbol, 3, '0');
        data += `${michpalId}${yymm}${employeeMichpalId}${employeeUid}${BRUTO_NETO_CODE}${CLIENT_EXISTENCE}${paddedReportSymbol}${paddedValue}${SIGN}${UNIT_PRICE}${UNIT_PRICE_SIGN}${CLIENT_CODE}${RESERVED}${RECORD_CODE}\n`;
    }

    return data;
};

const isMichpalSettingsValid = companySettings => {
    const {michpalId} = companySettings;

    return !!michpalId;
};

/**
 * Experimenting with generating Michpal report
 * To be implemented (If somenoone will get interested):
 *   1. Support absence days data
 *
 * @param shifts
 * @param year
 * @param month
 * @param company
 * @return {string}
 */
const createMonthlyReport = (shifts, year, month, company) => {
    if (!isMichpalSettingsValid(company.settings.michpalSettings))
        throw new Error("Michpal settings not valid");

    // Consts
    const michpalId = company.settings.michpalSettings.michpalId;
    const yymm = year + month;

    const employeeReports = createEmployeeReports(shifts, company);

    let aggregateData = "";
    for (let employeeReport of employeeReports) {
        const data = generateEmployeeData(employeeReport, michpalId, yymm, company.settings.michpalSettings);
        aggregateData += data;
    }

    return aggregateData;
};

const padStart = (value, maxLength, fillString) => {
    return value.toString().padStart(maxLength, fillString);
};

module.exports = {
    createMonthlyReport
    , generateEmployeeData
};
