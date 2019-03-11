import * as types from "../actions/actionTypes";

export function ShiftsReducer(state = [], action = null) {
    switch (action.type) {
        case types.CREATE_SHIFT_SUCCESS: {
            return [
                ...state,
                action.payload
            ];
        }
        case types.FETCH_SHIFTS_SUCCESS: {
            return [
                ...action.payload
            ];
        }
        case types.UPDATE_SHIFT_SUCCESS: {
            return state.map(shift => shift._id === action.payload._id ? action.payload : shift);
        }
        case types.DELETE_SHIFT_SUCCESS: {
            return state.filter(shift => shift._id !== action.id);
        }
        default:
            return state;
    }
}
