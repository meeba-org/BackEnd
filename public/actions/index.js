import {Error} from "./actionTypes";

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

export const ErrorAction = (err) => ({
    type: Error,
    err
});
