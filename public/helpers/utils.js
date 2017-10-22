import moment from "moment";

export const calculateCurrentDay = () => moment().format("YYYY-MM-DD");

export const createShift = (employee, momentStart, momentEnd) => {
    return {
        clockInTime: momentStart,
        clockOutTime: momentEnd,
        user: employee._id,
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
