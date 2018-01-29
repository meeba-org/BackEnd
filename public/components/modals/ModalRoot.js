import React from "react";
import DeleteModal from './DeleteModal';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import MovingShiftOutOfMonthModal from "./MovingShiftOutOfMonthModal";

const MODAL_COMPONENTS = {
    "DELETE_ENTITY": DeleteModal,
    "MOVING_SHIFT_OUT_OF_MONTH": MovingShiftOutOfMonthModal,
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
