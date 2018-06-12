let moment = require('moment');
const SHIFT_125_OVERDUE_LENGTH = require("../managers/ShiftAnalyzer").SHIFT_125_OVERDUE_LENGTH;
const REGULAR_SHIFT_LENGTH = require("../managers/ShiftAnalyzer").REGULAR_SHIFT_LENGTH;
const analyzeHours = require("../managers/ShiftAnalyzer").analyzeShiftHours;
const expect = require('chai').expect;

function createMockedShift(length) {
    let clockInTime = moment().day("Monday").startOf('hour');
    return {
        clockInTime: clockInTime,
        clockOutTime: moment(clockInTime).add(length, 'hours')
    };
}

const createMockedEveningHolidayShift = (overallLength, regularHoursLength) => {
    // Assuming evening holiday starts at 18
    let clockInTime = moment().day("Friday").hour(settings.eveningHolidayStartHour - regularHoursLength).startOf('hour');

    return {
        clockInTime: clockInTime,
        clockOutTime: moment(clockInTime).add(overallLength, 'hours')
    };
}

const createMockedHolidayShift = (overallLength, holidayHoursLength) => {
    // Assuming holiday ends at 19
    let clockInTime = moment().day("Saturday").hour(settings.holidayEndHour - holidayHoursLength).startOf('hour');

    return {
        clockInTime: clockInTime,
        clockOutTime: moment(clockInTime).add(overallLength, 'hours')
    };
}

const settings = {
    eveningHolidayStartHour: 18,
    holidayEndHour: 19,
    holidayShiftLength: 7
};

