const {generateEmployeeData} = require("../managers/MichpalManager");
const expect = require('chai').expect;

describe('Michpal', () => {
    it ('Generate line in report', () => {
        // Consts
        const michpalId = "13";
        const yymm = "2003";
        const employeeReport = {
            michpalId: "5",
            uid: "313790552",
            shiftsCount: 6,
            overallHours: 53.95,
            regularHours: 40,
            extra125Hours: 13.95
        };

        const michpalSettings = {
            regularHoursCode: 44,
            extra125HoursCode: 45
        };

        const line = generateEmployeeData(employeeReport, michpalId, yymm, michpalSettings);
        console.log(line);
    });
});
