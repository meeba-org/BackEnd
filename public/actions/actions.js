import axios from 'axios';
import {arrayPop, arrayPush} from 'redux-form';


import {
    RECEIVE_EMPLOYEES_ERROR, RECEIVE_EMPLOYEES_SUCCESS, REQUEST_EMPLOYEES,
    DELETE_EMPLOYEE_START, DELETE_EMPLOYEE_SUCCESS, DELETE_EMPLOYEE_ERROR,
    CREATE_EMPLOYEE_ERROR, CREATE_EMPLOYEE_SUCCESS, CREATE_EMPLOYEE_START,
    UPDATE_EMPLOYEE_START, UPDATE_EMPLOYEE_SUCCESS, UPDATE_EMPLOYEE_ERROR
} from "./actionTypes";


function requestEmployees() {
    return {type: REQUEST_EMPLOYEES};
}

function receiveEmployeesSuccess(json) {
    return {
        type: RECEIVE_EMPLOYEES_SUCCESS,
        employees: json
    };
}

function receiveEmployeesError(json) {
    return {
        type: RECEIVE_EMPLOYEES_ERROR,
        data: json
    };
}

export function fetchEmployees() {
    return function (dispatch) {
        dispatch(requestEmployees());
        return axios({
            url: 'http://localhost:3000/api/users',
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            dispatch(receiveEmployeesSuccess(response.data.users));
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
        return axios({
            url: 'http://localhost:3000/api/users/' + employee.uid,
            method: 'delete',
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
        return axios({
            url: 'http://localhost:3000/api/users',
            timeout: 20000,
            method: 'put',
            data: employee,
            responseType: 'json'
        }).then(function (response) {
            dispatch(updateEmployeeSuccess(response.data.users));
        }).catch(function (response) {
            dispatch(updateEmployeeError(response.data));
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
        return axios.post('http://localhost:3000/api/users', employee)
        .then(function (response) {
            dispatch(createEmployeeSuccess(response));
            dispatchUpdateNewEmployeesInForm(dispatch, response.data.user);
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

export function handleLogin(values) {
    return function (dispatch) {
        dispatch(handleLoginStart());
        return axios.post('http://localhost:3000/login', values)
        .then(function (response) {
            dispatch(handleLoginSuccess(response));
        }).catch(function (response) {
            dispatch(handleLoginError(response.data));
        });
    };
}

