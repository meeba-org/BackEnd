import axios from 'axios';
import config from "../config";
import {GACategory} from "../helpers/GATypes";
import {isUserAllowedLogin} from "../helpers/utils";
import * as actionsTypes from "./actionTypes";
import {hideLoginRegisterModal} from "./index";

function handleLoginStart() {
    return {
        type: actionsTypes.HANDLE_LOGIN_START
    };
}

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

export const handleLogin = (values, isLoginMode, history, onError) => dispatch => {
        let route = isLoginMode ? "login" : "register";

        dispatch(handleLoginStart());
        return axios.post(`${config.ROOT_URL}/${route}`, values)
            .then((response) => {
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
