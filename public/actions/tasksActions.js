import * as actions from "./actionTypes";

export const fetchTasksSuccess = (payload) => {
    return {
        type: actions.FETCH_TASKS_SUCCESS,
        payload
    };
};

export const updateTaskSuccess = (payload) => {
    return {
        type: actions.UPDATE_TASK_SUCCESS,
        payload
    };
};

export const deleteTaskSuccess = (payload) => {
    return {
        type: actions.DELETE_TASK_SUCCESS,
        payload
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
