import axios from 'axios';
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

function deleteEmployeeSuccess(json) {
    return {
        type: DELETE_EMPLOYEE_SUCCESS,
        employees: json
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
            url: 'http://localhost:3000/api/user/' + employee._id,
            timeout: 20000,
            method: 'delete',
            responseType: 'json'
        }).then(function (response) {
            dispatch(deleteEmployeeSuccess(response.data.users));
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
            url: 'http://localhost:3000/api/user',
            timeout: 20000,
            method: 'put',
            data: {user: employee},
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

function createEmployeeSuccess(json) {
    return {
        type: CREATE_EMPLOYEE_SUCCESS,
        employees: json
    };
}

function createEmployeeError(json) {
    return {
        type: CREATE_EMPLOYEE_ERROR,
        data: json
    };
}

export function createEmployee(employee) {
    return function (dispatch) {
        dispatch(createEmployeeStart());
        return axios({
            url: 'http://localhost:3000/api/user/' + employee._id,
            timeout: 20000,
            method: 'post',
            data: {user: employee},
            responseType: 'json'
        }).then(function (response) {
            dispatch(createEmployeeSuccess(response.data.users));
        }).catch(function (response) {
            dispatch(createEmployeeError(response.data));
        });
    };
}
