import {combineReducers} from 'redux';
import {routerReducer} from "react-router-redux";
import {PendingShiftsReducer} from "./PendingShiftsReducer";
import {ShiftsReducer} from "./ShiftsReducer";
import {UserReducer} from "./UserReducer";
import {UsersReducer} from "./UsersReducer";
import {ModalReducer} from "./ModalReducer";
import {ReportsReducer} from "./ReportsReducer";
import {LoaderReducer} from "./LoaderReducer";
import {GeneralReducer} from "./GeneralReducer";
import reducer from "redux-form/es/reducer";
import {TasksReducer} from "./TasksReducer";

const rootReducer = combineReducers({
    loader: LoaderReducer,
    routing: routerReducer,
    users: UsersReducer,
    shifts: ShiftsReducer,
    pendingShifts: PendingShiftsReducer,
    tasks: TasksReducer,
    user: UserReducer,
    modal: ModalReducer,
    reports: ReportsReducer,
    form: reducer,
    general: GeneralReducer
});

export default rootReducer;
