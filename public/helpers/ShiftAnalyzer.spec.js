import moment from "moment";
import {analyzeHours, REGULAR_SHIFT_LENGTH, SHIFT_125_OVERDUE_LENGTH} from "./ShiftAnalyzer";

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

        expect(hours.regularHours).toEqual(REGULAR_SHIFT_LENGTH);
        expect(hours.extra125Hours).toEqual(0);
        expect(hours.extra150Hours).toEqual(0);

    });

    it('part regular shift', function() {
        const shift = createMockedShift(4.5);
        const hours = analyzeHours(shift);

        expect(hours.regularHours).toEqual(4.5);
        expect(hours.extra125Hours).toEqual(0);
        expect(hours.extra150Hours).toEqual(0);

    });

    it('part overdue 125 shift test1', function() {
        const shift = createMockedShift(REGULAR_SHIFT_LENGTH + 0.5);
        const hours = analyzeHours(shift);

        expect(hours.regularHours).toEqual(REGULAR_SHIFT_LENGTH);
        expect(hours.extra125Hours).toEqual(0.5);
        expect(hours.extra150Hours).toEqual(0);

    });

    it('part overdue 125 shift test2', function() {
        const shift = createMockedShift(REGULAR_SHIFT_LENGTH + SHIFT_125_OVERDUE_LENGTH);
        const hours = analyzeHours(shift);

        expect(hours.regularHours).toEqual(REGULAR_SHIFT_LENGTH);
        expect(hours.extra125Hours).toEqual(SHIFT_125_OVERDUE_LENGTH);
        expect(hours.extra150Hours).toEqual(0);

    });

    it('part overdue 150 shift test2', function() {
        const shift = createMockedShift(REGULAR_SHIFT_LENGTH + SHIFT_125_OVERDUE_LENGTH + 3.5);
        const hours = analyzeHours(shift);

        expect(hours.regularHours).toEqual(REGULAR_SHIFT_LENGTH);
        expect(hours.extra125Hours).toEqual(SHIFT_125_OVERDUE_LENGTH);
        expect(hours.extra150Hours).toEqual(3.5);

    });
});
