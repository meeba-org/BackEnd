let moment = require('moment');
const SHIFT_125_OVERDUE_LENGTH = require("../managers/ShiftAnalyzer").SHIFT_125_OVERDUE_LENGTH;
const REGULAR_SHIFT_LENGTH = require("../managers/ShiftAnalyzer").REGULAR_SHIFT_LENGTH;
const analyzeHours = require("../managers/ShiftAnalyzer").analyzeHours;
const expect = require('chai').expect;

function createMockedShift(length) {
    return {
        clockInTime: new Date(),
        clockOutTime: moment(new Date()).add(length, 'hours')
    };
}

describe('ShiftAnalyzer', function() {
    it('full regular shift', function() {
        const shift = createMockedShift(REGULAR_SHIFT_LENGTH);
        const hours = analyzeHours(shift);

        expect(hours.regularHours).to.be.equal(REGULAR_SHIFT_LENGTH);
        expect(hours.extra125Hours).to.be.equal(0);
        expect(hours.extra150Hours).to.be.equal(0);

    });

    it('part regular shift', function() {
        const shift = createMockedShift(4.5);
        const hours = analyzeHours(shift);

        expect(hours.regularHours).to.be.equal(4.5);
        expect(hours.extra125Hours).to.be.equal(0);
        expect(hours.extra150Hours).to.be.equal(0);

    });

    it('part overdue 125 shift test1', function() {
        const shift = createMockedShift(REGULAR_SHIFT_LENGTH + 0.5);
        const hours = analyzeHours(shift);

        expect(hours.regularHours).to.be.equal(REGULAR_SHIFT_LENGTH);
        expect(hours.extra125Hours).to.be.equal(0.5);
        expect(hours.extra150Hours).to.be.equal(0);

    });

    it('part overdue 125 shift test2', function() {
        const shift = createMockedShift(REGULAR_SHIFT_LENGTH + SHIFT_125_OVERDUE_LENGTH);
        const hours = analyzeHours(shift);

        expect(hours.regularHours).to.be.equal(REGULAR_SHIFT_LENGTH);
        expect(hours.extra125Hours).to.be.equal(SHIFT_125_OVERDUE_LENGTH);
        expect(hours.extra150Hours).to.be.equal(0);

    });

    it('part overdue 150 shift test2', function() {
        const shift = createMockedShift(REGULAR_SHIFT_LENGTH + SHIFT_125_OVERDUE_LENGTH + 3.5);
        const hours = analyzeHours(shift);

        expect(hours.regularHours).to.be.equal(REGULAR_SHIFT_LENGTH);
        expect(hours.extra125Hours).to.be.equal(SHIFT_125_OVERDUE_LENGTH);
        expect(hours.extra150Hours).to.be.equal(3.5);

    });
});
