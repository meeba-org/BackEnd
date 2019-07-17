import PropTypes from 'prop-types';
import React, {Component} from 'react';
import CSSModules from "react-css-modules";
import {connect} from "react-redux";
import {getPaymentActiveStep, getPaymentError, getPaymentToken, getUser} from "../../selectors";
import {EGoPremiumStep} from "./EPremiumStep";
import GoPremiumConfirm from "./GoPremiumConfirm";
import GoPremiumIntro from "./GoPremiumIntro";
import GoPremiumPay from "./GoPremiumPay";
import GoPremiumStepper from "./GoPremiumStepper";
import styles from '../../styles/GoPremiumContainer.scss';
import {handlePayment, fetchPaymentToken, setActiveStep} from "../../actions";

class GoPremiumContainer extends Component {

    componentDidMount() {
        this.props.fetchPaymentToken();
        this.props.setActiveStep(EGoPremiumStep.INTRO);
    }

    onStepSelect = (activeStep) => {
        this.props.setActiveStep(activeStep);
    };

    onPayment = (paymentData) => {
        const {handlePayment, paymentToken} = this.props;
        handlePayment({
            ...paymentData,
            token: paymentToken
        });
    };

    render() {
        const {onClose, paymentToken, paymentError, activeStep} = this.props;

        return (
            <div styleName="go-premium-container">
                <div styleName="go-premium-stepper-container">
                    <GoPremiumStepper activeStep={activeStep} onStepSelect={this.onStepSelect} />
                </div>
                {activeStep === EGoPremiumStep.INTRO && <GoPremiumIntro onNext={() => this.onStepSelect(EGoPremiumStep.PAY)} />}
                {activeStep === EGoPremiumStep.PAY && <GoPremiumPay paymentToken={paymentToken}  error={paymentError} onNext={this.onPayment}/>}
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
    paymentToken: getPaymentToken(state),
    paymentError: getPaymentError(state),
    activeStep: getPaymentActiveStep(state)
});

const mapDispatchToProps = dispatch => ({
    fetchPaymentToken: () => dispatch(fetchPaymentToken()),
    handlePayment: paymentData => dispatch(handlePayment(paymentData)),
    setActiveStep: (activeStep => dispatch(setActiveStep(activeStep)))
});

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(GoPremiumContainer, styles));
