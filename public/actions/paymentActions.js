import {EGoPremiumStep} from "../components/go-premium/EPremiumStep";
import * as actions from "./actionTypes";
import {updateActiveUserSuccess} from "./usersActions";

export const fetchPaymentTokenSuccess = payload => ({
    type: actions.FETCH_PAYMENT_TOKEN_SUCCESS,
    payload
});

export const fetchPaymentToken = () => ({
    type: actions.API,
    payload: {
        url: "/paymentToken",
        method: "get",
        success: fetchPaymentTokenSuccess
    },
    meta: {
        shouldAuthenticate: true
    }
});

const paymentSuccess = () => {
    return setActiveStep(EGoPremiumStep.CONFIRM);
};

const handlePaymentError = err => ({
    type: actions.PAYMENT_ERROR,
    error: err.message
});

export const handlePayment = (data) => ({
    type: actions.API,
    payload: {
        url: "/payment",
        method: "post",
        data,
        success: paymentSuccess,
        onError: handlePaymentError
    },
    meta: {
        shouldAuthenticate: true
    }
});

export const setActiveStep = activeStep => ({
    type: actions.UPDATE_PAYMENT_STEP,
    activeStep
});
