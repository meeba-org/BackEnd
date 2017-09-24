import * as types from '../actions/actionTypes';
import {combineReducers} from 'redux';
import {routerReducer} from "react-router-redux";
// import { reducer as formReducer } from 'redux-form';
import { reducer as formReducer } from 'redux-form';


function dataReducer(state = {isLoading: false, data: [], error: false}, action = null) {
    switch (action.type) {
        case types.REQUEST_EMPLOYEES:
            return Object.assign({}, state, {isLoading: true, error: false});
        case types.FETCH_SHIFTS_SUCCESS:
            return Object.assign({}, state, {report: action.report});
        case types.RECEIVE_EMPLOYEES_SUCCESS:
            return {
                ...state,
                employees: action.employees
            };
        case types.RECEIVE_EMPLOYEES_ERROR:
            return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    data: dataReducer
});

export default rootReducer;
