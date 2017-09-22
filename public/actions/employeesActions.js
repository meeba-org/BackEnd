import * as actionsTypes from "./actionTypes";
import callApi from "./api";
import {arrayPop, arrayPush} from 'redux-form';

function requestEmployees() {
    return {type: actionsTypes.REQUEST_EMPLOYEES};
}

function receiveEmployeesSuccess(json) {
    return {
        type: actionsTypes.RECEIVE_EMPLOYEES_SUCCESS,
        employees: json
    };
}

function receiveEmployeesError() {
    return {
        type: actionsTypes.RECEIVE_EMPLOYEES_ERROR,
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
    return {type: actionsTypes.DELETE_EMPLOYEE_START};
}

function deleteEmployeeSuccess() {
    return {
        type: actionsTypes.DELETE_EMPLOYEE_SUCCESS,
    };
}

function deleteEmployeeError(json) {
    return {
        type: actionsTypes.DELETE_EMPLOYEE_ERROR,
        data: json
    };
}

export function deleteEmployee(employee) {
    return function (dispatch) {
        dispatch(deleteEmployeeStart());
        return callApi({
            url: '/users/' + employee._id,
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
    return {type: actionsTypes.UPDATE_EMPLOYEE_START};
}

function updateEmployeeSuccess(json) {
    return {
        type: actionsTypes.UPDATE_EMPLOYEE_SUCCESS,
        employees: json
    };
}

function updateEmployeeError(json) {
    return {
        type: actionsTypes.UPDATE_EMPLOYEE_ERROR,
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
    return {type: actionsTypes.CREATE_EMPLOYEE_START};
}

function createEmployeeSuccess() {
    return {
        type: actionsTypes.CREATE_EMPLOYEE_SUCCESS,
    };
}

function createEmployeeError(json) {
    return {
        type: actionsTypes.CREATE_EMPLOYEE_ERROR,
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
