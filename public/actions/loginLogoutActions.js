import axios from 'axios';
import config from "../config";
import firebase from "../helpers/FirebaseUiService";
import {GACategory} from "../helpers/GAService";
import {isUserAllowedLogin} from "../helpers/utils";
import * as actionsTypes from "./actionTypes";

const handleLoginSuccess = (response, history, isLoginMode) => {
    let user = response.data.user;
    if (!!user && !isUserAllowedLogin(user))
        throw new Error('אין הרשאות מתאימות');

    localStorage.setItem('idToken', response.data.token);
    localStorage.setItem('activeUser', JSON.stringify(response.data.user));

    history.push('/dashboard');
    return {
        type: actionsTypes.HANDLE_LOGIN_SUCCESS,
        ga: {
            category: isLoginMode ? GACategory.LOGIN : GACategory.REGISTER,
        }
    };
};

const registerUserSuccess = (user) => ({
    type: actionsTypes.REGISTER_SUCCESS,
    payload: user
});

const registerLoginUser = (values, isLoginMode, onSuccess, onError) => ({
    type: actionsTypes.API,
    payload: {
        url: isLoginMode ? "/login" : "/register",
        method: "post",
        data: values,
        success: (result) => dispatch => {
            localStorage.setItem('fbUser', result.user); // TODO Do I really need fbUser?
            dispatch(registerUserSuccess(result.user));
            if (onSuccess)
                onSuccess();
        },
        onError
    },
    meta: {
        shouldAuthenticate: true
    },
    ga: {
        category: GACategory.REGISTER,
    }
});

export const handleLoginRegister = (values, isLoginMode, onSuccess, onError) => async dispatch =>  {
    const {email, password} = values;
    try {
        if (!isLoginMode) {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
        }
        else {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        }
        let token = await firebase.auth().currentUser.getIdToken();

        localStorage.setItem("idToken", token);
        dispatch(registerLoginUser(values, isLoginMode, onSuccess, onError));

        return token; // Returning the promise
    } catch (err) {
        console.error(err);
        if (onError)
            onError(err);
        
    }
};

export const handleLogin = (values, isLoginMode, history, onSuccess, onError) => dispatch => {
    let route = isLoginMode ? "login" : "register";

    return axios.post(`${config.ROOT_URL}/${route}`, values)
        .then((response) => {
            if (onSuccess)
                onSuccess();

            dispatch(handleLoginSuccess(response, isLoginMode));
        })
        .catch((err) => {
            let message = 'Unknown Error';
            if (err) {
                if (!!err.response && !!err.response && !!err.response.data && !!err.response.data.message)
                    message = err.response.data.message;
                else if (err.message)
                    message = err.message;
            }

            onError(message);
        });
};

export const handleLogout = history => () => {
    localStorage.removeItem('idToken');
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

export const loadUserFromToken = onFinishLoading => dispatch => {
    let token = localStorage.getItem('idToken');
    if (!token || token === '') {//if there is no token, dont bother
        return;
    }

    //fetch user from token (if server deems it's valid token)
    dispatch(meFromToken());
    return axios({
        method: 'get',
        url: `${config.ROOT_URL}/api/authenticate`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(function (response) {
        let user = response.data.user;
        if (!!user && !isUserAllowedLogin(user))
            throw new Error('user is not allowed to login');

        dispatch(meFromTokenSuccess(user));
    }).catch(function () {
        dispatch(meFromTokenFailure("Error loading user from token"));
    }).finally(() => {
        if (onFinishLoading)
            onFinishLoading();
    });
};
