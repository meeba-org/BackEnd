import * as actions from "./actionTypes";
import callApi from "./api";
import {arrayPop, arrayPush} from 'redux-form';

export const fetchUserSuccess = (payload) => ({
    type: actions.FETCH_USER_SUCCESS,
    payload
});

export const fetchUsersSuccess = (payload) => ({
    type: actions.FETCH_USERS_SUCCESS,
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
            dispatchUpdateNewEmployeesInForm(dispatch, response.user);
        });
    };
};

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
        success: fetchUserSuccess,
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
        success: () => {},
    },
    meta: {
        shouldAuthenticate: true,
    }
});

