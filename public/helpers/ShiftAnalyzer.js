import moment from "moment";

const REGULAR_SHIFT_LENGTH = 9;
const SHIFT_125_OVERDUE_LENGTH = 2;

let processUsersToShifts = function (shifts) {
    let usersToShiftsMap = {};

    shifts.forEach((shift) => {
        if (usersToShiftsMap[shift.user.uid]) {
            let uid = shift.user.uid;
            delete shift.user;
            usersToShiftsMap[uid].shifts.push(shift);
        }
        else {
            let user = Object.assign({}, shift.user);
            delete shift.user;
            user.shifts = [shift];
            usersToShiftsMap[user.uid] = user;
        }
    });
    const keys = Object.keys(usersToShiftsMap);
    return keys.map((key) => usersToShiftsMap[key]); // return the users
};

function processUsersAdditionalInfo(userMap) {
    const usersWithAdditionalInfo = userMap.map((user) => {
        let userAdditionalInfo = createUserAdditionalInfo(user);
        return {
            ...user,
            ...userAdditionalInfo
        };
    });

    return usersWithAdditionalInfo;
}

function analyzeHours(shift) {
    let clockOut = moment(shift.clockOutTime);
    let clockIn = moment(shift.clockInTime);

    let additionalInfo = {
        regularHours : 0,
        extra125Hours: 0,
        extra150Hours: 0
    };

    let shiftLength = clockOut.diff(clockIn, 'hours', true);

    if (shiftLength <= REGULAR_SHIFT_LENGTH) {
        return {
            ...additionalInfo,
            regularHours: shiftLength
        };
    }
    else {
        return {
            regularHours: REGULAR_SHIFT_LENGTH,
            extra125Hours: calcExtra125Hours(shiftLength),
            extra150Hours: calcExtra150Hours(shiftLength),
        };
    }
}

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

function createReport(shifts) {
    let map = processUsersToShifts(shifts);
    map = processUsersAdditionalInfo(map);
    return map;
}

module.exports = {
    createReport
    , analyzeHours
    , REGULAR_SHIFT_LENGTH
    , SHIFT_125_OVERDUE_LENGTH
};
