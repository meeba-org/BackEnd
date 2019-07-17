import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import CSSModules from "react-css-modules";
import {connect} from "react-redux";
import {getPaymentToken, getUser} from "../../selectors";
import GoPremiumConfirm from "./GoPremiumConfirm";
import GoPremiumIntro from "./GoPremiumIntro";
import GoPremiumPay from "./GoPremiumPay";
import GoPremiumStepper from "./GoPremiumStepper";
import styles from '../../styles/GoPremiumContainer.scss';
import { fetchPaymentToken } from '../../actions/generalActions';

const EGoPremiumStep = {
    INTRO: 0,
    PAY: 1,
    CONFIRM: 2
};

class GoPremiumContainer extends Component {

    componentDidMount() {
        this.props.fetchPaymentToken();
    }

    state = {
        activeStep: EGoPremiumStep.INTRO
    };

    onStepSelect = (activeStep) => {
        this.setState({activeStep});
    };

    render() {
        const {onClose, paymentToken} = this.props;
        const {activeStep} = this.state;

        return (
            <div styleName="go-premium-container">
                <div styleName="go-premium-stepper-container">
                    <GoPremiumStepper activeStep={activeStep} onStepSelect={this.onStepSelect} />
                </div>
                {activeStep === EGoPremiumStep.INTRO && <GoPremiumIntro onNext={() => this.onStepSelect(EGoPremiumStep.PAY)} />}
                {activeStep === EGoPremiumStep.PAY && <GoPremiumPay paymentToken={paymentToken} onNext={() => this.onStepSelect(EGoPremiumStep.CONFIRM)}/>}
                {activeStep === EGoPremiumStep.CONFIRM && <GoPremiumConfirm onNext={() => onClose()}/>}
            </div>
        );
    }
}

GoPremiumContainer.propTypes = {
    onClose: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: getUser(state),
    paymentToken: getPaymentToken (state)
});

const mapDispatchToProps = dispatch => ({
    fetchPaymentToken: () => dispatch(fetchPaymentToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(GoPremiumContainer, styles));
