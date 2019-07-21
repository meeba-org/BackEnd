import * as types from "../actions/actionTypes";

export function PaymentReducer(state = {}, action = null) {
    switch (action.type) {
        case types.FETCH_PAYMENT_TOKEN_SUCCESS:
            return {
                ...state,
                token: action.payload
            };
        case types.FETCH_PAYMENT_URL_SUCCESS:
            return {
                ...state,
                paymentUrl: action.payload
            };
        case types.PAYMENT_ERROR:
            return {
                ...state,
                error: action.error
            };
        case types.UPDATE_PAYMENT_STEP:
            return {
                ...state,
                activeStep: action.activeStep
            };
        default:
            return state;
    }
}
