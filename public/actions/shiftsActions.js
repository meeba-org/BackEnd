import * as actionsTypes from "./actionTypes";
import callApi from "./api";

function createShiftStart() {
    return {type: actionsTypes.CREATE_SHIFT_START};
}

function createShiftSuccess(shift) {
    return {
        type: actionsTypes.CREATE_SHIFT_SUCCESS,
        shift
    };
}

function createShiftError(json) {
    return {
        type: actionsTypes.CREATE_SHIFT_ERROR,
        data: json
    };
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
            let shift = response.shift;

            dispatch(createShiftSuccess(shift));
            // dispatchUpdateNewShiftsInForm(dispatch, shift);
        }).catch(function (response) {
            dispatch(createShiftError(response.data));
        });
    };
}

function updateShiftStart() {
    return {type: actionsTypes.UPDATE_SHIFT_START};
}

function updateShiftSuccess(shift) {
    return {
        type: actionsTypes.UPDATE_SHIFT_SUCCESS,
        shift
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
            dispatch(updateShiftSuccess(response.shift));
        }).catch(function (response) {
            dispatch(updateShiftError(response.shift));
        });
    };
}

function deleteShiftStart() {
    return {type: actionsTypes.DELETE_SHIFT_START};
}

function deleteShiftSuccess(id) {
    return {
        type: actionsTypes.DELETE_SHIFT_SUCCESS,
        id
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
        }).then(function () {
            dispatch(deleteShiftSuccess(shift._id));
        }).catch(function (response) {
            dispatch(deleteShiftError(response.data));
        });
    };
}

function fetchShiftsStart() {
    return {type: actionsTypes.FETCH_SHIFTS_START};
}

function fetchShiftsSuccess(shifts) {
    return {
        type: actionsTypes.FETCH_SHIFTS_SUCCESS,
        shifts,
    };
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
    })
        .then((shifts) => dispatch(fetchShiftsSuccess(shifts)))
        .catch(() => dispatch(fetchShiftsError()));
};

export function fetchMonthlyReport(startDate) {
    return function(dispatch) {
        return fetchShifts(dispatch, startDate);
    };
}

export function fetchDailyReport(startDate) {
    return function(dispatch) {
        return fetchShifts(dispatch, startDate, startDate);
    };
}
