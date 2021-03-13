import {DEFAULT_IA_TASK_TITLE, DEFAULT_NON_IA_TASK_TITLE} from "../components/user/constants";
import {API, UPDATE_COMPANY_SUCCESS} from "./actionTypes";
import {updateTaskSuccess} from "./tasksActions";
import {showAddDefaultIATasksModal} from "./usersActions";

export const updateCompanySuccess = (payload) => ({
    type: UPDATE_COMPANY_SUCCESS,
    payload
});

export const updateCompany = (company) => ({
    type: API,
    payload: {
        url: "/companies",
        method: "put",
        data: company,
        success: updateCompanySuccess,
    },
    meta: {
        shouldAuthenticate: true,
        debounce: {
            time: 700
        }
    }
});

export const handleInnovativeAuthorityToggle = (company, enable) => ({
    type: API,
    payload: {
        url: '/companies/toggleIA',
        method: "put",
        data: {
            company,
        },
        success: (payload) => innovationAuthorityToggleSuccess(payload, enable),
    },
    meta: {
        shouldAuthenticate: true,
        debounce: {
            time: 700
        }
    }
});

export const innovationAuthorityToggleSuccess = ({ company, tasks}, enable) => dispatch => {
    dispatch(updateCompanySuccess(company));
    dispatch(updateTaskSuccess(tasks));
    
    if (!enable) // If we disable IA then no need to create default IA tasks
        return;

    if (tasks) {
        const shouldAddDefaultIATask = !(tasks.find(t => t.title === DEFAULT_IA_TASK_TITLE));
        const shouldAddNoneIaTask = !(tasks.find(t => t.title === DEFAULT_NON_IA_TASK_TITLE));

        if (shouldAddNoneIaTask || shouldAddDefaultIATask)
            dispatch(showAddDefaultIATasksModal(tasks, company._id));
    }
};
    


