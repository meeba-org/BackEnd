import React from "react";
import DeleteModal from './DeleteModal';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

const MODAL_COMPONENTS = {
    "DELETE_ENTITY": DeleteModal,
};

const ModalRoot = ({ modalType, modalProps }) => {
    if (!modalType) {
        return null;
    }

    const SpecificModal = MODAL_COMPONENTS[modalType];
    return <SpecificModal {...modalProps} />;
};

ModalRoot.propTypes = {
    modalType: PropTypes.string.isRequired,
    modalProps: PropTypes.object.isRequired,
};

export default connect(
    state => state.modal
)(ModalRoot);
