import {EModalType} from "../components/modals/EModalType";
import {
    API,
    CREATE_TASK_SUCCESS,
    DELETE_TASK_SUCCESS,
    FETCH_TASKS_SUCCESS,
    FILTER_TASKS,
    UPDATE_TASK_SUCCESS
} from "./actionTypes";

export const fetchTasksSuccess = (payload) => {
    return {
        type: FETCH_TASKS_SUCCESS,
        payload
    };
};

export const filterTasks = (parent) => ({
    type: FILTER_TASKS,
    parent
});

export const createTasksSuccess = (payload) => {
    return {
        type: CREATE_TASK_SUCCESS,
        payload
    };
};

export const updateTaskSuccess = (payload) => {
    return {
        type: UPDATE_TASK_SUCCESS,
        payload
    };
};

export const deleteTaskSuccess = (id) => {
    return {
        type: DELETE_TASK_SUCCESS,
        id
    };
};

export const fetchTasks = () => ({
    type: API,
    payload: {
        url: "/tasks",
        method: "get",
        success: fetchTasksSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const createTask = (task) => ({
    type: API,
    payload: {
        url: "/tasks",
        method: "post",
        data: task,
        success: createTasksSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const updateTask = (task) => ({
    type: API,
    payload: {
        url: "/tasks",
        method: "put",
        data: task,
        success: updateTaskSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const showDeleteTaskModal = (entity) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: EModalType.DELETE_ENTITY,
        modalProps: {
            entity: entity,
            deleteEntity: deleteTask,
            open: true
        }
    }
});

export const deleteTask = (task) => ({
    type: API,
    payload: {
        url: "/tasks/" + task._id,
        method: "delete",
        success: deleteTaskSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const openTaskModal = (entity) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: EModalType.TASK_MODAL,
        modalProps: {
            orgTask: entity,
            open: true,
        }
    }
});
