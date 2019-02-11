const EDayType = require("../models/EDayType");
const analyzeDayType = require("./HolidayAnalyzer").analyzeDayType;
const moment = require('moment-timezone');
const ETransportPaymentPer = require("../models/ETransportPaymentPer");
moment.tz.setDefault("Asia/Jerusalem");

const REGULAR_SHIFT_LENGTH = 9;
const SHIFT_125_OVERDUE_LENGTH = 2;
const MINIMUM_SHIFT_LENGTH_FOR_BREAK = 6;
const EmptyAdditionalInfo = {
    shiftLength: 0,
    regularHours : 0,
    extra125Hours: 0,
    extra150Hours: 0,
    extra175Hours: 0,
    extra200Hours: 0,
};

const EmptySettings = {
    eveningHolidayStartHour: 18,
    holidayEndHour: 19,
    holidayShiftLength: 9
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
    let breakLength = calcBreakLength(shift.breakLength, settings.breakLength);

    if (!isShiftValid(clockIn, clockOut))
        return EmptyAdditionalInfo;

    let analyzedHours;
    let dayType = analyzeDayType(clockIn);
    switch (dayType) {
        case EDayType.Holiday:
            analyzedHours = analyzeHolidayShiftHours(clockIn, clockOut, breakLength, settings);
            break;
        case EDayType.HolidayEvening:
            analyzedHours = analyzeHolidayEveningShiftHours(clockIn, clockOut, breakLength, settings);
            break;
        case EDayType.Regular:
        default:
            analyzedHours = analyzeRegularDayShiftHours(clockIn, clockOut, breakLength, settings, REGULAR_SHIFT_LENGTH);
            break;
    }

    return roundAnalyzedHours(analyzedHours);
};

const roundAnalyzedHours = (analyzedHours) => {
    // Using the + before the variable to avoid changing number to string  https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
    return {
        shiftLength: +analyzedHours.shiftLength.toFixed(2),
        regularHours: +analyzedHours.regularHours.toFixed(2),
        extra125Hours: +analyzedHours.extra125Hours.toFixed(2),
        extra150Hours: +analyzedHours.extra150Hours.toFixed(2),
        extra175Hours: +analyzedHours.extra175Hours.toFixed(2),
        extra200Hours: +analyzedHours.extra200Hours.toFixed(2),
    };
};

const isShiftValid = (clockIn, clockOut) => {
    if (!clockOut.isValid() || !clockIn.isValid())
        return false;
    return true;
};

const analyzeHolidayShiftHours = (clockIn, clockOut, breakLength, settings) => {
    let holidayEndHour = moment(clockIn).hour(settings.holidayEndHour).startOf('hour');

    let regularHoursAdditionalInfo = analyzeRegularDayShiftHours(clockIn, clockOut, breakLength, settings, settings.holidayShiftLength);

    if (holidayEndHour.isAfter(clockOut))
        return analyzeWholeShiftInHolidayHours(clockIn, clockOut, breakLength, settings);

    if (holidayEndHour.isBefore(clockIn))
        return regularHoursAdditionalInfo;

    let holidayHoursShiftLength = holidayEndHour.diff(clockIn, 'hours', true);

    if (holidayHoursShiftLength > settings.holidayShiftLength) {
        regularHoursAdditionalInfo.extra150Hours += regularHoursAdditionalInfo.regularHours;
        holidayHoursShiftLength -= regularHoursAdditionalInfo.regularHours;
        regularHoursAdditionalInfo.regularHours = 0;
    }
    else {
        regularHoursAdditionalInfo.regularHours -= holidayHoursShiftLength;
        regularHoursAdditionalInfo.extra150Hours += holidayHoursShiftLength;
        return regularHoursAdditionalInfo;
    }

    if (holidayHoursShiftLength > SHIFT_125_OVERDUE_LENGTH) {
        regularHoursAdditionalInfo.extra175Hours += regularHoursAdditionalInfo.extra125Hours;
        holidayHoursShiftLength -= regularHoursAdditionalInfo.extra125Hours;
        regularHoursAdditionalInfo.extra125Hours = 0;
    }
    else {
        regularHoursAdditionalInfo.extra125Hours -= holidayHoursShiftLength;
        regularHoursAdditionalInfo.extra175Hours += holidayHoursShiftLength;
        return regularHoursAdditionalInfo;
    }

    regularHoursAdditionalInfo.extra150Hours -= holidayHoursShiftLength;
    regularHoursAdditionalInfo.extra200Hours += holidayHoursShiftLength;

    return regularHoursAdditionalInfo;
};

