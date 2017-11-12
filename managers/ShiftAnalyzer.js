const moment = require('moment');

const REGULAR_SHIFT_LENGTH = 9;
const SHIFT_125_OVERDUE_LENGTH = 2;

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

function processUsersAdditionalInfo(userMap) {
    if (Object.keys(userMap).length === 0)
        return userMap;

    const usersWithAdditionalInfo = userMap.map((user) => {
        let userAdditionalInfo = createUserAdditionalInfo(user);
        return Object.assign({}, user, userAdditionalInfo);
    });

    return usersWithAdditionalInfo;
}

const analyzeHours = (shift) => {
    let additionalInfo = {
        regularHours : 0,
        extra125Hours: 0,
        extra150Hours: 0
    };

    let clockOut = moment(shift.clockOutTime);
    let clockIn = moment(shift.clockInTime);

    if (!clockOut.isValid() || !clockIn.isValid())
        return additionalInfo;

    let shiftLength = clockOut.diff(clockIn, 'hours', true);

    if (shiftLength <= REGULAR_SHIFT_LENGTH) {
        return Object.assign({}, additionalInfo, {regularHours: shiftLength});
    }
    else {
        return {
            regularHours: REGULAR_SHIFT_LENGTH,
            extra125Hours: calcExtra125Hours(shiftLength),
            extra150Hours: calcExtra150Hours(shiftLength),
        };
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


function createUserAdditionalInfo(user) {
    if (!user || !user.shifts)
        return user;

    let hourSummary = {
        regularHours : 0,
        extra125Hours: 0,
        extra150Hours: 0
    };
    user.shifts.forEach((shift) => {
        let hours = analyzeHours(shift);
        hourSummary.regularHours += hours.regularHours;
        hourSummary.extra125Hours += hours.extra125Hours;
        hourSummary.extra150Hours += hours.extra150Hours;
    });

    // Rounding results
    hourSummary.regularHours = hourSummary.regularHours.toFixed(2);
    hourSummary.extra125Hours = hourSummary.extra125Hours.toFixed(2);
    hourSummary.extra150Hours = hourSummary.extra150Hours.toFixed(2);
    return hourSummary;
}

const createEmployeeShiftsReports = (shifts) => {
    let map = processUsersToShifts(shifts);
    let usersArray = processUsersAdditionalInfo(map);
    return usersArray;
};

module.exports = {
    createEmployeeShiftsReports
};
