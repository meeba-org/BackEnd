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
    if (!isShiftValid(shift))
        return EmptyAdditionalInfo;

    let clockInTime = moment(shift.clockInTime);

    let dayType = analyzeDayType(clockInTime);
    switch (dayType) {
        case DayType.Regular:
        default:
            return analyzeRegularDayShiftHours(shift, settings);
    }
};

const isShiftValid = (shift) => {
    let clockOut = moment(shift.clockOutTime);
    let clockIn = moment(shift.clockInTime);

    if (!clockOut.isValid() || !clockIn.isValid())
        return false;
    return true;
}

const analyzeRegularDayShiftHours = (shift, settings) => {
    let clockOut = moment(shift.clockOutTime);
    let clockIn = moment(shift.clockInTime);

    let shiftLength = clockOut.diff(clockIn, 'hours', true);

    if (shiftLength <= REGULAR_SHIFT_LENGTH) {
        return Object.assign({}, EmptyAdditionalInfo, {regularHours: shiftLength});
    }
    else {
        return Object.assign({}, EmptyAdditionalInfo, {
            regularHours: REGULAR_SHIFT_LENGTH,
            extra125Hours: calcExtra125Hours(shiftLength),
            extra150Hours: calcExtra150Hours(shiftLength),
        });
    }
};

function calcExtra125Hours(shiftLength) {
    if (shiftLength <= REGULAR_SHIFT_LENGTH)
        return 0;

    shiftLength -= REGULAR_SHIFT_LENGTH;
    if (shiftLength > SHIFT_125_OVERDUE_LENGTH)
        return SHIFT_125_OVERDUE_LENGTH;

    return shiftLength;
}

function calcExtra150Hours(shiftLength) {
    if (shiftLength <= REGULAR_SHIFT_LENGTH + SHIFT_125_OVERDUE_LENGTH) {
        return 0;
    }

    return shiftLength - (REGULAR_SHIFT_LENGTH + SHIFT_125_OVERDUE_LENGTH);
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
    analyzeHours: analyzeShiftHours,
    REGULAR_SHIFT_LENGTH,
    SHIFT_125_OVERDUE_LENGTH,
};
