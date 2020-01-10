import {combineReducers} from 'redux';
import {ShiftsReducer} from "./ShiftsReducer";
import {UserReducer} from "./UserReducer";
import {UsersReducer} from "./UsersReducer";
import {ModalReducer} from "./ModalReducer";
import {ReportsReducer} from "./ReportsReducer";
import {LoaderReducer} from "./LoaderReducer";
import {GeneralReducer} from "./GeneralReducer";
import reducer from "redux-form/es/reducer";
import {TasksReducer} from "./TasksReducer";
import { PaymentReducer } from './PaymentReducer';

const rootReducer = combineReducers({
    loader: LoaderReducer,
    users: UsersReducer,
    shifts: ShiftsReducer,
    // pendingShifts: PendingShiftsReducer,
    tasks: TasksReducer,
    user: UserReducer,
    modal: ModalReducer,
    reports: ReportsReducer,
    form: reducer,
    general: GeneralReducer,
    payment: PaymentReducer,
});

export default rootReducer;
