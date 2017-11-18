import {combineReducers} from 'redux';
import {routerReducer} from "react-router-redux";
import {reducer as formReducer} from 'redux-form';
import {ShiftsReducer} from "./ShiftsReducer";
import {UserReducer} from "./UserReducer";
import {UsersReducer} from "./UsersReducer";
import {ModalReducer} from "./ModalReducer";
import {ReportsReducer} from "./ReportsReducer";

const rootReducer = combineReducers({
    routing: routerReducer,
    users: UsersReducer,
    shifts: ShiftsReducer,
    user: UserReducer,
    modal: ModalReducer,
    reports: ReportsReducer,
    form: formReducer,
});

export default rootReducer;
