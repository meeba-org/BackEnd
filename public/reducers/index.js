import {combineReducers} from 'redux';
import {routerReducer} from "react-router-redux";
import {reducer as formReducer} from 'redux-form';
import {ShiftsReducer} from "./ShiftsReducer";
import {EmployeesReducer} from "./EmployeesReducer";
import {CompanyReducer} from "./CompanyReducer";

const rootReducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    employees: EmployeesReducer,
    shifts: ShiftsReducer,
    company: CompanyReducer,
});

export default rootReducer;
