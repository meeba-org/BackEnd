import axios from 'axios';
import * as actionsTypes from "./actionTypes";
import config from "../config";

export * from "./employeesActions";
export * from "./shiftsActions";
export * from "./userActions";

function handleLoginStart() {
    return {type: actionsTypes.CREATE_EMPLOYEE_START};
}

function handleLoginSuccess() {
    return {
        type: actionsTypes.CREATE_EMPLOYEE_SUCCESS,
    };
}

function handleLoginError(error) {
    return {
        type: actionsTypes.CREATE_EMPLOYEE_ERROR,
        error: error
    };
}

export function handleLogin(values, router) {
    return function (dispatch) {
        dispatch(handleLoginStart());
        return axios.post(`${config.ROOT_URL}/login`, values)
            .then(function (response) {
                dispatch(handleLoginSuccess(response));
                //Store JWT Token to browser session storage
                //If you use localStorage instead of localStorage, then this w/ persisted across tabs and new windows.
                //localStorage = persisted only in current tab
                localStorage.setItem('jwtToken', response.data.token);
                //let other components know that everything is fine by updating the redux` state

                router.push('/dashboard');
            }).catch(function () {
                dispatch(handleLoginError());
            });
    };
}

export function handleLogout(router) {
    localStorage.removeItem('jwtToken');
    router.push('/login');
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

export function resetToken() {//used for logout
    return {
        type: actionsTypes.RESET_TOKEN
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

export function resetMe() {
    return function (dispatch) {
        localStorage.removeItem('jwtToken'); //remove token from storage
        dispatch(resetToken());
    };
}
