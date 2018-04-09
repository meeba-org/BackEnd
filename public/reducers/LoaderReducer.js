import * as actionTypes from "../actions/actionTypes";

const initialState = {
    isLoading: false
};

export function LoaderReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SHOW_LOADING:
            return {
                isLoading: true
            };
        case actionTypes.HIDE_LOADING:
            return {
                isLoading: false
            };
        default:
            return state;
    }
}
