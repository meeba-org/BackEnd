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

export const updateShift = (shift, dispatch, month, year) => ({
    type: actions.API,
    payload: {
        url: "/shifts",
        method: "put",
        data: shift,
        success: (data) => {
            dispatch(updateShiftSuccess(data));
            if (!!month && !!year)
                dispatch(fetchMonthlyReport(month, year));
        },
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const showDeleteShiftModal = (shift, dispatch, month, year) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: 'DELETE_ENTITY',
        modalProps: {
            entity: shift,
            deleteEntity: () => deleteShift(shift, dispatch, month, year),
            open: true
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
