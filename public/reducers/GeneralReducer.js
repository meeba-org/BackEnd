import * as types from "../actions/actionTypes";

const initialState = {};

export function GeneralReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_META_DATA_SUCCESS:
            return {
                ...state,
                meta: action.payload
            };
        case types.DESKTOP:
            return {
                ...state,
                isDesktop: true
            };
        case types.MOBILE:
            return {
                ...state,
                isDesktop: false
            };
        default:
            return state;
    }
}
