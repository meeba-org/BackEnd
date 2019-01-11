import React from "react";
import DeleteModal from './DeleteModal';
import EditShiftModal from './EditShiftModal';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import MovingShiftOutOfMonthModal from "./MovingShiftOutOfMonthModal";
import MobileAppLinksModal from "./MobileAppLinksModal";
import EditEmployeeModal from "./EditEmployeeModal";
import LocationModal from "./LocationModal";
import LoginRegister from "../login/LoginRegister";
import CreateTaskModal from "./CreateTaskModal";

const MODAL_COMPONENTS = {
    "DELETE_ENTITY": DeleteModal,
    "EDIT_SHIFT": EditShiftModal,
    "EDIT_EMPLOYEE": EditEmployeeModal,
    "MOVING_SHIFT_OUT_OF_MONTH": MovingShiftOutOfMonthModal,
    "MOBILE_APP_LINKS": MobileAppLinksModal,
    "LOCATION_MODAL": LocationModal,
    "LOGIN_REGISTER": LoginRegister,
    "CREATE_TASK": CreateTaskModal,
};

const ModalRoot = ({ modalType, modalProps }) => {
    if (!modalType) {
        return null;
    }

    const SpecificModal = MODAL_COMPONENTS[modalType];
    return <SpecificModal {...modalProps} />;
};

ModalRoot.propTypes = {
    modalType: PropTypes.string,
    modalProps: PropTypes.object.isRequired,
};

export default connect(
    state => state.modal
)(ModalRoot);
