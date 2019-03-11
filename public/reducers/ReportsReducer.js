import * as types from "../actions/actionTypes";

const initialState = [];

export function ReportsReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_MONTHLY_REPORT_SUCCESS:
            return {
                employeesMonthlyReports: action.payload
            };
        case types.FETCH_TASKS_REPORT_SUCCESS:
            return {
                tasksReports: action.payload
            };
        default:
            return state;
    }
}
