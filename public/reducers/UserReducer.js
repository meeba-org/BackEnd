import * as types from "../actions/actionTypes";

export function UserReducer(state = null, action = null) {
    switch (action.type) {
        case types.UPDATE_ACTIVE_USER_SUCCESS:
        case types.ME_FROM_TOKEN_SUCCESS: {
            return {
                ...action.payload
            };
        }
        case types.REGISTER_FAILURE:
        case types.ME_FROM_TOKEN_FAILURE: {
            return null; // Empty User
        }
        case types.UPDATE_COMPANY_SUCCESS: {
            return {
                ...state,
                company: action.payload,
            };
        }
        case types.HAS_PENDING_SHIFTS_SUCCESS: {
            return {
                ...state,
                hasPendingShifts: action.payload.length > 0
            };
        }
        default:
            return state;
    }
}
