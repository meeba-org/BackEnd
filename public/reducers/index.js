import {combineReducers} from 'redux';
import {routerReducer} from "react-router-redux";
import {ShiftsReducer} from "./ShiftsReducer";
import {UserReducer} from "./UserReducer";
import {UsersReducer} from "./UsersReducer";
import {ModalReducer} from "./ModalReducer";
import {ReportsReducer} from "./ReportsReducer";
import {LoaderReducer} from "./LoaderReducer";
import {GeneralReducer} from "./GeneralReducer";
import {TasksReducer} from "./TasksReducer";
import { PaymentReducer } from './PaymentReducer';


const rootReducer = combineReducers({
    loader: LoaderReducer,
    routing: routerReducer,
    users: UsersReducer,
    shifts: ShiftsReducer,
    tasks: TasksReducer,
    user: UserReducer,
    modal: ModalReducer,
    reports: ReportsReducer,
    general: GeneralReducer,
    payment: PaymentReducer,
});

export default rootReducer;
