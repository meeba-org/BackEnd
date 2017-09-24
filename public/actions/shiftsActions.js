import * as actionsTypes from "./actionTypes";
import callApi from "./api";
import {arrayPop, arrayPush} from 'redux-form';

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

function fetchMonthlyReportStart() {
    return {type: actionsTypes.FETCH_MONTHLY_REPORT_START};
}

function fetchMonthlyReportSuccess(json) {
    return {
        type: actionsTypes.FETCH_MONTHLY_REPORT_SUCCESS,
        employees: json
    };
}

function fetchMonthlyReportError() {
    return {
        type: actionsTypes.FETCH_MONTHLY_REPORT_ERROR,
    };
}

export function fetchMonthlyReport(startDate) {
    return function(dispatch) {
        dispatch(fetchMonthlyReportStart());
        return callApi({
            url: '/shifts?startDate=' + startDate,
            method: 'get',
            shouldAuthenticate: true,
        }).then((response) => {
            dispatch(fetchMonthlyReportSuccess(response));
        })
        .catch(() => dispatch(fetchMonthlyReportError()));
    };
}
