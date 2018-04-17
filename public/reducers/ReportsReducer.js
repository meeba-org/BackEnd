import * as types from "../actions/actionTypes";

const initialState = [];

export function ReportsReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_MONTHLY_REPORT_SUCCESS:
            return {
                employeesMonthlyReports: action.payload
            };
        default:
            return state;
    }
}
