import moment from "moment";
import * as ERoles from "./ERoles";

export const DATE_FORMAT = "YYYY-MM-DD";
export const TIME_FORMAT = "HH:mm";
export const DATE_AND_TIME_FORMAT = DATE_FORMAT + ' ' + TIME_FORMAT;
export const calculateCurrentDay = (format) => (!format) ? moment().format(DATE_FORMAT) : moment().format(format);
export const calculateCurrentTime = () => moment().format(TIME_FORMAT);

export const createShift = (employee, momentStart, momentEnd) => {
    return {
        clockInTime: momentStart,
        clockOutTime: momentEnd,
        user: employee,
    };
};

export const createShiftForClockIn = (employee) => {
    return createShift(employee, moment(), null);
};
export const convertTimeStrToMoment = (startDateStr, startTimeStr, endTimeStr) => {
    let momentStart = moment(startDateStr + ' ' + startTimeStr, DATE_AND_TIME_FORMAT);
    let momentEnd = null;

    if (endTimeStr) {
        momentEnd = moment(startDateStr + ' ' + endTimeStr, DATE_AND_TIME_FORMAT);

        if (momentEnd.isBefore(momentStart)) {
            momentEnd.add(1, 'days');
        }
    }
    return {momentStart, momentEnd};
};

export const convertTimeStrToMoment2 = ({startDate, startTime, endTime}) => {
    let momentStart = moment(startDate).hour(startTime.hour()).minute(startTime.minute()).startOf('minute');
    let momentEnd = moment(startDate).hour(endTime.hour()).minute(endTime.minute()).startOf('minute');

    if (momentEnd.isBefore(momentStart)) {
        momentEnd.add(1, 'days');
    }
    return {momentStart, momentEnd};
};

export const ReportModes = {
    Live: 0,
    Report: 1
};

export const convertMomentToTimeStr = (shift) => {
    let {clockInTime, clockOutTime} = shift;
    let startDateStr = moment(clockInTime).format(DATE_FORMAT);
    let startTimeStr = moment(clockInTime).format(TIME_FORMAT);
    let endTimeStr = clockOutTime == null ? null : moment(clockOutTime).format(TIME_FORMAT);
    return {startDateStr, startTimeStr, endTimeStr};
};

export const momentToDay = (momentTime) => {
    let day = moment(momentTime).day();

    switch (day) {
        case 0: return 'א';
        case 1: return 'ב';
        case 2: return 'ג';
        case 3: return 'ד';
        case 4: return 'ה';
        case 5: return 'ו';
        case 6: return 'ש';
    }
};

export const isWorking = (shift) => {
    return !moment(shift.clockOutTime).isValid();
};

export const getCurrentTime = () => moment().format(TIME_FORMAT);

export const isUserAllowedLogin = (user) => {
    if (!user)
        return false;

    return (user.role === ERoles.COMPANY_MANAGER || user.role === ERoles.SHIFT_MANAGER);
};

const zeroFill = (number, width) => {
    width -= number.toString().length;
    if (width > 0) {
        return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + ""; // always return a string
};

export const prepareHourToDisplay = (hoursStr) => {
    let hoursFloat = parseFloat(hoursStr);

    let hourStr = zeroFill(Math.floor(hoursFloat), 2);
    let minuteStr = zeroFill(Math.floor(hoursFloat % 1 * 60), 2);

    return `${hourStr}:${minuteStr}`;
};

export const isBusCostEmpty = (commuteCost) => {
    return !commuteCost
        || (isCommuteDataEmpty(commuteCost.publicTransportation));
};

const isCommuteDataEmpty = (commuteData) => {
    return !commuteData || commuteData === "0";
};

export const isIsraeliIdValid = (id) => {
    if (id === undefined)
        return true;

    let strId = String(id).trim();
    if (strId.length > 9) {
        return false;
    }
    if (strId.length < 9) {
        while (strId.length < 9) strId = "0" + strId;
    }
    let counter = 0, rawVal, actualVal;
    for (let i = 0; i < strId.length; i++) {
        rawVal = Number(strId[i]) * ((i % 2) + 1);
        actualVal = rawVal > 9 ? (rawVal - 9) : rawVal;
        counter += actualVal;
    }
    return (counter % 10 === 0);
};

export const isNumber = (n) => !isNaN(n);

export const debounce = (func, wait, immediate) => {
    let timeout;

    return function executedFunction() {
        let context = this;
        let args = arguments;

        let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        let callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
};
