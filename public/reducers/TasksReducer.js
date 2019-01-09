import * as types from "../actions/actionTypes";

export function TasksReducer(state = [], action = null) {
    switch (action.type) {
        case types.CREATE_TASK_SUCCESS: {
            return [
                ...state,
                action.payload
            ];
        }
        case types.FETCH_TASKS_SUCCESS: {
            return [
                ...action.payload
            ];
        }
        case types.UPDATE_TASK_SUCCESS: {
            return state.map(task => task._id === action.payload._id ? action.payload : task);
        }
        case types.DELETE_TASK_SUCCESS: {
            return state.filter(task => task._id !== action.id);
        }
        default:
            return state;
    }
}
