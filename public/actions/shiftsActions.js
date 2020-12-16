import moment from "moment";
import {EModalType} from "../components/modals/EModalType";
import {GACategory} from "../helpers/GAService";
import {createApprovedShift} from "../helpers/utils";
import {
    API, APPROVED_ALL_PENDING_SHIFTS_SUCCESS,
    CREATE_SHIFT_SUCCESS, DELETE_SHIFT_SUCCESS,
    FETCH_DAILY_SHIFTS_SUCCESS,
    FETCH_PENDING_SHIFTS_SUCCESS, FETCH_SHIFT_SUCCESS,
    HAS_PENDING_SHIFTS_SUCCESS, UPDATE_SHIFT_SUCCESS
} from "./actionTypes";
import {fetchMonthlyReport} from "./reportsActions";

export const fetchShiftSuccess = (payload) => ({
    type: FETCH_SHIFT_SUCCESS,
    payload
});

export const updateShiftSuccess = (payload) => ({
    type: UPDATE_SHIFT_SUCCESS,
    payload
});

export const deleteShiftSuccess = (id) => ({
    type: DELETE_SHIFT_SUCCESS,
    id
});

export const fetchDailyShiftsSuccess = (payload) => ({
    type: FETCH_DAILY_SHIFTS_SUCCESS,
    payload
});

export const fetchPendingShiftsSuccess = (payload) => ({
    type: FETCH_PENDING_SHIFTS_SUCCESS,
    payload
});

export const approvedAllPendingShiftsSuccess = (payload) => ({
    type: APPROVED_ALL_PENDING_SHIFTS_SUCCESS,
    payload
});

export const hasPendingShiftsSuccess = (payload) => ({
    type: HAS_PENDING_SHIFTS_SUCCESS,
    payload
});

export const createShiftsSuccess = (payload) => ({
    type: CREATE_SHIFT_SUCCESS,
    payload
});

export const createShift = (shift, month, year) => ({
    type: API,
    payload: {
        url: "/shifts",
        method: "post",
        data: shift,
        success: (data) => dispatch => {
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
    type: API,
    payload: {
        url: prepareFetchShiftsUrl(startDate, startDate),
        method: "get",
        success: fetchDailyShiftsSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const fetchPendingShifts = () => ({
    type: API,
    payload: {
        url: prepareFetchPendingShiftsUrl(),
        method: "get",
        success: fetchPendingShiftsSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const showApproveAllShiftsModal = (shiftsToApprove) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: EModalType.YES_NO_MODAL,
        modalProps: {
            open: true,
            onAction: () => approveShifts(shiftsToApprove),
            text: "האם אתה בטוח?"
        }
    }
});

export const approveShifts = (shiftsToApprove) => {
    let shifts = shiftsToApprove.map(shift => createApprovedShift(shift));
    
    return {
        type: API,
        payload: {
            url: "/shifts",
            method: "patch",
            success: approvedAllPendingShiftsSuccess,
            data: {
                shifts
            } 
        },
        meta: {
            shouldAuthenticate: true,
        }
    };
};

export const fetchShift = (shiftId) => ({
    type: API,
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

export const updateShift = (shift, postUpdate, month, year) =>  {
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

    return updateShift0(shift, postUpdate, month, year);
};

export const updateShift0 = (shift, postUpdate, month, year) => {

    return {
        type: API,
        payload: {
            url: "/shifts",
            method: "put",
            data: shift,
            success: (data) => dispatch => {
                if (postUpdate && !!month && !!year) {
                    postUpdate(month, year);
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

export const showDeleteShiftModal = (shift, month, year) => ({
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

export const showEditShiftModal = (shift, postUpdate) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: EModalType.EDIT_SHIFT,
        modalProps: {
            entity: shift,
            postUpdate,
            open: true,
            key: shift._id
        }
    }
});

export const showLocationModal = (locations) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: EModalType.LOCATION_MODAL,
        modalProps: {
            locations,
            open: true,
        }
    }
});

export const deleteShift = (shift, month, year) => ({
    type: API,
    payload: {
        url: "/shifts/" + shift._id,
        method: "delete",
        data: shift,
        success: (data) => dispatch => {
            dispatch(deleteShiftSuccess(data));
            if (!!month && !!year)
                dispatch(fetchMonthlyReport(month, year));
        },
    },
    meta: {
        shouldAuthenticate: true,
    }
});

