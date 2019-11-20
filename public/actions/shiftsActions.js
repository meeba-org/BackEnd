import moment from "moment";
import {EModalType} from "../components/modals/EModalType";
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

export const fetchDailyShiftsSuccess = (payload) => ({
    type: actions.FETCH_DAILY_SHIFTS_SUCCESS,
    payload
});

export const fetchPendingShiftsSuccess = (payload) => ({
    type: actions.FETCH_PENDING_SHIFTS_SUCCESS,
    payload
});

export const hasPendingShiftsSuccess = (payload) => ({
    type: actions.HAS_PENDING_SHIFTS_SUCCESS,
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

function prepareFetchPendingShiftsUrl() {
    return '/shifts?pending=true';
}

export const fetchDailyReport = (startDate) => ({
    type: actions.API,
    payload: {
        url: prepareFetchShiftsUrl(startDate, startDate),
        method: "get",
        success: fetchDailyShiftsSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const hasPendingShifts = () => ({
    type: actions.API,
    payload: {
        url: prepareFetchPendingShiftsUrl(),
        method: "get",
        success: hasPendingShiftsSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const fetchPendingShifts = () => ({
    type: actions.API,
    payload: {
        url: prepareFetchPendingShiftsUrl(),
        method: "get",
        success: fetchPendingShiftsSuccess,
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

export const updateShift = (shift, dispatch, postUpdate, month, year) => {
    if (isMovingShiftOutOfMonth(shift, month, year)) {
        return {
            type: 'SHOW_MODAL',
            payload: {
                modalType: EModalType.MOVING_SHIFT_OUT_OF_MONTH,
                modalProps: {
                    entity: shift,
                    month,
                    year,
                    postUpdate,
                    updateShift: updateShift0,
                    open: true
                }
            }
        };
    }

    return updateShift0(dispatch, shift, postUpdate, month, year);
};

export const updateShift0 = (dispatch, shift, postUpdate, month, year) => {

    return {
        type: actions.API,
        payload: {
            url: "/shifts",
            method: "put",
            data: shift,
            success: (data) => {
                if (postUpdate && !!month && !!year) {
                    dispatch(postUpdate(month, year));
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
        modalType: EModalType.DELETE_ENTITY,
        modalProps: {
            entity: shift,
            month,
            year,
            deleteEntity: deleteShift,
            open: true
        }
    }
});

export const showGoPremiumModal = () => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: EModalType.GO_PREMIUM_MODAL,
        modalProps: {
            open: true,
        }
    }
});

export const showEditShiftModal = (shift, callBack, postUpdate) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: EModalType.EDIT_SHIFT,
        modalProps: {
            entity: shift,
            callBack,
            postUpdate,
            open: true,
            key: shift._id
        }
    }
});

export const showLocationModal = (shift) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: EModalType.LOCATION_MODAL,
        modalProps: {
            entity: shift,
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

