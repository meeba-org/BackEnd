import PropTypes from 'prop-types';
import React from "react";
import {connect} from "react-redux";
import LoginRegister from "../login/LoginRegister";
import AbsenceDaysModal from "./AbsenceDaysModal";
import DeleteModal from "./DeleteModal";
import EditEmployeeModal from "./EditEmployeeModal";
import EditShiftModal from "./EditShiftModal";
import {EModalType} from "./EModalType";
import GoPremiumModal from "./GoPremiumModal";
import LocationModal from "./LocationModal";
import MobileAppLinksModal from "./MobileAppLinksModal";
import MovingShiftOutOfMonthModal from "./MovingShiftOutOfMonthModal";
import Survey2019Modal from "./Survey2019Modal";
import TaskModal from "./TaskModal";
import YesNoModal from "./YesNoModal";


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
};

const ModalRoot = ({ modalType, modalProps }) => {
    if (!modalType) {
        return null;
    }

    const SpecificModal = MODAL_COMPONENTS[modalType];
    return <SpecificModal {...modalProps} />;
};

ModalRoot.propTypes = {
    modalType: PropTypes.number,
    modalProps: PropTypes.object.isRequired,
};

export default connect(
    state => state.modal
)(ModalRoot);
