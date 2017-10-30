import * as actions from "./actionTypes";
import {arrayPop, arrayPush} from 'redux-form';

export const fetchUserSuccess = (payload) => ({
    type: actions.FETCH_USER_SUCCESS,
    payload
});

export const updateUserSuccess = (payload) => ({
    type: actions.UPDATE_USER_SUCCESS,
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

function dispatchUpdateNewEmployeesInForm(dispatch, newEmployee) {
    dispatch(arrayPop('employeesForm', 'employees'));
    dispatch(arrayPush('employeesForm', 'employees', newEmployee));
}

export const createUser = (user) => {
    return function (dispatch) {
        return callApi({
            method: 'post',
            url: '/users',
            data: user,
            shouldAuthenticate: true
        }).then(function (response) {
            dispatchUpdateNewEmployeesInForm(dispatch, response);
        });
    };
};

// export const createUser = (user) => ({
//     type: actions.API,
//     payload: {
//         url: "/users",
//         method: "post",
//         data: user,
//         success: createUserSuccess,
//     },
//     meta: {
//         shouldAuthenticate: true,
//     }
// });

export const fetchUsers = () => ({
    type: actions.API,
    payload: {
        url: "/users",
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

