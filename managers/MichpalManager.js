const {createEmployeeReports} = require ("./ShiftAnalyzer");

const BRUTO_NETO_CODE = ' '; // Not relevant
const CLIENT_EXISTENCE = '0'; // Not relevant -0 Meaning: report does not include client reporting
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
    WORK_HOURS_IN_OFFICE: '125'
};

const generateReportSymbolsMap = employeeReport => {
    return {
        [EReportSymbol.WORK_DAYS]: employeeReport.shiftsCount,
        [EReportSymbol.WORK_HOURS]: employeeReport.overallHours,
        [EReportSymbol.USED_VACATION_DAYS]: employeeReport.vacationDays || 3,
        [EReportSymbol.USED_SICK_DAYS]: employeeReport.sickDays || 4,
        [EReportSymbol.USED_RESERVE_DUTY_DAYS]: employeeReport.reserveDutiesDays || 5,
    };
};

const generateEmployeeData = (employeeReport, michpalId, yymm) => {
    michpalId = padStart(michpalId, 3, '0');
    // Per Employee
    const employeeMichpalId = padStart(employeeReport.michpalId || '1', 9, ' '); // The michpal id of the employee
    const employeeUid = padStart(employeeReport.uid, 9, ' ');
    const sign = '+';

    // Calculate Per Employee
    const reportSymbolsMap = generateReportSymbolsMap(employeeReport);
    let data = '';

    for (let [reportSymbol, value] of Object.entries(reportSymbolsMap)) {
        const paddedValue = padStart(value, 10, '0');
        data += `${michpalId}${yymm}${employeeMichpalId}${employeeUid}${BRUTO_NETO_CODE}${CLIENT_EXISTENCE}${reportSymbol}${paddedValue}${sign}${UNIT_PRICE}${UNIT_PRICE_SIGN}${CLIENT_CODE}${RESERVED}${RECORD_CODE}\n`;
    }

    return data;
};

const createMonthlyReport = (shifts, year, month, company) => {
    // Consts
    const michpalId = company.settings.michpalId || "442";
    const yymm = year + month;

    const employeeReports = createEmployeeReports(shifts, company.settings);

    let aggregateData = "";
    for (let employeeReport of employeeReports) {
        const data = generateEmployeeData(employeeReport, michpalId, yymm);
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
