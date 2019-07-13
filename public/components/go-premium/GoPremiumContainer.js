import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {hideModal} from "../../actions";
import {getUser} from "../../selectors";
import {EModalType} from "../modals/EModalType";
import GoPremiumConfirm from "./GoPremiumConfirm";
import GoPremiumIntro from "./GoPremiumIntro";
import GoPremiumPay from "./GoPremiumPay";
import GoPremiumStepper from "./GoPremiumStepper";
import {connect} from "react-redux";

const EGoPremiumStep = {
    INTRO: 0,
    PAY: 1,
    CONFIRM: 2
};

class GoPremiumContainer extends Component {

    state = {
        activeStep: EGoPremiumStep.INTRO
    };

    onStepSelect = (activeStep) => {
        this.setState({activeStep});
    };

    render() {
        const {onClose} = this.props;
        const {activeStep} = this.state;

        return (
            <Fragment>
                <GoPremiumStepper activeStep={activeStep} onStepSelect={this.onStepSelect} />
                {activeStep === EGoPremiumStep.INTRO && <GoPremiumIntro onNext={() => this.onStepSelect(EGoPremiumStep.PAY)} />}
                {activeStep === EGoPremiumStep.PAY && <GoPremiumPay onNext={() => this.onStepSelect(EGoPremiumStep.CONFIRM)}/>}
                {activeStep === EGoPremiumStep.CONFIRM && <GoPremiumConfirm onNext={() => onClose()}/>}
            </Fragment>
        );
    }
}

GoPremiumContainer.propTypes = {
    onClose: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: getUser(state)
});

export default connect(mapStateToProps)(GoPremiumContainer);