const analyzeHolidayEveningShiftHours = (clockIn, clockOut, breakLength, settings) => {
    let eveningHolidayStartHour = moment(clockIn).hour(settings.eveningHolidayStartHour).startOf('hour');

    let holidayAdditionalInfo = analyzeWholeShiftInHolidayHours(clockIn, clockOut, breakLength, settings);

    if (eveningHolidayStartHour.isBefore(clockIn))
        return holidayAdditionalInfo;

    if (eveningHolidayStartHour.isAfter(clockOut))
        return analyzeRegularDayShiftHours(clockIn, clockOut, breakLength, settings, settings.holidayShiftLength);

    let regularHoursShiftLength = eveningHolidayStartHour.diff(clockIn, 'hours', true);

    // Subtract from extra 150 hours
    if (regularHoursShiftLength > settings.holidayShiftLength) {
        holidayAdditionalInfo.regularHours = holidayAdditionalInfo.extra150Hours;
        regularHoursShiftLength -= holidayAdditionalInfo.extra150Hours;
        holidayAdditionalInfo.extra150Hours = 0;
    }
    else {
        holidayAdditionalInfo.extra150Hours -= regularHoursShiftLength;
        holidayAdditionalInfo.regularHours = regularHoursShiftLength;
        return holidayAdditionalInfo;
    }

    if (regularHoursShiftLength > SHIFT_125_OVERDUE_LENGTH) {
        holidayAdditionalInfo.extra125Hours = holidayAdditionalInfo.extra175Hours;
        regularHoursShiftLength -= holidayAdditionalInfo.extra175Hours;
        holidayAdditionalInfo.extra175Hours = 0;
    }
    else {
        holidayAdditionalInfo.extra175Hours -= regularHoursShiftLength;
        holidayAdditionalInfo.extra125Hours = regularHoursShiftLength;
        return holidayAdditionalInfo;
    }

    holidayAdditionalInfo.extra200Hours -= regularHoursShiftLength;
    holidayAdditionalInfo.extra150Hours = regularHoursShiftLength;

    return holidayAdditionalInfo;
};

function calcBreakLength(shiftBreakLength, companyBreakLength) {
    // if (shiftLength > MINIMUM_SHIFT_LENGTH_FOR_BREAK)
    //     shiftLength -= breakLength;

    let breakLength = !!shiftBreakLength ? shiftBreakLength : companyBreakLength;
    return breakLength / 60;
}

function shouldHaveBreak (shiftLength) {
    return shiftLength > MINIMUM_SHIFT_LENGTH_FOR_BREAK;
}

/**
 * Substract break from shiftLength
 * https://www.kolzchut.org.il/he/%D7%94%D7%A4%D7%A1%D7%A7%D7%95%D7%AA_%D7%91%D7%A2%D7%91%D7%95%D7%93%D7%94
 * @param shiftLength
 * @param breakLength
 * @returns {*}
 */
function subtractBreak(shiftLength, breakLength) {
    if (shouldHaveBreak(shiftLength))
        shiftLength -= breakLength;

    return shiftLength;
}

const analyzeRegularDayShiftHours = (clockIn, clockOut, breakLength, settings, regularHoursInShift) => {
    let shiftLength = clockOut.diff(clockIn, 'hours', true);
    /** TODO 2 bugs:
     * 1. in the report shift that is shorter than 6 still has a break displayed
     * 2. 150% got -2...
     * @type {*}
     */

    shiftLength = subtractBreak(shiftLength, breakLength);

    if (!shiftLength)
        return EmptyAdditionalInfo;

    // TODO breakLengh should be on he analyzedHours that reach the report
    let analyzedHours = Object.assign({}, EmptyAdditionalInfo, {shiftLength, breakLength});
    if (shiftLength <= regularHoursInShift) {
        return Object.assign({}, analyzedHours, {regularHours: shiftLength});
    }
    else {
        return Object.assign({}, analyzedHours, {
            regularHours: regularHoursInShift,
            extra125Hours: calcExtra25PercentHours(shiftLength, regularHoursInShift),
            extra150Hours: calcExtra50PercentHours(shiftLength, regularHoursInShift),
            extra175Hours: 0,
            extra200Hours: 0,
        });
    }
};

