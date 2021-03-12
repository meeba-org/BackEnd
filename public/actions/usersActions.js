import {EModalType} from "../components/modals/EModalType";
import {DEFAULT_IA_TASK_TITLE, DEFAULT_NON_IA_TASK_TITLE} from "../components/user/constants";
import {
    API,
    CREATE_USER_SUCCESS,
    DELETE_USER_SUCCESS,
    FETCH_USER_SUCCESS,
    FETCH_USERS_SUCCESS, UPDATE_ACTIVE_USER_SUCCESS,
    UPDATE_USER_SUCCESS
} from "./actionTypes";
import {createTask} from "./tasksActions";

export const fetchUserSuccess = (payload) => ({
    type: FETCH_USER_SUCCESS,
    payload
});

export const updateUserSuccess = (payload) => ({
    type: UPDATE_USER_SUCCESS,
    payload
});

export const updateActiveUserSuccess = (payload) => ({
    type: UPDATE_ACTIVE_USER_SUCCESS,
    payload
});

export const deleteUserSuccess = (id) => ({
    type: DELETE_USER_SUCCESS,
    id
});

export const fetchUsersSuccess = (payload) => ({
    type: FETCH_USERS_SUCCESS,
    payload
});

export const createUserSuccess = (payload) => ({
    type: CREATE_USER_SUCCESS,
    payload
});

export const createUser = (user) => ({
    type: API,
    payload: {
        url: "/users",
        method: "post",
        data: user,
        success: createUserSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const fetchUsers = (callback) => ({
    type: API,
    payload: {
        url: `/users?hideDeleted=true`,
        method: "get",
        success: (payload) => {
            if (callback)
                callback();
            return fetchUsersSuccess(payload);
        },
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const fetchUser = (userId) => ({
    type: API,
    payload: {
        url: "/users/" + userId,
        method: "get",
        success: fetchUserSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const showEditEmployeeModal = (employee, onUpdate) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: EModalType.EDIT_EMPLOYEE,
        modalProps: {
            entity: employee,
            updateUser: onUpdate,
            open: true,
            key: employee._id
        }
    }
});

export const showLoginRegisterDialog = () => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: EModalType.LOGIN_REGISTER,
        modalProps: {
            open: true,
        }
    }
});

export const updateUser = (user) => ({
    type: API,
    payload: {
        url: "/users",
        method: "put",
        data: user,
        success: updateUserSuccess,
    },
    meta: {
        shouldAuthenticate: true,
        debounce: {
            time: 700
        }
    }
});

export const updateActiveUser = (user) => ({
    type: API,
    payload: {
        url: "/users",
        method: "put",
        data: user,
        success: updateActiveUserSuccess,
    },
    meta: {
        shouldAuthenticate: true,
        debounce: {
            time: 700
        }
    }
});


export const showDeleteUserModal = (user) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: EModalType.DELETE_ENTITY,
        modalProps: {
            entity: user,
            deleteEntity: deleteUser,
            open: true
        }
    }
});

export const showMobileAppModal = () => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: EModalType.MOBILE_APP_LINKS,
        modalProps: {
            open: true
        }
    }
});

export const deleteUser = (user) => ({
    type: API,
    payload: {
        url: "/users/" + user._id,
        method: "delete",
        data: user,
        success: deleteUserSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const showAddDefaultIATasksModal = (tasks, companyId) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: EModalType.YES_NO_MODAL,
        modalProps: {
            open: true,
            onAction: () => addDefaultIATasks(tasks, companyId),
            text: "תרצה להוסיף את המשימות הבאות: 'מחקר ופיתוח' ו-'אחר'?"
        }
    }
});

export const handleInnovativeAuthorityChange = companyId => ({
    type: API,
    payload: {
        url: `/company/${companyId}/enableIA`,
        method: "post",
        data: {},
        success: deleteUserSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

const addDefaultIATasks = (tasks, companyId) => dispatch => {
    const shouldAddDefaultIATask = !(tasks.find(t => t.title === DEFAULT_IA_TASK_TITLE));
    const shouldAddNoneIaTask = !(tasks.find(t => t.title === DEFAULT_NON_IA_TASK_TITLE));
    
    if (shouldAddDefaultIATask) {
        dispatch(createTask({
            title: DEFAULT_IA_TASK_TITLE,
            isInnovative: true,
            company: companyId
        }));
    }
    
    if (shouldAddNoneIaTask) {
        dispatch(createTask({
            title: DEFAULT_NON_IA_TASK_TITLE,
            isInnovative: false,
            company: companyId
        }));
    }
};
