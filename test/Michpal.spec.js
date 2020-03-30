const {generateEmployeeData} = require("../managers/MichpalManager");
const expect = require('chai').expect;

describe('Michpal', () => {
    it ('Generate line in report', () => {
        // Consts
        const michpalId = "13";
        const yymm = "2003";
        const brutoNetoCode = ' ';
        const clientExistance = '0'; // 0 Meaning: report does not include client reporting
        const unitPrice = '0000000000'; // price of each unit - not relevant for our report
        const unitProceSign = '+'; // Not relevant
        const clientCode = '   '; // Not relevant
        const reserved = '      '; // Not relevant
        const recordCode = '1'; // Regular record
        const employeeReport = {
            michpalId: "5",
            uid: "313790552",
            shiftsCount: 6,
            overallHours: 53.95
        };

        const line = generateEmployeeData(employeeReport, michpalId, yymm, brutoNetoCode, clientExistance, unitPrice, unitProceSign, clientCode, reserved, recordCode);
        console.log(line);
        expect(line).to.be.equal("0132003        5313790552 01240000000600+0000000000+         1");
    });
});