const analyzeWholeShiftInHolidayHours = (clockIn, clockOut, breakLength, settings) => {
    let shiftLength = clockOut.diff(clockIn, 'hours', true);
    shiftLength = subtractBreak(shiftLength, breakLength);

    if (!shiftLength)
        return EmptyAdditionalInfo;

    let analyzedHours = Object.assign({}, EmptyAdditionalInfo, {shiftLength, breakLength});
    if (shiftLength <= settings.holidayShiftLength) {
        return Object.assign({}, analyzedHours, {extra150Hours: shiftLength});
    }
    else {
        return Object.assign({}, analyzedHours, {
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

function calcExtra50PercentHours(shiftLength, regularHoursInShift) {
    if (!regularHoursInShift)
        regularHoursInShift = REGULAR_SHIFT_LENGTH

    if (shiftLength <= regularHoursInShift + SHIFT_125_OVERDUE_LENGTH) {
        return 0;
    }

    return shiftLength - (regularHoursInShift + SHIFT_125_OVERDUE_LENGTH);
}


let calcMonthlyCommuteCost = function (user) {
    let totalPublicTransportation = 0;

    user.shifts.forEach(shift => {
        if (!shift.commuteCost)
            return;

        let {publicTransportation} = shift.commuteCost;

        totalPublicTransportation += publicTransportation || 0;
    });

    // Calculate overall monthly transportation fees according to employees settings
    let monthlyTransportationCost = user.transportPaymentPer === ETransportPaymentPer.MONTHLY ?
        user.transportation :
        user.shifts.length * user.transportation;

    return totalPublicTransportation + monthlyTransportationCost;
};

function calcMonthlyExtraPay(user) {
    let monthlyExtraPay = 0;

    user.shifts.forEach(shift => {
        if (!shift.extraPay)
            return;

        monthlyExtraPay += shift.extraPay;
    });

    return monthlyExtraPay;
}

function createUserAdditionalInfo(user, settings) {
    if (!user || !user.shifts)
        return user;

    let info = {
        shiftLength: 0,
        regularHours : 0,
        extra125Hours: 0,
        extra150Hours: 0,
        extra175Hours: 0,
        extra200Hours: 0,
    };

    user.shifts.forEach((shift) => {
        let hoursAnalysis = analyzeShiftHours(shift, settings);
        info.shiftLength += hoursAnalysis.shiftLength;
        info.regularHours += hoursAnalysis.regularHours;
        info.extra125Hours += hoursAnalysis.extra125Hours;
        info.extra150Hours += hoursAnalysis.extra150Hours;
        info.extra175Hours += hoursAnalysis.extra175Hours;
        info.extra200Hours += hoursAnalysis.extra200Hours;
        shift.hoursAnalysis = hoursAnalysis;
    });

    info.shiftsCount = user.shifts.length;
    info.transportation = user.transportPaymentPer === ETransportPaymentPer.MONTHLY ? "-" : user.transportation;
    info.monthlyCommuteCost = calcMonthlyCommuteCost(user, settings);
    info.monthlyExtraPay = calcMonthlyExtraPay(user);

    // Rounding results
    info.overallHours = (info.regularHours + info.extra125Hours * 1.25 + info.extra150Hours * 1.5 + info.extra175Hours * 1.75 + info.extra200Hours * 2).toFixed(2);
    info.regularHours = info.regularHours.toFixed(2);
    info.extra125Hours = info.extra125Hours.toFixed(2);
    info.extra150Hours = info.extra150Hours.toFixed(2);
    info.extra175Hours = info.extra175Hours.toFixed(2);
    info.extra200Hours = info.extra200Hours.toFixed(2);
    info.overallSalary = (info.overallHours * user.hourWage + info.monthlyCommuteCost + info.monthlyExtraPay).toFixed(2);
    return info;
}

const createEmployeeShiftsReports = (shifts, settings) => {
    settings = settings || EmptySettings;
    let map = processUsersToShifts(shifts);
    let usersArray = processUsersAdditionalInfo(map, settings);
    return usersArray;
};

module.exports = {
    createEmployeeShiftsReports,
    analyzeShiftHours,
    REGULAR_SHIFT_LENGTH,
    SHIFT_125_OVERDUE_LENGTH,
    shouldHaveBreak,
};
