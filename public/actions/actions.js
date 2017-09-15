import axios from 'axios';
import {arrayPop, arrayPush} from 'redux-form';
import callApi from "./api";

import {
    RECEIVE_EMPLOYEES_ERROR, RECEIVE_EMPLOYEES_SUCCESS, REQUEST_EMPLOYEES,
    DELETE_EMPLOYEE_START, DELETE_EMPLOYEE_SUCCESS, DELETE_EMPLOYEE_ERROR,
    CREATE_EMPLOYEE_ERROR, CREATE_EMPLOYEE_SUCCESS, CREATE_EMPLOYEE_START,
    UPDATE_EMPLOYEE_START, UPDATE_EMPLOYEE_SUCCESS, UPDATE_EMPLOYEE_ERROR,
    RESET_TOKEN, ME_FROM_TOKEN_FAILURE, ME_FROM_TOKEN_SUCCESS, ME_FROM_TOKEN,
} from "./actionTypes";
import config from "../config";


function requestEmployees() {
    return {type: REQUEST_EMPLOYEES};
}

function receiveEmployeesSuccess(json) {
    return {
        type: RECEIVE_EMPLOYEES_SUCCESS,
        employees: json
    };
}

function receiveEmployeesError() {
    return {
        type: RECEIVE_EMPLOYEES_ERROR,
    };
}

export function fetchEmployees() {
    return function (dispatch) {
        dispatch(requestEmployees());
        return callApi({
            url: '/users',
            timeout: 20000,
            method: 'get',
            shouldAuthenticate: true,
         }).then(function (result) {
            dispatch(receiveEmployeesSuccess(result.users));
        }).catch(function (response) {
            dispatch(receiveEmployeesError(response.data));
        });
    };
}

function deleteEmployeeStart() {
    return {type: DELETE_EMPLOYEE_START};
}

function deleteEmployeeSuccess() {
    return {
        type: DELETE_EMPLOYEE_SUCCESS,
    };
}

function deleteEmployeeError(json) {
    return {
        type: DELETE_EMPLOYEE_ERROR,
        data: json
    };
}

export function deleteEmployee(employee) {
    return function (dispatch) {
        dispatch(deleteEmployeeStart());
        return callApi({
            url: '/users/' + employee.uid,
            method: 'delete',
            shouldAuthenticate: true,
        }).then(function (response) {
            dispatch(deleteEmployeeSuccess(response));
        }).catch(function (response) {
            dispatch(deleteEmployeeError(response.data));
        });
    };
}

function updateEmployeeStart() {
    return {type: UPDATE_EMPLOYEE_START};
}

function updateEmployeeSuccess(json) {
    return {
        type: UPDATE_EMPLOYEE_SUCCESS,
        employees: json
    };
}

function updateEmployeeError(json) {
    return {
        type: UPDATE_EMPLOYEE_ERROR,
        data: json
    };
}

export function updateEmployee(employee) {
    return function (dispatch) {
        dispatch(updateEmployeeStart());
        return callApi({
            url: '/users',
            method: 'put',
            data: employee,
            shouldAuthenticate: true
        }).then(function (response) {
            dispatch(updateEmployeeSuccess(response.user));
        }).catch(function (response) {
            dispatch(updateEmployeeError(response.user));
        });
    };
}

function createEmployeeStart() {
    return {type: CREATE_EMPLOYEE_START};
}

function createEmployeeSuccess() {
    return {
        type: CREATE_EMPLOYEE_SUCCESS,
    };
}

function createEmployeeError(json) {
    return {
        type: CREATE_EMPLOYEE_ERROR,
        data: json
    };
}

function dispatchUpdateNewEmployeesInForm(dispatch, newEmployee) {
    dispatch(arrayPop('employeesForm', 'employees'));
    dispatch(arrayPush('employeesForm', 'employees', newEmployee));
}

export function createEmployee(employee) {
    return function (dispatch) {
        dispatch(createEmployeeStart());
        return callApi({
            method: 'post',
            url: '/users',
            data: employee,
            shouldAuthenticate: true
        }).then(function (response) {
            dispatch(createEmployeeSuccess(response));
            dispatchUpdateNewEmployeesInForm(dispatch, response.user);
        }).catch(function (response) {
            dispatch(createEmployeeError(response.data));
        });
    };
}

function handleLoginStart() {
    return {type: CREATE_EMPLOYEE_START};
}

function handleLoginSuccess() {
    return {
        type: CREATE_EMPLOYEE_SUCCESS,
    };
}

function handleLoginError(json) {
    return {
        type: CREATE_EMPLOYEE_ERROR,
        data: json
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

export function meFromToken() {
    return {
        type: ME_FROM_TOKEN,
    };
}

export function meFromTokenSuccess(currentUser) {
    return {
        type: ME_FROM_TOKEN_SUCCESS,
        payload: currentUser
    };
}

export function meFromTokenFailure(error) {
    return {
        type: ME_FROM_TOKEN_FAILURE,
        payload: error
    };
}

export function resetToken() {//used for logout
    return {
        type: RESET_TOKEN
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
            dispatch(meFromTokenSuccess(response.data.token));
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
