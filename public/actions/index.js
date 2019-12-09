import {EModalType} from "../components/modals/EModalType";
import {DESKTOP, Error, HIDE_LOADING, MOBILE, SHOW_LOADING} from "./actionTypes";

export * from "./companyActions";
export * from "./shiftsActions";
export * from "./usersActions";
export * from "./loginLogoutActions";
export * from "./tasksActions";
export * from "./goPremiumActions";

export const hideModal = (modalType) => ({
    type: 'HIDE_MODAL',
    payload : {
        modalType,
        modalProps: {
            open: false
        }
    }
});

export const hideDeleteEntityModal = () => hideModal(EModalType.DELETE_ENTITY);

export const hideYesNoModal = () => hideModal(EModalType.YES_NO_MODAL);

export const hideTaskModal = () => hideModal(EModalType.TASK_MODAL);

export const hideLocationModal = () => hideModal(EModalType.LOCATION_MODAL);

export const hideEditShiftModal = () => hideModal(EModalType.EDIT_SHIFT);

export const hideEditEmployeeModal = () => hideModal(EModalType.EDIT_EMPLOYEE);

export const hideLoginRegisterModal = () => hideModal(EModalType.LOGIN_REGISTER);

export const hideMobileAppModal = () => hideModal(EModalType.MOBILE_APP_LINKS);

export const hide2019Survey = () => hideModal(EModalType.SURVEY_2019);

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
    type: window.innerWidth > 850 ? DESKTOP : MOBILE
});

