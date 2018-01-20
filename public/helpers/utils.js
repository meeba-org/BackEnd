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
        user: employee._id,
    };
};

export const createShiftForClockIn = (employee) => {
    return createShift(employee, moment(), null);
};
export const convertTimeStrToMoment = (startDateStr, startTimeStr, endTimeStr) => {
    let momentStart = moment(startDateStr + ' ' + startTimeStr, DATE_AND_TIME_FORMAT);
    let momentEnd = moment(startDateStr + ' ' + endTimeStr, DATE_AND_TIME_FORMAT);

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
    let endTimeStr = clockOutTime == null ? "" : moment(clockOutTime).format(TIME_FORMAT);
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

export const fillBlanks = (str) => str.replace(/\s/g, "0");
