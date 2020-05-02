import axios from 'axios';
import config from "../config";
import {GACategory} from "../helpers/GAService";
import {isUserAllowedLogin} from "../helpers/utils";
import * as actionsTypes from "./actionTypes";
import {hideLoginRegisterModal} from "./index";

function handleLoginStart() {
    return {
        type: actionsTypes.HANDLE_LOGIN_START
    };
}

const registerUserSuccess = user => ({
    type: actionsTypes.REGISTER_SUCCESS,
    payload: user
});
    
const loginUserSuccess = user => ({
    type: actionsTypes.LOGIN_SUCCESS,
    payload: user
});

export const registerUserFailure = error => ({
    type: actionsTypes.REGISTER_FAILURE,
    payload: error
});

export const loginUserFailure = (error) => ({
    type: actionsTypes.LOGIN_FAILURE,
    payload: error
});

export const handleRegister = (data, onSuccess, onError) => ({
    type: actionsTypes.API,
    payload: {
        url: "/register",
        method: "post",
        data,
        success: result => dispatch => {
            // TODO the following happens twice... think about it
            localStorage.setItem('jwtToken', result.token);
            dispatch(registerUserSuccess(result.user));
            if (onSuccess)
                onSuccess();
        },
        onError: err => dispatch => {
            dispatch(registerUserFailure(err));
            if (onError)
                onError(err);
        }
    },
    ga: {
        category: GACategory.REGISTER,
    }
});

export const handleLogin = (data, onSuccess, onError) => ({
    type: actionsTypes.API,
    payload: {
        url: "/login",
        method: "post",
        data,
        success: result => dispatch => {
            localStorage.setItem('jwtToken', result.token);
            dispatch(loginUserSuccess(result.user));
            if (onSuccess)
                onSuccess();
        },
        onError: err => dispatch => {
            dispatch(loginUserFailure(err));
            if (onError)
                onError(err);
        }
    },
    ga: {
        category: GACategory.LOGIN,
    }
});

export const handleLogout = history => () => {
    localStorage.removeItem('jwtToken');
    history.push('/home');
};

export const navigateHome = history => () => {
    history.push('/');
};

export function meFromTokenSuccess(currentUser) {
    return {
        type: actionsTypes.ME_FROM_TOKEN_SUCCESS,
        payload: currentUser
    };
}

export function meFromTokenFailure(error) {
    return {
        type: actionsTypes.ME_FROM_TOKEN_FAILURE,
        payload: error
    };
}

export const authenticate = (onSuccess, onError) => ({
    type: actionsTypes.API,
    payload: {
        url: '/authenticate',
        method: 'get',
        success: result => dispatch => {
            localStorage.setItem('jwtToken', result.token);
            dispatch(meFromTokenSuccess(result.user));
            if (onSuccess)
                onSuccess();
        },
        onError: (err) => dispatch => {
            dispatch(meFromTokenFailure(err));
            localStorage.removeItem('jwtToken');//remove token from storage
            if (onError)
                onError();
        }
    },
    meta: {
        shouldAuthenticate: true
    }
});
