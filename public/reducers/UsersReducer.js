import * as types from "../actions/actionTypes";

export function UsersReducer(state = [], action = null) {
    switch (action.type) {
        case types.CREATE_USER_SUCCESS: {
            return [
                ...state,
                action.payload
            ];
        }
        case types.FETCH_USERS_SUCCESS: {
            return [
                ...action.payload
            ];
        }
        case types.UPDATE_USER_SUCCESS: {
            return state.map(user => user._id === action.payload._id ? action.payload : user);
        }
        case types.DELETE_USER_SUCCESS: {
            return state.filter(user => user._id !== action.id);
        }
        default:
            return state;
    }
}
