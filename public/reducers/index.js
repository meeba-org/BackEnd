import {combineReducers} from 'redux';
import {routerReducer} from "react-router-redux";
import {reducer as formReducer} from 'redux-form';
import {ShiftsReducer} from "./ShiftsReducer";
import {EmployeesReducer} from "./EmployeesReducer";
import {UserReducer} from "./UserReducer";

const rootReducer = combineReducers({
    routing: routerReducer,
    employees: EmployeesReducer,
    shifts: ShiftsReducer,
    user: UserReducer,
    form: formReducer,
});

export default rootReducer;
