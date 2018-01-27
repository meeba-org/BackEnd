import * as actions from "./actionTypes";

export const fetchUserSuccess = (payload) => ({
    type: actions.FETCH_USER_SUCCESS,
    payload
});

export const updateUserSuccess = (payload) => ({
    type: actions.UPDATE_USER_SUCCESS,
    payload
});

export const updateActiveUserSuccess = (payload) => ({
    type: actions.UPDATE_ACTIVE_USER_SUCCESS,
    payload
});

export const deleteUserSuccess = (id) => ({
    type: actions.DELETE_USER_SUCCESS,
    id
});

export const fetchUsersSuccess = (payload) => ({
    type: actions.FETCH_USERS_SUCCESS,
    payload
});

export const createUserSuccess = (payload) => ({
    type: actions.CREATE_USER_SUCCESS,
    payload
});

export const createUser = (user) => ({
    type: actions.API,
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

export const fetchUsers = (hideDeleted) => ({
    type: actions.API,
    payload: {
        url: "/users" + (hideDeleted ? "?hideDeleted=true" : ""),
        method: "get",
        success: fetchUsersSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const fetchUser = (userId) => ({
    type: actions.API,
    payload: {
        url: "/users/" + userId,
        method: "get",
        success: fetchUserSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const updateUser = (user) => ({
    type: actions.API,
    payload: {
        url: "/users",
        method: "put",
        data: user,
        success: updateUserSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const updateActiveUser = (user) => ({
    type: actions.API,
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
        modalType: 'DELETE_ENTITY',
        modalProps: {
            entity: user,
            deleteEntity: deleteUser,
            open: true
        }
    }
});

export const deleteUser = (user) => ({
    type: actions.API,
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

