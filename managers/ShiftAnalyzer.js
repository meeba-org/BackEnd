const moment = require('moment');
const DayType = require("./HolidayAnalyzer").DayType;
const analyzeDayType = require("./HolidayAnalyzer").analyzeDayType;

const REGULAR_SHIFT_LENGTH = 9;
const SHIFT_125_OVERDUE_LENGTH = 2;
const EmptyAdditionalInfo = {
    regularHours : 0,
    extra125Hours: 0,
    extra150Hours: 0,
    extra175Hours: 0,
    extra200Hours: 0,
};

let processUsersToShifts = function (shifts) {
    let usersToShiftsMap = {};

    if (!shifts || shifts.length === 0)
        return usersToShiftsMap;

    shifts.forEach((shift) => {
        let clonedShift = Object.assign({}, shift);

        if (usersToShiftsMap[clonedShift.user.uid]) {
            const uid = clonedShift.user.uid;
            clonedShift.user = clonedShift.user._id;
            usersToShiftsMap[uid].shifts.push(clonedShift);
        }
        else {
            let clonedUser = Object.assign({}, shift.user);

            clonedShift.user = clonedShift.user._id;
            clonedUser.shifts = [clonedShift];
            usersToShiftsMap[clonedUser.uid] = clonedUser;
        }
    });
    const keys = Object.keys(usersToShiftsMap);
    return keys.map((key) => usersToShiftsMap[key]); // return the users
};

function processUsersAdditionalInfo(userMap, settings) {
    if (Object.keys(userMap).length === 0)
        return [];

    const usersWithAdditionalInfo = userMap.map((user) => {
        let userAdditionalInfo = createUserAdditionalInfo(user, settings);
        return Object.assign({}, user, userAdditionalInfo);
    });

    return usersWithAdditionalInfo;
}

const analyzeShiftHours = (shift, settings) => {
    let clockOut = moment(shift.clockOutTime);
    let clockIn = moment(shift.clockInTime);

    if (!isShiftValid(clockIn, clockOut))
        return EmptyAdditionalInfo;

    let dayType = analyzeDayType(clockIn);
    switch (dayType) {
        case DayType.Holiday:
            return analyzeHolidayShiftHours(clockIn, clockOut, settings);
        case DayType.HolidayEvening:
            return analyzeHolidayEveningShiftHours(clockIn, clockOut, settings);
        case DayType.Regular:
        default:
            return analyzeRegularDayShiftHours(clockIn, clockOut, settings);
    }
};

const isShiftValid = (clockIn, clockOut) => {
    if (!clockOut.isValid() || !clockIn.isValid())
        return false;
    return true;
};

const analyzeHolidayShiftHours = (clockIn, clockOut, settings) => {
    let holidayEndHour = moment(clockIn).hour(settings.holidayDayEndHour);

    let regularHoursAdditionalInfo = analyzeRegularDayShiftHours(clockIn, clockOut, settings);

    if (holidayEndHour.isAfter(clockOut))
        return analyzeWholeShiftInHolidayHours(clockIn, clockOut, settings);

    if (holidayEndHour.isBefore(clockIn))
        return regularHoursAdditionalInfo;

    let holidayHoursShiftLength = holidayEndHour.diff(clockIn, 'hours', true);

    if (holidayHoursShiftLength > settings.holidayShiftLength) {
        regularHoursAdditionalInfo.extra150Hours = regularHoursAdditionalInfo.regularHours;
        delete regularHoursAdditionalInfo.regularHours;
        holidayHoursShiftLength -= settings.holidayShiftLength;
    }
    else {
        regularHoursAdditionalInfo.regularHours =- holidayHoursShiftLength;
        regularHoursAdditionalInfo.extra150Hours = holidayHoursShiftLength;
        return regularHoursAdditionalInfo;
    }

    if (holidayHoursShiftLength > SHIFT_125_OVERDUE_LENGTH) {
        regularHoursAdditionalInfo.extra175Hours = regularHoursAdditionalInfo.extra125Hours;
        delete regularHoursAdditionalInfo.extra125Hours;
        holidayHoursShiftLength -= settings.holidayShiftLength;
    }
    else {
        regularHoursAdditionalInfo.extra125Hours =- holidayHoursShiftLength;
        regularHoursAdditionalInfo.extra175Hours = holidayHoursShiftLength;
        return regularHoursAdditionalInfo;
    }

    if (holidayHoursShiftLength > 0 && holidayHoursShiftLength > regularHoursAdditionalInfo.extra150Hours) {
        // If we are here something is wrong
        throw new Error("[ShiftAnalyzer.analyzeHolidayShiftHours] - Error in calculation: clockIn:" + clockIn + ", clockOut: " + clockOut);
    }
    else {
        regularHoursAdditionalInfo.extra150Hours =- holidayHoursShiftLength;
        regularHoursAdditionalInfo.extra200Hours = holidayHoursShiftLength;
    }



};

