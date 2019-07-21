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

const paymentSuccess = (response) => dispatch => {
    localStorage.setItem('jwtToken', response.token);
    localStorage.setItem('activeUser', JSON.stringify(response.user));

    dispatch(updateActiveUserSuccess(response.user));
    return setActiveStep(EGoPremiumStep.CONFIRM);
};

const handlePaymentError = err => ({
    type: actions.PAYMENT_ERROR,
    error: err.message
});

export const handlePaymentSuccess = (data = {}) => ({
    type: actions.API,
    payload: {
        url: "/payment",
        method: "post",
        data,
        success: paymentSuccess,
    },
    meta: {
        shouldAuthenticate: true
    }
});

export const setActiveStep = activeStep => ({
    type: actions.UPDATE_PAYMENT_STEP,
    activeStep
});

export const fetchPaymentUrl = (data = {}) => {
    return {
        type: actions.API,
        payload: {
            url: "/payment",
            method: "post",
            data,
            success: paymentSuccess,
        },
        meta: {
            shouldAuthenticate: true
        }
    };
};
