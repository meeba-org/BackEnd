import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {getPaymentActiveStep, getPaymentError, getPaymentUrl, getUser} from "../../selectors";
import {EGoPremiumStep} from "./EPremiumStep";
import GoPremiumFinish from "./GoPremiumFinish";
import GoPremiumIntro from "./GoPremiumIntro";
import GoPremiumPay from "./GoPremiumPay";
import GoPremiumStepper from "./GoPremiumStepper";
import './styles/GoPremiumContainer.scss';
import {handlePaymentFinished, setActiveStep, fetchPaymentUrl} from "../../actions";

class GoPremiumContainer extends Component {

    componentDidMount() {
        this.props.fetchPaymentUrl();
        this.props.setActiveStep(EGoPremiumStep.INTRO);

        window.addEventListener('message', this.onPaymentFinish);
    }

    onPaymentFinish = (e) => {
        if (!e || !e.data)
            return;

        if (e.data && e.data.msg !== 'user_payed')
            return;

        this.props.handlePaymentFinished({
            token: e.data.token
        });
    };

    onStepSelect = (activeStep) => {
        this.props.setActiveStep(activeStep);
    };

    render() {
        const {onClose, paymentUrl, activeStep, error} = this.props;
        const hasError = !!error;

        return (
            <div styleName="go-premium-container">
                <div styleName="go-premium-stepper-container">
                    <GoPremiumStepper activeStep={activeStep} onStepSelect={this.onStepSelect} />
                </div>
                {!hasError &&
                <Fragment>
                    {activeStep === EGoPremiumStep.INTRO && <GoPremiumIntro onNext={() => this.onStepSelect(EGoPremiumStep.PAY)} onClose={onClose}/>}
                    {activeStep === EGoPremiumStep.PAY && <GoPremiumPay paymentUrl={paymentUrl}/>}
                </Fragment>
                }
                {(activeStep === EGoPremiumStep.CONFIRM || hasError) && <GoPremiumFinish onClose={onClose} error={error}/>}
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
    activeStep: getPaymentActiveStep(state),
    error: getPaymentError(state)
});

const mapDispatchToProps = dispatch => ({
    handlePaymentFinished: (data) => dispatch(handlePaymentFinished(data)),
    fetchPaymentUrl: () => dispatch(fetchPaymentUrl()),
    setActiveStep: (activeStep => dispatch(setActiveStep(activeStep)))
});

export default connect(mapStateToProps, mapDispatchToProps)(GoPremiumContainer);
