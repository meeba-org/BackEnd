import * as types from "../actions/actionTypes";

export function EmployeesReducer(state = [], action = null) {
    switch (action.type) {
        case types.FETCH_EMPLOYEES_SUCCESS: {
            return [
                ...action.employees
            ];
        }
        case types.FETCH_EMPLOYEES_ERROR:
            return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
        default:
            return state;
    }
}
