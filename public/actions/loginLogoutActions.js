import axios from 'axios';
import * as actionsTypes from "./actionTypes";
import config from "../config";
import SubmissionError from "redux-form/es/SubmissionError";
import {isUserAllowedLogin} from "../helpers/utils";
import {GAAction} from "../helpers/GATypes";
import {extractCompany, extractUser} from "../middlewares/gaMiddleware";

function handleLoginStart() {
    return {
        type: actionsTypes.HANDLE_LOGIN_START
    };
}

function handleLoginSuccess(response, router, isLoginMode) {
    let user = response.data.user;
    if (!!user && !isUserAllowedLogin(user))
        throw new Error('אין הרשאות מתאימות');

    localStorage.setItem('jwtToken', response.data.token);

    router.push('/dashboard');

    return {
        type: actionsTypes.HANDLE_LOGIN_SUCCESS,
        ga: {
            category: extractCompany(user),
            action: extractUser(user),
            actionType: isLoginMode? GAAction.LOGIN : GAAction.REGISTER,
        }
    };
}

export function handleLogin(values, router) {
    return function (dispatch) {
        let route = values.isLoginMode ? "login" : "register";

        dispatch(handleLoginStart());
        return axios.post(`${config.ROOT_URL}/${route}`, values)
            .then((response) => dispatch(handleLoginSuccess(response, router, values.isLoginMode)))
            .catch((err) => {
                let message = 'Unknown Error';
                if (err) {
                    if (!!err.response && !! err.response && !!err.response.data && !!err.response.data.message)
                        message = err.response.data.message;
                    else if (err.message)
                        message = err.message;
                }

                throw new SubmissionError({
                    _error: message
                });
            });
    };
}

export function handleLogout(router) {
    return function () {
        localStorage.removeItem('jwtToken');
        router.push('/home');
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
            let user = response.data.user;
            if (!!user && !isUserAllowedLogin(user))
                throw new Error('user is not allowed to login');

            localStorage.setItem('jwtToken', response.data.token);
            localStorage.setItem('activeUser', JSON.stringify(user));
            dispatch(meFromTokenSuccess(user));
        }).catch(function () {
            localStorage.removeItem('jwtToken');//remove token from storage
            dispatch(meFromTokenFailure("Error loading user from token"));
        });
    };
}
