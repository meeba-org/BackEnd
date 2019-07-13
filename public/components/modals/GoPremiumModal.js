import Dialog from "@material-ui/core/Dialog";
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {hideModal} from "../../actions";
import {getUser} from "../../selectors";
import GoPremiumConfirm from "../go-premium/GoPremiumConfirm";
import GoPremiumIntro from "../go-premium/GoPremiumIntro";
import GoPremiumPay from "../go-premium/GoPremiumPay";
import GoPremiumStepper from "../go-premium/GoPremiumStepper";
import {EModalType} from "./EModalType";

const EGoPremiumStep = {
    INTRO: 0,
    PAY: 1,
    CONFIRM: 2
};

class GoPremiumModal extends Component {

    state = {
        activeStep: EGoPremiumStep.INTRO
    };

    onStepSelect = (activeStep) => {
        this.setState({activeStep});
    };

    onClose = () => {
        this.props.hideModal();
    };

    render() {
        let {open} = this.props;
        const {activeStep} = this.state;

        return (
            <Dialog onClose={this.handleCancel} open={open}>
                <GoPremiumStepper activeStep={activeStep} onStepSelect={this.onStepSelect} />
                {activeStep === EGoPremiumStep.INTRO && <GoPremiumIntro onNext={() => this.onStepSelect(EGoPremiumStep.PAY)} />}
                {activeStep === EGoPremiumStep.PAY && <GoPremiumPay onNext={() => this.onStepSelect(EGoPremiumStep.CONFIRM)}/>}
                {activeStep === EGoPremiumStep.CONFIRM && <GoPremiumConfirm onNext={() => this.onClose()}/>}
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


const mapStateToProps = (state) => ({
    user: getUser(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(GoPremiumModal);
