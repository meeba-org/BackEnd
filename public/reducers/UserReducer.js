import * as types from "../actions/actionTypes";

export function UserReducer(state = {}, action = null) {
    switch (action.type) {
        case types.ME_FROM_TOKEN_SUCCESS: {
            return {
                ...action.payload
            };
        }
        case types.ME_FROM_TOKEN_FAILURE: {
            return { // Empty User
            };
        }
        case types.UPDATE_COMPANY_SUCCESS: {
            return {
                ...state,
                company: action.payload,
            };
        }
        case types.UPDATE_ACTIVE_USER_SUCCESS: {
            return {
                ...action.payload,
            };
        }
        default:
            return state;
    }
}
