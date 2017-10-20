import moment from "moment";

export const calculateCurrentDay = () => moment().format("YYYY-MM-DD");

export const createShift = (shift, momentStart, momentEnd) => {
    return {
        ...shift,
        clockInTime: momentStart,
        clockOutTime: momentEnd,
    };
};

export const convertTimeStrToMoment = (startDateStr, startTimeStr, endTimeStr) => {
    let momentStart = moment(startDateStr + ' ' + startTimeStr, 'YYYY-MM-DD HH:mm');
    let momentEnd = moment(startDateStr + ' ' + endTimeStr, 'YYYY-MM-DD HH:mm');

    if (momentEnd.isBefore(momentStart)) {
        momentEnd.add(1, 'days');
    }
    return {momentStart, momentEnd};
};
