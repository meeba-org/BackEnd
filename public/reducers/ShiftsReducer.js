import * as types from "../actions/actionTypes";

export function ShiftsReducer(state = [], action = null) {
    switch (action.type) {
        case types.CREATE_SHIFT_SUCCESS: {
            return [
                ...state,
                action.shift
            ];
        }
        case types.UPDATE_SHIFT_SUCCESS: {
            return state.map(shift => shift._id == action.shift._id ? action.shift : shift);
        }
        case types.DELETE_SHIFT_SUCCESS: {
            return state.filter(shift => shift._id !== action.id);
        }
        case types.FETCH_SHIFTS_SUCCESS: {
            return [
                ...action.shifts
            ];
        }
        default:
            return state;
    }
}
