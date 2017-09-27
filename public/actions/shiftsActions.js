import * as actionsTypes from "./actionTypes";
import callApi from "./api";
import {arrayPop, arrayPush} from 'redux-form';
import moment from "moment";

const REGULAR_SHIFT_TIME = 9;

function createShiftStart() {
    return {type: actionsTypes.CREATE_SHIFT_START};
}

function createShiftSuccess() {
    return {
        type: actionsTypes.CREATE_SHIFT_SUCCESS,
    };
}

function createShiftError(json) {
    return {
        type: actionsTypes.CREATE_SHIFT_ERROR,
        data: json
    };
}

function dispatchUpdateNewShiftsInForm(dispatch, newShift) {
    dispatch(arrayPop('shiftsForm', 'shifts'));
    dispatch(arrayPush('shiftsForm', 'shifts', newShift));
}

export function createShift(shift) {
    return function (dispatch) {
        dispatch(createShiftStart());
        return callApi({
            method: 'post',
            url: '/shifts',
            data: shift,
            shouldAuthenticate: true
        }).then(function (response) {
            dispatch(createShiftSuccess(response));
            dispatchUpdateNewShiftsInForm(dispatch, response.user);
        }).catch(function (response) {
            dispatch(createShiftError(response.data));
        });
    };
}

function updateShiftStart() {
    return {type: actionsTypes.UPDATE_SHIFT_START};
}

function updateShiftSuccess(json) {
    return {
        type: actionsTypes.UPDATE_SHIFT_SUCCESS,
        shifts: json
    };
}

function updateShiftError(json) {
    return {
        type: actionsTypes.UPDATE_SHIFT_ERROR,
        data: json
    };
}

export function updateShift(shift) {
    return function (dispatch) {
        dispatch(updateShiftStart());
        return callApi({
            url: '/shifts',
            method: 'put',
            data: shift,
            shouldAuthenticate: true
        }).then(function (response) {
            dispatch(updateShiftSuccess(response.user));
        }).catch(function (response) {
            dispatch(updateShiftError(response.user));
        });
    };
}

function deleteShiftStart() {
    return {type: actionsTypes.DELETE_SHIFT_START};
}

function deleteShiftSuccess() {
    return {
        type: actionsTypes.DELETE_SHIFT_SUCCESS,
    };
}

function deleteShiftError(json) {
    return {
        type: actionsTypes.DELETE_SHIFT_ERROR,
        data: json
    };
}

export function deleteShift(shift) {
    return function (dispatch) {
        dispatch(deleteShiftStart());
        return callApi({
            url: '/shifts/' + shift._id,
            method: 'delete',
            shouldAuthenticate: true,
        }).then(function (response) {
            dispatch(deleteShiftSuccess(response));
        }).catch(function (response) {
            dispatch(deleteShiftError(response.data));
        });
    };
}

function fetchShiftsStart() {
    return {type: actionsTypes.FETCH_SHIFTS_START};
}

function fetchShiftsSuccess(response) {
    return {
        type: actionsTypes.FETCH_SHIFTS_SUCCESS,
        report: createReport(response)
    };
}

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
    userMap.map((user) => {
        let userAdditionalInfo = createUserAdditionalInfo(user);
        return {
            ...user,
            ...userAdditionalInfo
        };
    });
}

function analyzeHours(shift) {
    let clockOut = moment(shift.clockOutTime);
    let clockIn = moment(shift.clockInTime);

    let additionalInfo = {
        regularHours : 0,
        extra125Hours: 0,
        external150Hours: 0
    };

    let hours = clockOut.diff(clockIn, 'hours', true);

    if (hours <= REGULAR_SHIFT_TIME) {
        return {
            ...additionalInfo,
            regularHours: hours
        };
    }
    else {
        return {
            regularHours: REGULAR_SHIFT_TIME,
            extra125Hours: calcExtra125Hours(hours),
            extra150Hours: calcExtra150Hours(hours),
        };
    }
}

function calcExtra125Hours(hours) {
    return 0;
}

function calcExtra150Hours(hours) {
    return 0;
}


function createUserAdditionalInfo(user) {
    if (!user || !user.shifts)
        return user;

    let hourSummary = {
        regularHours : 0,
        extra125Hours: 0,
        external150Hours: 0
    };
    user.shifts.forEach((shift) => {
        let hours = analyzeHours(shift);
        hourSummary.regularHours += hours.regularHours;
        hourSummary.extra125Hours += hours.extra125Hours;
        hourSummary.external50Hours += hours.external50Hours;
    });
}

function createReport(shifts) {
    let map = processUsersToShifts(shifts);
    map = processUsersAdditionalInfo(map);
    return map;
}

function fetchShiftsError() {
    return {
        type: actionsTypes.FETCH_SHIFTS_ERROR,
    };
}

let fetchShifts = function (dispatch, startDate, endDate) {
    let url = '/shifts?startDate=' + startDate;

    if (endDate)
        url += "&endDate=" + endDate;

    dispatch(fetchShiftsStart());
    return callApi({
        url: url,
        method: 'get',
        shouldAuthenticate: true,
    }).then((response) => {
        dispatch(fetchShiftsSuccess(response));
    }).catch(() => dispatch(fetchShiftsError()));
};

export function fetchMonthlyReport(startDate) {
    return function(dispatch) {
        return fetchShifts(dispatch, startDate);
    };
}
