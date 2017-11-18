import * as actions from "./actionTypes";

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

export const createShift = (shift) => ({
    type: actions.API,
    payload: {
        url: "/shifts",
        method: "post",
        data: shift,
        success: createShiftsSuccess,
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

export const updateShift = (shift) => ({
    type: actions.API,
    payload: {
        url: "/shifts",
        method: "put",
        data: shift,
        success: updateShiftSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const showDeleteShiftModal = (shift) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: 'DELETE_ENTITY',
        modalProps: {
            entity: shift,
            deleteEntity: deleteShift,
            open: true
        }
    }
});


export const deleteShift = (shift) => ({
    type: actions.API,
    payload: {
        url: "/shifts/" + shift._id,
        method: "delete",
        data: shift,
        success: deleteShiftSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export function fetchDailyReport(startDate) {
    return fetchShifts(startDate, startDate);
}
