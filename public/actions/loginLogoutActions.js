import axios from 'axios';
import * as actionsTypes from "./actionTypes";
import config from "../config";
import {SubmissionError} from "redux-form";

function handleLoginStart() {
    return {type: actionsTypes.HANDLE_LOGIN_START};
}

function handleLoginSuccess(response, router) {
    //Store JWT Token to browser session storage
    //If you use localStorage instead of localStorage, then this w/ persisted across tabs and new windows.
    //localStorage = persisted only in current tab
    localStorage.setItem('jwtToken', response.data.token);
    //let other components know that everything is fine by updating the redux` state

    router.push('/dashboard');
}

export function handleLogin(values, router) {
    return function (dispatch) {
        dispatch(handleLoginStart());
        return axios.post(`${config.ROOT_URL}/login`, values)
            .then((response) => handleLoginSuccess(response, router))
            .catch((err) => {
                let data = err.response.data;

                throw new SubmissionError({
                    _error: data.message
                });
            });
    };
}

export function handleLogout(router) {
    return function () {
        localStorage.removeItem('jwtToken');
        router.push('/login');
    };
}

export function navigateHome(router) {
    return function () {
        router.push('/');
    };
}

export function meFromToken() {
    return {
        type: actionsTypes.ME_FROM_TOKEN,
    };
}

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

export function loadUserFromToken() {
    return function (dispatch) {
        let token = localStorage.getItem('jwtToken');
        if (!token || token === '') {//if there is no token, dont bother
            return;
        }

        //fetch user from token (if server deems it's valid token)
        dispatch(meFromToken());
        return axios({
            method: 'get',
            url: `${config.ROOT_URL}/authenticate`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(function (response) {
            localStorage.setItem('jwtToken', response.data.token);
            dispatch(meFromTokenSuccess(response.data.user));
        }).catch(function (response) {
            localStorage.removeItem('jwtToken');//remove token from storage
            dispatch(meFromTokenFailure(response.data.token));
        });
    };
}
