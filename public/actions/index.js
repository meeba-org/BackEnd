export * from "./companyActions";
export * from "./shiftsActions";
export * from "./usersActions";
export * from "./loginLogoutActions";

export const hideDeleteEntityModal = (payload) => ({
    type: 'HIDE_MODAL',
    payload : {
        modalType: 'DELETE_ENTITY',
        modalProps: {
            open: false
        }
    }
});
