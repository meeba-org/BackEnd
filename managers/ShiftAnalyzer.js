const EDayType = require("../models/EDayType");
const EInsideWorkplace = require("../models/EInsideWorkplace");
const analyzeDayType = require("./HolidayAnalyzer").analyzeDayType;
const moment = require('moment-timezone');
const ETransportPaymentPer = require("../models/ETransportPaymentPer");
moment.tz.setDefault("Asia/Jerusalem");

const REGULAR_SHIFT_LENGTH = 9;
const SHIFT_125_OVERDUE_LENGTH = 2;
const MINIMUM_SHIFT_LENGTH_FOR_BREAK = 6;
const EmptyAdditionalInfo = {
    shiftLength: 0,
    breakLength: 0,
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

const mapUsersToShifts = function (shifts) {
    let usersToShiftsMap = {};

    if (!shifts || shifts.length === 0)
        return usersToShiftsMap;

    shifts.forEach((shift) => {
        let clonedShift = Object.assign({}, shift);

        if (!clonedShift.user) // Not suppose to happen but for protection
            return;

        if (usersToShiftsMap[clonedShift.user._id]) {
            const id = clonedShift.user._id;
            clonedShift.user = clonedShift.user._id;
            usersToShiftsMap[id].shifts.push(clonedShift);
        }
        else {
            let clonedUser = Object.assign({}, shift.user);

            clonedShift.user = clonedShift.user._id;
            clonedUser.shifts = [clonedShift];
            usersToShiftsMap[clonedUser._id] = clonedUser;
        }
    });
    const keys = Object.keys(usersToShiftsMap);
    return keys.map((key) => usersToShiftsMap[key]); // return the users
};

const mapTasksToShifts = function (shifts) {
    let tasksToShiftsMap = {};

    if (!shifts || shifts.length === 0)
        return tasksToShiftsMap;

    shifts.forEach((shift) => {
        if (!shift.task || !shift.task._id)
            return;

        let clonedShift = Object.assign({}, shift);

        if (tasksToShiftsMap[clonedShift.task._id]) {
            const id = clonedShift.task._id;
            clonedShift.task = clonedShift.task._id;
            tasksToShiftsMap[id].shifts.push(clonedShift);
        }
        else {
            let clonedTask = Object.assign({}, shift.task);

            clonedShift.task = clonedShift.task._id;
            clonedTask.shifts = [clonedShift];
            tasksToShiftsMap[clonedTask._id] = clonedTask;
        }
    });
    const keys = Object.keys(tasksToShiftsMap);
    return keys.map((key) => tasksToShiftsMap[key]); // return the users
};

let createEmployeeAdditionalInfo = function (entity, company) {
    let additionalInfo = createAdditionalInfo(entity, company);

    // Add Employee specific additional info
    additionalInfo.transportation = entity.transportPaymentPer === ETransportPaymentPer.MONTHLY ? "-" : entity.transportation;
    additionalInfo.monthlyCommuteCost = calcMonthlyCommuteCost(entity);
    additionalInfo.monthlyExtraPay = calcMonthlyExtraPay(entity);
    additionalInfo.innovativeAuthorityPercentage = calcInnovativeAuthorityPercentage(entity);
    additionalInfo.outOfOfficePercentage = calcOutOfOfficePercentage(entity);
    additionalInfo.overallSalary = (additionalInfo.overallHours * entity.hourWage + additionalInfo.monthlyCommuteCost + additionalInfo.monthlyExtraPay).toFixed(2);

    return additionalInfo;
};

function processEmployeeAdditionalInfo(map, company) {
    if (Object.keys(map).length === 0)
        return [];

    const additionalInfos = map.map((entity) => {
        return createEmployeeAdditionalInfo(entity, company);
    });

    return additionalInfos;
}

const createTaskAdditionalInfo = (entity, company) => {
    let additionalInfo = createAdditionalInfo(entity, company);

    // Add Task specific additional info
    return additionalInfo;
};

const processTaskAdditionalInfo = (map, company) => {
    if (Object.keys(map).length === 0)
        return [];

    const additionalInfos = map.map((entity) => {
        return createTaskAdditionalInfo(entity, company);
    });

    return additionalInfos;
};

const analyzeShiftHours = (shift, settings) => {
    let clockOut = moment(shift.clockOutTime);
    let clockIn = moment(shift.clockInTime);
    let breakLength = calcBreakLength(shift, settings.breakLength);

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
        case EDayType.IndependenceDay:
            analyzedHours = analyzeWholeShiftInHolidayHours(clockIn, clockOut, breakLength, settings);
            break;
        case EDayType.Regular:
        default:
            analyzedHours = analyzeRegularDayShiftHours(clockIn, clockOut, breakLength, settings, settings.regularShiftLength || REGULAR_SHIFT_LENGTH);
            break;
    }

    return roundAnalyzedHours(analyzedHours);
};

