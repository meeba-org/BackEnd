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
    
export const handleRegister = (data, onSuccess, onError) => ({
    type: actionsTypes.API,
    payload: {
        url: "/register",
        method: "post",
        data,
        success: (result) => dispatch => {
            localStorage.setItem('jwtToken', result.token);
            dispatch(registerUserSuccess(result.user));
            if (onSuccess)
                onSuccess();
        },
        onError: err => dispatch => {
            dispatch(registerUserFailure(err));
            if (onError)
                onError();
        }
    },
    meta: {
        shouldAuthenticate: true
    },
    ga: {
        category: GACategory.REGISTER,
    }
});

function handleLoginSuccess(response, history, isLoginMode) {
    let user = response.data.user;
    if (!!user && !isUserAllowedLogin(user))
        throw new Error('אין הרשאות מתאימות');

    localStorage.setItem('jwtToken', response.data.token);
    localStorage.setItem('activeUser', JSON.stringify(response.data.user));

    history.push('/dashboard');
    return {
        type: actionsTypes.HANDLE_LOGIN_SUCCESS,
        ga: {
            category: isLoginMode ? GACategory.LOGIN : GACategory.REGISTER,
        }
    };
}


export const handleLogin = (values, isLoginMode, history, onSuccess, onError) => dispatch => {
        let route = isLoginMode ? "login" : "register";

        dispatch(handleLoginStart());
        return axios.post(`${config.ROOT_URL}/${route}`, values)
            .then((response) => {
                if (onSuccess)
                    onSuccess();

                dispatch(hideLoginRegisterModal());
                dispatch(handleLoginSuccess(response, history, isLoginMode));
            })
            .catch((err) => {
                let message = 'Unknown Error';
                if (err) {
                    if (!!err.response && !! err.response && !!err.response.data && !!err.response.data.message)
                        message = err.response.data.message;
                    else if (err.message)
                        message = err.message;
                }

                onError(message);
            });
    };

export const handleLogout = history => () => {
    localStorage.removeItem('jwtToken');
    history.push('/home');
};

export const navigateHome = history => () => {
    history.push('/');
};

export const meFromToken = () => ({
    type: actionsTypes.ME_FROM_TOKEN,
});

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

export function registerUserFailure(error) {
    return {
        type: actionsTypes.REGISTER_FAILURE,
        payload: error
    };
}

export function loadUserFromToken(onFinishLoading) {
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
        }).finally( () => {
            if (onFinishLoading)
                onFinishLoading();
        });
    };
}
