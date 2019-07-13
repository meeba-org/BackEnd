import Dialog from "@material-ui/core/Dialog";
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {hideModal} from "../../actions";
import {getUser} from "../../selectors";
import GoPremiumContainer from "../go-premium/GoPremiumContainer";
import {EModalType} from "./EModalType";

class GoPremiumModal extends Component {

    onClose = () => {
        this.props.hideModal();
    };

    render() {
        let {open} = this.props;

        return (
            <Dialog onClose={this.onClose} open={open}>
                <GoPremiumContainer onClose={this.onClose}/>
            </Dialog>
        );
    }
}

GoPremiumModal.propTypes = {
    user: PropTypes.object,
    open: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal(EModalType.GO_PREMIUM_MODAL))
});

export default connect(null, mapDispatchToProps)(GoPremiumModal);