const roundAnalyzedHours = (analyzedHours) => {
    // Using the + before the variable to avoid changing number to string  https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
    return {
        shiftLength: +analyzedHours.shiftLength.toFixed(2),
        breakLength: +analyzedHours.breakLength.toFixed(2),
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

function calcBreakLength(shift, companyBreakLength) {
    let clockOut = moment(shift.clockOutTime);
    let clockIn = moment(shift.clockInTime);
    let shiftLength = calcShiftLength(clockOut, clockIn);

    // If user define break for this shift we take it into account
    if (!shift.breakLength && !shouldHaveBreak(shiftLength))
        return 0;

    let shiftBreakLength = shift.breakLength;
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
    // Stupid user protection - Does not make sense to have breakLength > shiftLength
    if (breakLength > shiftLength)
        return 0;

    return shiftLength - breakLength;
}

function calcShiftLength(clockOut, clockIn) {
    return clockOut.diff(clockIn, 'hours', true);
}

function getEmptyAdditionalInfo(breakLength) {
    return Object.assign({}, EmptyAdditionalInfo, {breakLength})
}

const analyzeRegularDayShiftHours = (clockIn, clockOut, breakLength, settings, regularHoursInShift) => {
    let shiftLength = calcShiftLength(clockOut, clockIn);
    shiftLength = subtractBreak(shiftLength, breakLength);

    let emptyAdditionalInfo = getEmptyAdditionalInfo(breakLength);
    if (!shiftLength)
        return emptyAdditionalInfo;

    let analyzedHours = Object.assign({}, emptyAdditionalInfo, {shiftLength});
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
    let shiftLength = calcShiftLength(clockOut, clockIn);
    shiftLength = subtractBreak(shiftLength, breakLength);

    let emptyAdditionalInfo = getEmptyAdditionalInfo(breakLength);
    if (!shiftLength)
        return emptyAdditionalInfo;

    let analyzedHours = Object.assign({}, emptyAdditionalInfo, {shiftLength});
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
    if (shiftLength <= regularShiftLength)
        return 0;

    shiftLength -= regularShiftLength;
    if (shiftLength > SHIFT_125_OVERDUE_LENGTH)
        return SHIFT_125_OVERDUE_LENGTH;

    return shiftLength;
}

function calcExtra50PercentHours(shiftLength, regularHoursInShift) {
    if (shiftLength <= regularHoursInShift + SHIFT_125_OVERDUE_LENGTH) {
        return 0;
    }

    return shiftLength - (regularHoursInShift + SHIFT_125_OVERDUE_LENGTH);
}


const calcMonthlyCommuteCost = entity => {
    let totalPublicTransportation = 0;

    entity.shifts.forEach(shift => {
        if (!shift.commuteCost)
            return;

        let {publicTransportation} = shift.commuteCost;

        totalPublicTransportation += publicTransportation || 0;
    });

    // Calculate overall monthly transportation fees according to employees settings
    let monthlyTransportationCost = entity.transportPaymentPer === ETransportPaymentPer.MONTHLY ?
        entity.transportation :
        entity.shifts.length * entity.transportation;

    return totalPublicTransportation + monthlyTransportationCost;
};

function calcMonthlyExtraPay(entity) {
    let monthlyExtraPay = 0;
    
    if (entity.baseSalary)
        monthlyExtraPay += entity.baseSalary;
    
    entity.shifts.forEach(shift => {
        if (!shift.extraPay)
            return;

        monthlyExtraPay += shift.extraPay;
    });

    return monthlyExtraPay;
}

const isInnovativeTaskRelatedShift = shift => {
    return shift.task && shift.task.isInnovative;
};

const calcInnovativeAuthorityPercentage = entity => {
    let innovativeAuthorityHours = 0;
    let totalShiftsLength = 0;

    entity.shifts.forEach(shift => {
        totalShiftsLength += shift.hoursAnalysis.shiftLength;
        if (isInnovativeTaskRelatedShift(shift))
            innovativeAuthorityHours += shift.hoursAnalysis.shiftLength;
    });

    if (totalShiftsLength === 0)
        return 0;

    return (innovativeAuthorityHours / totalShiftsLength).toFixed(2) * 100;
};

// TODO should be removed
const calcOutOfOfficePercentage = (entity) => {
    let oooHours = 0;
    let totalShiftsLength = 0;

    entity.shifts.forEach(shift => {
        totalShiftsLength += shift.hoursAnalysis.shiftLength;
        if (shift.isClockInInsideWorkplace === EInsideWorkplace.OUTSIDE)
            oooHours += shift.hoursAnalysis.shiftLength;
    });

    if (totalShiftsLength === 0)
        return 0;

    return (oooHours / totalShiftsLength).toFixed(2) * 100;
};

/**
 * Source: https://stackoverflow.com/a/51720402/1846993
 * Calculates the haversine distance between point A, and B.
 * @param {location {lng, lat} point A
 * @param {location {lng, lat} point B
 * @param {boolean} isMiles If we are using miles, else km.
 */
const getComputeDistanceBetween = (latlngA, latlngB) => {
    const squared = x => x * x;
    const toRad = x => (x * Math.PI) / 180;
    const R = 6371; // Earth’s mean radius in km

    const dLat = toRad(latlngB.lat - latlngA.lat);
    const dLon = toRad(latlngB.lng - latlngA.lng);

    const dLatSin = squared(Math.sin(dLat / 2));
    const dLonSin = squared(Math.sin(dLon / 2));

    const a = dLatSin +
        (Math.cos(toRad(latlngA.lat)) * Math.cos(toRad(latlngB.lat)) * dLonSin);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    return Math.floor(distance * 1000); // Convert to Meters
};

const calcClockInInsideWorkplace = (location, workplaces) => {
    if (!location || !workplaces || workplaces.length === 0)
        return EInsideWorkplace.NOT_RELEVANT;

    try {
        for (let workplace of workplaces) {
            const wpLocation = workplace.location;
            if (!wpLocation)
                continue;

            const distance = getComputeDistanceBetween(wpLocation, {lat: location.latitude, lng: location.longitude});
            if (distance < workplace.radius)
                return EInsideWorkplace.INSIDE;
        }
        return EInsideWorkplace.OUTSIDE;
    } catch (e) {
        return EInsideWorkplace.NOT_RELEVANT;
    }


};

function createAdditionalInfo(entity, company) {
    if (!entity || !entity.shifts)
        return entity;

    const settings = company.settings || EmptySettings;

    let info = {
        shiftLength: 0,
        regularHours: 0,
        extra125Hours: 0,
        extra150Hours: 0,
        extra175Hours: 0,
        extra200Hours: 0,
    };

    for (let shift of entity.shifts) {
        let hoursAnalysis = analyzeShiftHours(shift, settings);
        info.shiftLength += hoursAnalysis.shiftLength;
        info.regularHours += hoursAnalysis.regularHours;
        info.extra125Hours += hoursAnalysis.extra125Hours;
        info.extra150Hours += hoursAnalysis.extra150Hours;
        info.extra175Hours += hoursAnalysis.extra175Hours;
        info.extra200Hours += hoursAnalysis.extra200Hours;
        shift.hoursAnalysis = hoursAnalysis;
        shift.isClockInInsideWorkplace = calcClockInInsideWorkplace(shift.location, company.workplaces);
    }

    info.shiftsCount = entity.shifts.length;

    // Rounding results
    info.overallHours = (info.regularHours + info.extra125Hours * 1.25 + info.extra150Hours * 1.5 + info.extra175Hours * 1.75 + info.extra200Hours * 2).toFixed(2);
    info.regularHours = info.regularHours.toFixed(2);
    info.extra125Hours = info.extra125Hours.toFixed(2);
    info.extra150Hours = info.extra150Hours.toFixed(2);
    info.extra175Hours = info.extra175Hours.toFixed(2);
    info.extra200Hours = info.extra200Hours.toFixed(2);

    return Object.assign({}, entity, info);
}

function sortEmployees(usersArray) {
    usersArray.sort((u1, u2) => {
        if (u1.fullName < u2.fullName)
            return -1;
        if (u1.fullName > u2.fullName)
            return 1;
        return 0;
    });
}

const createEmployeeReports = (shifts, company) => {
    if (!shifts)
        return [];

    let map = mapUsersToShifts(shifts);
    let usersArray = processEmployeeAdditionalInfo(map, company);
    sortEmployees(usersArray);

    return usersArray;
};

function buildBreadcrumb(task, tasks) {
    let breadcrumbTasks = [];
    let currTask = task ? {...task} : null;

    while (currTask) {
        breadcrumbTasks.push(currTask);
        currTask = tasks.find(t => !!t._id && !!currTask.parent && t._id.toString() === currTask.parent.toString()); // Go up one level
    }
    breadcrumbTasks.reverse(); // Making the root as the first element
    return breadcrumbTasks;
}

function generateTasksBreadcrumb(map, tasks) {
    if (!tasks)
        return;

    map.forEach(task => {
        task.taskBreadCrumb = buildBreadcrumb(task, tasks);
    })
}

function sortTasks(tasksArrayAdditionalInfo) {
    tasksArrayAdditionalInfo.sort((t1, t2) => {
        if (t1.title < t2.title)
            return -1;
        if (t1.title > t2.title)
            return 1;
        return 0;
    });
}

const createTasksReport = (shifts, company, tasks) => {
    if (!shifts)
        return [];

    let map = mapTasksToShifts(shifts);
    generateTasksBreadcrumb(map, tasks);
    let tasksArrayAdditionalInfo = processTaskAdditionalInfo(map, company);
    sortTasks(tasksArrayAdditionalInfo);

    return tasksArrayAdditionalInfo;
};

module.exports = {
    createEmployeeReports,
    createTasksReport,
    analyzeShiftHours,
    REGULAR_SHIFT_LENGTH,
    SHIFT_125_OVERDUE_LENGTH,
    shouldHaveBreak,
    getComputeDistanceBetween,
    calcClockInInsideWorkplace
};
