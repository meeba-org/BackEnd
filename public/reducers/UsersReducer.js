import * as types from "../actions/actionTypes";

export function UsersReducer(state = [], action = null) {
    switch (action.type) {
        case types.FETCH_USERS_SUCCESS: {
            return [
                ...action.payload
            ];
        }
        default:
            return state;
    }
}
