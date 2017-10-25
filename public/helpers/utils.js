import moment from "moment";

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
    Daily: 1
};

export const convertMomentToTimeStr = (shift) => {
    let {clockInTime, clockOutTime} = shift;
    let startDateStr = moment(clockInTime).format(DATE_FORMAT);
    let startTimeStr = moment(clockInTime).format(TIME_FORMAT);
    let endTimeStr = clockOutTime == null ? null : moment(clockOutTime).format(TIME_FORMAT);
    return {startDateStr, startTimeStr, endTimeStr};
};

export const isWorking = (shift) => {
    return !moment(shift.clockOutTime).isValid();
};
