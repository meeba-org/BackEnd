import moment from "moment";
import {GACategory} from "../helpers/GATypes";
import * as actions from "./actionTypes";
import {fetchMonthlyReport} from "./reportsActions";

export const fetchShiftSuccess = (payload) => ({
    type: actions.FETCH_SHIFT_SUCCESS,
    payload
});

export const updateShiftSuccess = (payload) => ({
    type: actions.UPDATE_SHIFT_SUCCESS,
    payload
});

export const deleteShiftSuccess = (id) => ({
    type: actions.DELETE_SHIFT_SUCCESS,
    id
});

export const fetchShiftsSuccess = (payload) => ({
    type: actions.FETCH_SHIFTS_SUCCESS,
    payload
});

export const createShiftsSuccess = (payload) => ({
    type: actions.CREATE_SHIFT_SUCCESS,
    payload
});

export const createShift = (shift, dispatch, month, year) => ({
    type: actions.API,
    payload: {
        url: "/shifts",
        method: "post",
        data: shift,
        success: (data) => {
            dispatch(createShiftsSuccess(data));
            if (!!month && !!year)
                dispatch(fetchMonthlyReport(month, year));
        },

    },
    meta: {
        shouldAuthenticate: true,
    },
    ga: {
        category: GACategory.CLOCK_IN,
        action: "web",
        user: shift.user
    }
});

function prepareFetchShiftsUrl(startDate, endDate) {
    let url = '/shifts?startDate=' + startDate;

    if (endDate)
        url += "&endDate=" + endDate;

    return url;
}
export const fetchShifts = (startDate, endDate) => ({
    type: actions.API,
    payload: {
        url: prepareFetchShiftsUrl(startDate, endDate),
        method: "get",
        success: fetchShiftsSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const fetchShift = (shiftId) => ({
    type: actions.API,
    payload: {
        url: "/shifts/" + shiftId,
        method: "get",
        success: fetchShiftSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

const isMovingShiftOutOfMonth = (shift, orgMonth, orgYear) => {
    let newYear = moment(shift.clockInTime).format('YYYY');
    let newMonth = moment(shift.clockInTime).format('MM');

    if (!orgYear || !orgMonth)
        return false;

    // Is that the right way? maybe just calculate in the event and add property isMovingShiftOutOfMonth on shift? Tired...
    return (orgMonth !== newMonth || orgYear !== newYear);
};

export const updateShift = (shift, dispatch, shouldFetchMonthlyReport, month, year) => {
    if (isMovingShiftOutOfMonth(shift, month, year)) {
        return {
            type: 'SHOW_MODAL',
            payload: {
                modalType: 'MOVING_SHIFT_OUT_OF_MONTH',
                modalProps: {
                    entity: shift,
                    month,
                    year,
                    shouldFetchMonthlyReport,
                    updateShift: updateShift0,
                    open: true
                }
            }
        };
    }

    return updateShift0(dispatch, shift, shouldFetchMonthlyReport, month, year);
};

export const updateShift0 = (dispatch, shift, shouldFetchMonthlyReport, month, year) => {

    return {
        type: actions.API,
        payload: {
            url: "/shifts",
            method: "put",
            data: shift,
            success: (data) => {
                if (shouldFetchMonthlyReport && !!month && !!year) {
                    dispatch(fetchMonthlyReport(month, year));
                }
                return dispatch(updateShiftSuccess(data));
            },
        },
        meta: {
            shouldAuthenticate: true,
            debounce: {
                time: 700
            }
        }
    };
};

export const showDeleteShiftModal = (shift, dispatch, month, year) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: 'DELETE_ENTITY',
        modalProps: {
            entity: shift,
            month,
            year,
            deleteEntity: deleteShift,
            open: true
        }
    }
});

export const showEditShiftModal = (shift, callBack) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: 'EDIT_SHIFT',
        modalProps: {
            entity: shift,
            callBack,
            updateShift,
            open: true,
            key: shift._id
        }
    }
});

export const showLocationModal = (shift, callBack) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: 'LOCATION_MODAL',
        modalProps: {
            entity: shift,
            callBack,
            open: true,
            key: shift._id
        }
    }
});

export const deleteShift = (shift, dispatch, month, year) => ({
    type: actions.API,
    payload: {
        url: "/shifts/" + shift._id,
        method: "delete",
        data: shift,
        success: (data) => {
            dispatch(deleteShiftSuccess(data));
            if (!!month && !!year)
                dispatch(fetchMonthlyReport(month, year));
        },
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export function fetchDailyReport(startDate) {
    return fetchShifts(startDate, startDate);
}
