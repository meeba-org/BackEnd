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
