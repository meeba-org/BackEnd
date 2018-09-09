import {DESKTOP, Error, HIDE_LOADING, MOBILE, SHOW_LOADING} from "./actionTypes";

export * from "./companyActions";
export * from "./shiftsActions";
export * from "./usersActions";
export * from "./loginLogoutActions";

export const hideDeleteEntityModal = () => ({
    type: 'HIDE_MODAL',
    payload : {
        modalType: 'DELETE_ENTITY',
        modalProps: {
            open: false
        }
    }
});

export const hideEditShiftModal = () => ({
    type: 'HIDE_MODAL',
    payload : {
        modalType: 'EDIT_SHIFT',
        modalProps: {
            open: false
        }
    }
});

export const ErrorAction = (err) => ({
    type: Error,
    err
});

export const ShowLoading = () => ({
    type: SHOW_LOADING
});

export const HideLoading = () => ({
    type: HIDE_LOADING
});

export const handleResize = () => ({
    type: window.innerWidth > 600 ? DESKTOP : MOBILE
});

