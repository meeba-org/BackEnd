import axios from 'axios';
import config from "../config";
import firebase from "../helpers/FirebaseUiService";
import {GACategory} from "../helpers/GAService";
import {isUserAllowedLogin} from "../helpers/utils";
import * as actionsTypes from "./actionTypes";

// const handleLoginSuccess = (response, history, isLoginMode) => {
//     let user = response.data.user;
//     if (!!user && !isUserAllowedLogin(user))
//         throw new Error('אין הרשאות מתאימות');
//
//     localStorage.setItem('idToken', response.data.token);
//     localStorage.setItem('activeUser', JSON.stringify(response.data.user));
//
//     history.push('/dashboard');
//     return {
//         type: actionsTypes.HANDLE_LOGIN_SUCCESS,
//         ga: {
//             category: isLoginMode ? GACategory.LOGIN : GACategory.REGISTER,
//         }
//     };
// };

const registerUserSuccess = (user) => ({
    type: actionsTypes.REGISTER_SUCCESS,
    payload: user
});

const registerUser = (onSuccess, onError) => ({
    type: actionsTypes.API,
    payload: {
        url: "/register",
        method: "post",
        data: {},
        success: (result) => dispatch => {
            // localStorage.setItem('fbUser', result.user); // TODO Do I really need fbUser?
            dispatch(registerUserSuccess(result.user));
            if (onSuccess)
                onSuccess();
        },
        onError: err => dispatch => {
            dispatch(meFromTokenFailure(err));
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

export const handleRegister = (values, onSuccess, onError) => async dispatch =>  {
    const {email, password} = values;
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        let token = await firebase.auth().currentUser.getIdToken();

        localStorage.setItem("idToken", token);
        dispatch(registerUser(onSuccess, onError));

        return token; // Returning the promise
    } catch (err) {
        console.error(err);
        if (onError)
            onError(err);
        
    }
};

export const handleLogin = (values, onSuccess, onError) => async dispatch =>  {
    const {email, password} = values;
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        let token = await firebase.auth().currentUser.getIdToken();

        localStorage.setItem("idToken", token);
        dispatch(authenticate(onSuccess, onError));

        return token; // Returning the promise
    } catch (err) {
        console.error(err);
        if (onError)
            onError(err);
        
    }
};

// export const handleLogin = (values, history, onSuccess, onError) => dispatch => {
//     return axios.post(`${config.ROOT_URL}/login`, values)
//         .then((response) => {
//             if (onSuccess)
//                 onSuccess();
//
//             dispatch(handleLoginSuccess(response, isLoginMode));
//         })
//         .catch((err) => {
//             let message = 'Unknown Error';
//             if (err) {
//                 if (!!err.response && !!err.response && !!err.response.data && !!err.response.data.message)
//                     message = err.response.data.message;
//                 else if (err.message)
//                     message = err.message;
//             }
//
//             onError(message);
//         });
// };

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

export const authenticate = (onSuccess, onError) => ({
    type: actionsTypes.API,
    payload: {
        url: "/authenticate",
        method: "get",
        success: data => dispatch => {
            dispatch(meFromTokenSuccess(data.user));
            if (onSuccess)
                onSuccess();
        },
        onError: err => dispatch => {
            dispatch(meFromTokenFailure(err));
            if (onError)
                onError();
        }
    },
    meta: {
        shouldAuthenticate: true
    }
});
