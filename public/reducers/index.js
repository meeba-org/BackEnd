import * as types from '../actions/actionTypes';
import {combineReducers} from 'redux';
import {routerReducer} from "react-router-redux";
// import { reducer as formReducer } from 'redux-form';
import { reducer as formReducer } from 'redux-form';
import ShiftAnalyzer from "../helpers/ShiftAnalyzer";


function dataReducer(state = {isLoading: false, data: [], error: false}, action = null) {
    switch (action.type) {
        case types.REQUEST_EMPLOYEES:
            return Object.assign({}, state, {isLoading: true, error: false});
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

function shiftsReducer(state = {}, action = null) {
    switch (action.type) {
        case types.CREATE_SHIFT_SUCCESS:
        case types.UPDATE_SHIFT_SUCCESS: {
            return {
                ...state,
                [action.shift._id]: action.shift
            };
        }
        case types.DELETE_SHIFT_SUCCESS: {
            return state.filter(shift => shift.id !== action.id);
        }
        case types.FETCH_SHIFTS_SUCCESS: {
            let shifts = action.shifts.reduce(function (obj, item) {
                obj[item._id] = item;
                return obj;
            }, {});
            return Object.assign({}, state, shifts);
        }
        default:
            return state;
    }
}

function reportReducer(state = {}, action = null) {
    switch (action.type) {
        case types.CREATE_SHIFT_SUCCESS:
        case types.UPDATE_SHIFT_SUCCESS:
        case types.DELETE_SHIFT_SUCCESS:
        case types.FETCH_SHIFTS_SUCCESS:  {
            /**
             * TODO Chen continue from here - no access to state.shifts i this level
             * https://stackoverflow.com/questions/34419809/redux-is-there-any-way-to-access-store-tree-in-reducer
             */
            let report = ShiftAnalyzer.createReport(state.shifts);
            return Object.assign({}, state, report);
        }
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    data: dataReducer,
    shifts: shiftsReducer,
    report: reportReducer
});

export default rootReducer;