describe('ShiftAnalyzer', function () {
    describe('Regular Day', function () {
        it('full regular shift', function () {
            const shift = createMockedShift(REGULAR_SHIFT_LENGTH);
            const hours = analyzeHours(shift);

            expect(hours.regularHours).to.be.equal(REGULAR_SHIFT_LENGTH);
            expect(hours.extra125Hours).to.be.equal(0);
            expect(hours.extra150Hours).to.be.equal(0);

        });

        it('part regular shift', function () {
            const shift = createMockedShift(4.5);
            const hours = analyzeHours(shift);

            expect(hours.regularHours).to.be.equal(4.5);
            expect(hours.extra125Hours).to.be.equal(0);
            expect(hours.extra150Hours).to.be.equal(0);

        });

        it('part overdue 125 shift test1', function () {
            const shift = createMockedShift(REGULAR_SHIFT_LENGTH + 0.5);
            const hours = analyzeHours(shift);

            expect(hours.regularHours).to.be.equal(REGULAR_SHIFT_LENGTH);
            expect(hours.extra125Hours).to.be.equal(0.5);
            expect(hours.extra150Hours).to.be.equal(0);

        });

        it('part overdue 125 shift test2', function () {
            const shift = createMockedShift(REGULAR_SHIFT_LENGTH + SHIFT_125_OVERDUE_LENGTH);
            const hours = analyzeHours(shift);

            expect(hours.regularHours).to.be.equal(REGULAR_SHIFT_LENGTH);
            expect(hours.extra125Hours).to.be.equal(SHIFT_125_OVERDUE_LENGTH);
            expect(hours.extra150Hours).to.be.equal(0);

        });

        it('part overdue 150 shift test2', function () {
            const shift = createMockedShift(REGULAR_SHIFT_LENGTH + SHIFT_125_OVERDUE_LENGTH + 3.5);
            const hours = analyzeHours(shift);

            expect(hours.regularHours).to.be.equal(REGULAR_SHIFT_LENGTH);
            expect(hours.extra125Hours).to.be.equal(SHIFT_125_OVERDUE_LENGTH);
            expect(hours.extra150Hours).to.be.equal(3.5);

        });

        it('12:00 - 00:00 test', function () {
            const shift = {
                clockInTime: moment().hour(12).startOf('hour'),
                clockOutTime: moment().add(1, 'days').startOf('day'),
            };
            const hours = analyzeHours(shift);

            expect(hours.regularHours).to.be.equal(REGULAR_SHIFT_LENGTH);
            expect(hours.extra125Hours).to.be.equal(SHIFT_125_OVERDUE_LENGTH);
            expect(hours.extra150Hours).to.be.equal(12 - REGULAR_SHIFT_LENGTH - SHIFT_125_OVERDUE_LENGTH);
        });
    });

    describe('Evening Holiday Day', function () {
        let HOLIDAY_SHIFT_LENGTH = settings.holidayShiftLength;

        it('regular shift in evening holiday', function () {
            const shift = createMockedEveningHolidayShift(4.5, 4.5);
            const hours = analyzeHours(shift, settings);

            expect(hours.regularHours).to.be.equal(4.5);
        });

        it('evening holiday occurs during HOLIDAY_SHIFT_LENGTH - less than full shift length', function () {
            const shift = createMockedEveningHolidayShift(HOLIDAY_SHIFT_LENGTH, 3);
            const hours = analyzeHours(shift, settings);

            expect(hours.regularHours).to.be.equal(3);
            expect(hours.extra150Hours).to.be.equal(HOLIDAY_SHIFT_LENGTH - 3);

        });

        it('evening holiday occurs during HOLIDAY_SHIFT_LENGTH - go into 25 percent bonus ', function () {
            const shift = createMockedEveningHolidayShift(HOLIDAY_SHIFT_LENGTH + 1, 3);
            const hours = analyzeHours(shift, settings);

            expect(hours.regularHours).to.be.equal(3);
            expect(hours.extra150Hours).to.be.equal(HOLIDAY_SHIFT_LENGTH - 3);
            expect(hours.extra175Hours).to.be.equal(1);
        });

        it('evening holiday occurs during HOLIDAY_SHIFT_LENGTH - go into 50 percent bonus', function () {
            const shift = createMockedEveningHolidayShift(HOLIDAY_SHIFT_LENGTH + 6, 3);
            const hours = analyzeHours(shift, settings);

            expect(hours.regularHours).to.be.equal(3);
            expect(hours.extra150Hours).to.be.equal(HOLIDAY_SHIFT_LENGTH - 3);
            expect(hours.extra175Hours).to.be.equal(2);
            expect(hours.extra200Hours).to.be.equal(4);
        });

        it('evening holiday occurs after HOLIDAY_SHIFT_LENGTH - go into 25 percent bonus ', function () {
            const shift = createMockedEveningHolidayShift(HOLIDAY_SHIFT_LENGTH + 1, HOLIDAY_SHIFT_LENGTH);
            const hours = analyzeHours(shift, settings);

            expect(hours.regularHours).to.be.equal(HOLIDAY_SHIFT_LENGTH);
            expect(hours.extra125Hours).to.be.equal(0);
            expect(hours.extra175Hours).to.be.equal(1);

        });

        it('evening holiday occurs after HOLIDAY_SHIFT_LENGTH - go into 50 percent bonus', function () {
            const shift = createMockedEveningHolidayShift(HOLIDAY_SHIFT_LENGTH + 6, HOLIDAY_SHIFT_LENGTH + 1);
            const hours = analyzeHours(shift, settings);

            expect(hours.regularHours).to.be.equal(HOLIDAY_SHIFT_LENGTH);
            expect(hours.extra125Hours).to.be.equal(1);
            expect(hours.extra175Hours).to.be.equal(1);
            expect(hours.extra200Hours).to.be.equal(4);
        });

        it('evening holiday occurs after HOLIDAY_SHIFT_LENGTH + 2 - go into 50 percent bonus', function () {
            const shift = createMockedEveningHolidayShift(HOLIDAY_SHIFT_LENGTH + 6, HOLIDAY_SHIFT_LENGTH + 2);
            const hours = analyzeHours(shift, settings);

            expect(hours.regularHours).to.be.equal(HOLIDAY_SHIFT_LENGTH);
            expect(hours.extra125Hours).to.be.equal(2);
            expect(hours.extra200Hours).to.be.equal(4);
        });

        it('evening holiday 17:30 to 03:00', function () {
            const shift = {
                clockInTime: moment('01/12/2017 17:30', 'DD/MM/YYYY HH:mm'),
                clockOutTime: moment('02/12/2017 03:00', 'DD/MM/YYYY HH:mm'),
            };

            const hours = analyzeHours(shift, settings);

            expect(hours.regularHours).to.be.equal(0.5);
            expect(hours.extra150Hours).to.be.equal(6.5);
            expect(hours.extra175Hours).to.be.equal(2);
            expect(hours.extra200Hours).to.be.equal(0.5);
        });

    });

    describe('Holiday Day', function () {
        let HOLIDAY_SHIFT_LENGTH = settings.holidayShiftLength;

        it('regular shift in holiday', function () {
            const shift = createMockedHolidayShift(4.5, 0);
            const hours = analyzeHours(shift, settings);

            expect(hours.regularHours).to.be.equal(4.5);
        });

        it('holiday occurs during HOLIDAY_SHIFT_LENGTH - less than full shift length', function () {
            const shift = createMockedHolidayShift(HOLIDAY_SHIFT_LENGTH, 3);
            const hours = analyzeHours(shift, settings);

            expect(hours.regularHours).to.be.equal(HOLIDAY_SHIFT_LENGTH - 3);
            expect(hours.extra150Hours).to.be.equal(3);

        });

        it('holiday occurs during HOLIDAY_SHIFT_LENGTH - go into 25 percent bonus ', function () {
            const shift = createMockedHolidayShift(HOLIDAY_SHIFT_LENGTH + 1, 3);
            const hours = analyzeHours(shift, settings);

            expect(hours.regularHours).to.be.equal(HOLIDAY_SHIFT_LENGTH - 3);
            expect(hours.extra125Hours).to.be.equal(1);
            expect(hours.extra150Hours).to.be.equal(3);
        });

        it('holiday occurs during HOLIDAY_SHIFT_LENGTH - go into 50 percent bonus', function () {
            const shift = createMockedHolidayShift(HOLIDAY_SHIFT_LENGTH + 6, 3);
            const hours = analyzeHours(shift, settings);

            expect(hours.regularHours).to.be.equal(HOLIDAY_SHIFT_LENGTH - 3);
            expect(hours.extra150Hours).to.be.equal(7); // 3 first holiday hours + 4 hours in the end (150%)
            expect(hours.extra125Hours).to.be.equal(2);
        });

        it('holiday occurs after HOLIDAY_SHIFT_LENGTH - go into 25 percent bonus ', function () {
            const shift = createMockedHolidayShift(HOLIDAY_SHIFT_LENGTH + 1, HOLIDAY_SHIFT_LENGTH);
            const hours = analyzeHours(shift, settings);

            expect(hours.extra150Hours).to.be.equal(HOLIDAY_SHIFT_LENGTH);
            expect(hours.extra125Hours).to.be.equal(1);
        });

        it('holiday occurs after HOLIDAY_SHIFT_LENGTH - go into 50 percent bonus', function () {
            const shift = createMockedHolidayShift(HOLIDAY_SHIFT_LENGTH + 6, HOLIDAY_SHIFT_LENGTH + 1);
            const hours = analyzeHours(shift, settings);

            expect(hours.extra150Hours).to.be.equal(HOLIDAY_SHIFT_LENGTH + 4); // HOLIDAY_SHIFT_LENGTH hours are holiday hours, and 4 more in the end are 150%
            expect(hours.extra175Hours).to.be.equal(1);
            expect(hours.extra125Hours).to.be.equal(1);
        });

        it('holiday occurs after HOLIDAY_SHIFT_LENGTH + 2 - go into 50 percent bonus', function () {
            const shift = createMockedHolidayShift(HOLIDAY_SHIFT_LENGTH + 6, HOLIDAY_SHIFT_LENGTH + 2);
            const hours = analyzeHours(shift, settings);

            expect(hours.extra150Hours).to.be.equal(HOLIDAY_SHIFT_LENGTH + 4); // HOLIDAY_SHIFT_LENGTH hours are holiday hours, and 4 more in the end are 150%
            expect(hours.extra175Hours).to.be.equal(2);
        });

        it('holiday 17:30 to 03:00', function () {
            const shift = {
                clockInTime: moment('02/12/2017 17:30', 'DD/MM/YYYY HH:mm'),
                clockOutTime: moment('03/12/2017 03:00', 'DD/MM/YYYY HH:mm'),
            };

            const hours = analyzeHours(shift, settings);

            expect(hours.regularHours).to.be.equal(5.5);
            expect(hours.extra125Hours).to.be.equal(2);
            expect(hours.extra150Hours).to.be.equal(2);
        });
    })
});
