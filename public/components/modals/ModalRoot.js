import PropTypes from 'prop-types';
import React, {Suspense} from "react";
import {connect} from "react-redux";
import LoginRegister from "../login/LoginRegister";

import {EModalType} from "./EModalType";
const Covid19DiscountModal = React.lazy(() => import("./Covid19DiscountModal"));
const AbsenceDaysModal = React.lazy(() => import("./AbsenceDaysModal"));
const DeleteModal = React.lazy(() => import("./DeleteModal"));
const EditEmployeeModal = React.lazy(() => import("./EditEmployeeModal"));
const EditShiftModal = React.lazy(() => import("./EditShiftModal"));
const GoPremiumModal = React.lazy(() => import("./GoPremiumModal"));
const LocationModal = React.lazy(() => import("./LocationModal"));
const MobileAppLinksModal = React.lazy(() => import("./MobileAppLinksModal"));
const MovingShiftOutOfMonthModal = React.lazy(() => import("./MovingShiftOutOfMonthModal"));
const Survey2019Modal = React.lazy(() => import("./Survey2019Modal"));
const TaskModal = React.lazy(() => import("./TaskModal"));
const YesNoModal = React.lazy(() => import("./YesNoModal"));

export const MODAL_COMPONENTS = {
    [EModalType.DELETE_ENTITY]: DeleteModal,
    [EModalType.EDIT_SHIFT]: EditShiftModal,
    [EModalType.EDIT_EMPLOYEE]: EditEmployeeModal,
    [EModalType.MOVING_SHIFT_OUT_OF_MONTH]: MovingShiftOutOfMonthModal,
    [EModalType.MOBILE_APP_LINKS]: MobileAppLinksModal,
    [EModalType.LOCATION_MODAL]: LocationModal,
    [EModalType.LOGIN_REGISTER]: LoginRegister,
    [EModalType.TASK_MODAL]: TaskModal,
    [EModalType.GO_PREMIUM_MODAL]: GoPremiumModal,
    [EModalType.YES_NO_MODAL]: YesNoModal,
    [EModalType.SURVEY_2019]: Survey2019Modal,
    [EModalType.NEW_FEATURE_ABSENCE_DAYS]: AbsenceDaysModal,
    [EModalType.COVID19_DISCOUNT]: Covid19DiscountModal,
};

const ModalRoot = ({ modalType, modalProps }) => {
    if (!modalType) {
        return null;
    }

    const SpecificModal = MODAL_COMPONENTS[modalType];
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SpecificModal {...modalProps} />
        </Suspense>
    );
};

ModalRoot.propTypes = {
    modalType: PropTypes.number,
    modalProps: PropTypes.object.isRequired,
};

export default connect(
    state => state.modal
)(ModalRoot);
