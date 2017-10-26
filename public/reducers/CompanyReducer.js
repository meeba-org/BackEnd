import * as types from "../actions/actionTypes";

export function CompanyReducer(state = [], action = null) {
    switch (action.type) {
        case types.FETCH_COMPANY_SUCCESS: {
            return [
                ...action.company
            ];
        }
        default:
            return state;
    }
}
