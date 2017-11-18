const initialState = [];

export function ReportsReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_MONTHLY_REPORT_SUCCESS':
            return {
                employeesMonthlyReports: action.payload
            };
        default:
            return state;
    }
}
