import FeaturesManager, {Feature} from "../../managers/FeaturesManager";
import * as EPlanType from "../../models/EPlanType";
import {EGoPremiumStep} from "../components/go-premium/EPremiumStep";
import {EModalType} from "../components/modals/EModalType";
import {GACategory} from "../helpers/GATypes";
import {
    API,
    FETCH_PAYMENT_TOKEN_SUCCESS,
    FETCH_PAYMENT_URL_SUCCESS,
    PAYMENT_ERROR,
    UPDATE_PAYMENT_STEP
} from "./actionTypes";
import {updateCompany} from "./companyActions";
import {updateActiveUserSuccess} from "./usersActions";

export const fetchPaymentTokenSuccess = payload => ({
    type: FETCH_PAYMENT_TOKEN_SUCCESS,
    payload
});

export const fetchPaymentUrlSuccess = payload => ({
    type: FETCH_PAYMENT_URL_SUCCESS,
    payload
});

const paymentFinished = (response) => dispatch => {
    localStorage.setItem('jwtToken', response.token);
    localStorage.setItem('activeUser', JSON.stringify(response.user));

    dispatch(updateActiveUserSuccess(response.user));
    return dispatch(setActiveStep(EGoPremiumStep.CONFIRM));
};

const handlePaymentError = err => ({
    type: PAYMENT_ERROR,
    error: err.message
});

const onPaymentError = err => dispatch => {
    return dispatch(handlePaymentError(err));
};

export const handlePaymentFinished = (data = {}) => ({
    type: API,
    payload: {
        url: "/goPremium",
        method: "post",
        data,
        success: paymentFinished,
        onError: onPaymentError
    },
    meta: {
        shouldAuthenticate: true
    },
    ga: {
        category: GACategory.USER_WENT_PREMIUM
    }
});

export const setActiveStep = activeStep => ({
    type: UPDATE_PAYMENT_STEP,
    activeStep
});

export const fetchPaymentUrl = (data = {}) => {
    return {
        type: API,
        payload: {
            url: "/goPremium",
            method: "get",
            data,
            success: fetchPaymentUrlSuccess,
            onError: onPaymentError
        },
        meta: {
            shouldAuthenticate: true
        }
    };
};

const handleCancelPremiumPlan = company => dispatch => {
    let updatedFeatures = FeaturesManager.removeFeature(company.features, Feature.Premium);
    company = {
        ...company,
        plan: EPlanType.Free,
        features: updatedFeatures
    };
    return dispatch(updateCompany(company));
};

export const showCancelPremiumModal = (company) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: EModalType.YES_NO_MODAL,
        modalProps: {
            open: true,
            onAction: () => handleCancelPremiumPlan(company),
            text: "האם אתה בטוח?"
        }
    }
});
