import * as types from '../actions/actionTypes';
import {combineReducers} from 'redux';
import {routerReducer} from "react-router-redux";
// import { reducer as formReducer } from 'redux-form';
import { reducer as formReducer } from 'redux-form';


function employeesReducer(state = [], action = null) {
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

function shiftsReducer(state = [], action = null) {
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
            return state.filter(shift => shift.id !== action.id);
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

const rootReducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    employees: employeesReducer,
    shifts: shiftsReducer,
});

export default rootReducer;
