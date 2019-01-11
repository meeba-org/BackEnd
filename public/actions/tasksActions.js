import * as actions from "./actionTypes";

export const fetchTasksSuccess = (payload) => {
    return {
        type: actions.FETCH_TASKS_SUCCESS,
        payload
    };
};

export const createTasksSuccess = (payload) => {
    return {
        type: actions.CREATE_TASK_SUCCESS,
        payload
    };
};

export const updateTaskSuccess = (payload) => {
    return {
        type: actions.UPDATE_TASK_SUCCESS,
        payload
    };
};

export const deleteTaskSuccess = (id) => {
    return {
        type: actions.DELETE_TASK_SUCCESS,
        id
    };
};

export const fetchTasks = () => ({
    type: actions.API,
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
    type: actions.API,
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
    type: actions.API,
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
        modalType: 'DELETE_ENTITY',
        modalProps: {
            entity: entity,
            deleteEntity: deleteTask,
            open: true
        }
    }
});

export const deleteTask = (task) => ({
    type: actions.API,
    payload: {
        url: "/tasks/" + task._id,
        method: "delete",
        success: deleteTaskSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const openTaskModal = (task) => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: 'TASK_MODAL',
        modalProps: {
            createTask,
            entity: task,
            open: true,
            key: task._id
        }
    }
});
