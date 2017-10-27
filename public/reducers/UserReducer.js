import * as types from "../actions/actionTypes";

export function UserReducer(state = {}, action = null) {
    switch (action.type) {
        case types.ME_FROM_TOKEN_SUCCESS: {
            return {
                ...action.payload
            };
        }
        default:
            return state;
    }
}
