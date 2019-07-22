import PropTypes from 'prop-types';
import React, {Component} from 'react';
import CSSModules from "react-css-modules";
import {connect} from "react-redux";
import {getPaymentActiveStep, getPaymentUrl, getUser} from "../../selectors";
import {EGoPremiumStep} from "./EPremiumStep";
import GoPremiumFinish from "./GoPremiumFinish";
import GoPremiumIntro from "./GoPremiumIntro";
import GoPremiumPay from "./GoPremiumPay";
import GoPremiumStepper from "./GoPremiumStepper";
import styles from '../../styles/GoPremiumContainer.scss';
import {handlePaymentFinished, setActiveStep, fetchPaymentUrl} from "../../actions";

class GoPremiumContainer extends Component {

    componentDidMount() {
        this.props.fetchPaymentUrl();
        this.props.setActiveStep(EGoPremiumStep.INTRO);

        window.addEventListener('message', this.onPaymentSuccess);

    }

    onPaymentSuccess = (e) => {
        console.log('GoPremiumContainer: ' + e.data);
        if (e.data !== 'user_payed')
            return;

        this.props.handlePaymentFinished();
    };

    onStepSelect = (activeStep) => {
        this.props.setActiveStep(activeStep);
    };

    render() {
        const {onClose, paymentUrl, paymentError, activeStep} = this.props;

        return (
            <div styleName="go-premium-container">
                <div styleName="go-premium-stepper-container">
                    <GoPremiumStepper activeStep={activeStep} onStepSelect={this.onStepSelect} />
                </div>
                {activeStep === EGoPremiumStep.INTRO && <GoPremiumIntro onNext={() => this.onStepSelect(EGoPremiumStep.PAY)} onClose={onClose}/>}
                {activeStep === EGoPremiumStep.PAY && <GoPremiumPay paymentUrl={paymentUrl} />}
                {activeStep === EGoPremiumStep.CONFIRM && <GoPremiumFinish onClose={onClose}/>}
            </div>
        );
    }
}

GoPremiumContainer.propTypes = {
    onClose: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: getUser(state),
    paymentUrl: getPaymentUrl(state),
    // paymentError: getPaymentError(state),
    activeStep: getPaymentActiveStep(state)
});

const mapDispatchToProps = dispatch => ({
    handlePaymentFinished: () => dispatch(handlePaymentFinished()),
    fetchPaymentUrl: () => dispatch(fetchPaymentUrl()),
    setActiveStep: (activeStep => dispatch(setActiveStep(activeStep)))
});

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(GoPremiumContainer, styles));