const analyzeHolidayEveningShiftHours = (clockIn, clockOut, settings) => {
    let eveningHolidayStartHour = moment(clockIn).hour(settings.eveningHolidayStartHour);

    let holidayAdditionalInfo = analyzeWholeShiftInHolidayHours(clockIn, clockOut, settings);

    if (eveningHolidayStartHour.isBefore(clockIn))
        return holidayAdditionalInfo;

    if (eveningHolidayStartHour.isAfter(clockOut))
        return analyzeRegularDayShiftHours(clockIn, clockOut, settings);

    let regularHoursShiftLength = eveningHolidayStartHour.diff(clockIn, 'hours', true);

    // Subtract from extra 150 hours
    if (regularHoursShiftLength > settings.holidayShiftLength) {
        holidayAdditionalInfo.regularHours = holidayAdditionalInfo.extra150Hours;
        delete holidayAdditionalInfo.extra150Hours;
        regularHoursShiftLength -= settings.holidayShiftLength;
    }
    else {
        holidayAdditionalInfo.extra150Hours -= regularHoursShiftLength;
        holidayAdditionalInfo.regularHours = regularHoursShiftLength;
        return holidayAdditionalInfo;
    }

    if (regularHoursShiftLength > SHIFT_125_OVERDUE_LENGTH) {
        holidayAdditionalInfo.extra125Hours = holidayAdditionalInfo.extra175Hours;
        delete holidayAdditionalInfo.extra175Hours;
        regularHoursShiftLength -= settings.holidayShiftLength;
    }
    else {
        holidayAdditionalInfo.extra175Hours -= regularHoursShiftLength;
        holidayAdditionalInfo.extra125Hours = regularHoursShiftLength;
        return holidayAdditionalInfo;
    }

    if (regularHoursShiftLength > 0 && regularHoursShiftLength > holidayAdditionalInfo.extra200Hours) {
        // If we are here something is wrong
        throw new Error("[ShiftAnalyzer.analyzeHolidayEveningShiftHours] - Error in calculation: clockIn:" + clockIn + ", clockOut: " + clockOut);
    }
    else {
        holidayAdditionalInfo.extra200Hours -= regularHoursShiftLength;
        holidayAdditionalInfo.extra150Hours = regularHoursShiftLength;
    }

    return holidayAdditionalInfo;
};

const analyzeRegularDayShiftHours = (clockIn, clockOut, settings) => {
    let shiftLength = clockOut.diff(clockIn, 'hours', true);

    if (shiftLength <= REGULAR_SHIFT_LENGTH) {
        return Object.assign({}, EmptyAdditionalInfo, {regularHours: shiftLength});
    }
    else {
        return Object.assign({}, EmptyAdditionalInfo, {
            regularHours: REGULAR_SHIFT_LENGTH,
            extra125Hours: calcExtra25PercentHours(shiftLength),
            extra150Hours: calcExtra50PercentHours(shiftLength),
        });
    }
};

const analyzeWholeShiftInHolidayHours = (clockIn, clockOut, settings) => {
    let shiftLength = clockOut.diff(clockIn, 'hours', true);

    if (shiftLength <= settings.holidayShiftLength) {
        return Object.assign({}, EmptyAdditionalInfo, {extra150Hours: shiftLength});
    }
    else {
        return Object.assign({}, EmptyAdditionalInfo, {
            extra150Hours: settings.holidayShiftLength,
            extra175Hours: calcExtra25PercentHours(shiftLength, settings.holidayShiftLength),
            extra200Hours: calcExtra50PercentHours(shiftLength, settings.holidayShiftLength),
        });
    }
};

function calcExtra25PercentHours(shiftLength, regularShiftLength) {
    if (!regularShiftLength)
        regularShiftLength = REGULAR_SHIFT_LENGTH

    if (shiftLength <= regularShiftLength)
        return 0;

    shiftLength -= regularShiftLength;
    if (shiftLength > SHIFT_125_OVERDUE_LENGTH)
        return SHIFT_125_OVERDUE_LENGTH;

    return shiftLength;
}

function calcExtra50PercentHours(shiftLength, regularShiftLength) {
    if (!regularShiftLength)
        regularShiftLength = REGULAR_SHIFT_LENGTH

    if (shiftLength <= regularShiftLength + SHIFT_125_OVERDUE_LENGTH) {
        return 0;
    }

    return shiftLength - (regularShiftLength + SHIFT_125_OVERDUE_LENGTH);
}


function createUserAdditionalInfo(user, settings) {
    if (!user || !user.shifts)
        return user;

    let info = {
        regularHours : 0,
        extra125Hours: 0,
        extra150Hours: 0
    };
    user.shifts.forEach((shift) => {
        let hours = analyzeShiftHours(shift, settings);
        info.regularHours += hours.regularHours;
        info.extra125Hours += hours.extra125Hours;
        info.extra150Hours += hours.extra150Hours;
    });

    info.shiftsCount = user.shifts.length;
    info.overallTransportation = user.shifts.length * user.transportation;

    // Rounding results
    info.overallHours = (info.regularHours + info.extra125Hours * 1.25 + info.extra150Hours * 1.5).toFixed(2);
    info.regularHours = info.regularHours.toFixed(2);
    info.extra125Hours = info.extra125Hours.toFixed(2);
    info.extra150Hours = info.extra150Hours.toFixed(2);
    info.overallSalary = (info.overallHours * user.hourWage + info.overallTransportation).toFixed(2);
    return info;
}

const createEmployeeShiftsReports = (shifts, settings) => {
    let map = processUsersToShifts(shifts);
    let usersArray = processUsersAdditionalInfo(map, settings);
    return usersArray;
};

module.exports = {
    createEmployeeShiftsReports,
    analyzeShiftHours: analyzeShiftHours,
    REGULAR_SHIFT_LENGTH,
    SHIFT_125_OVERDUE_LENGTH,
};
