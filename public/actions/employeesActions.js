// import * as actionsTypes from "./actionTypes";
// import callApi from "./api";
// import {arrayPop, arrayPush} from 'redux-form';
//
// function createEmployeeStart() {
//     return {type: actionsTypes.HANDLE_LOGIN_START};
// }
//
// function createEmployeeSuccess() {
//     return {
//         type: actionsTypes.CREATE_EMPLOYEE_SUCCESS,
//     };
// }
//
// function createEmployeeError(json) {
//     return {
//         type: actionsTypes.HANDLE_LOGIN_ERROR,
//         data: json
//     };
// }
//
// function dispatchUpdateNewEmployeesInForm(dispatch, newEmployee) {
//     dispatch(arrayPop('employeesForm', 'employees'));
//     dispatch(arrayPush('employeesForm', 'employees', newEmployee));
// }
//
// export function createEmployee(employee) {
//     return function (dispatch) {
//         dispatch(createEmployeeStart());
//         return callApi({
//             method: 'post',
//             url: '/users',
//             data: employee,
//             shouldAuthenticate: true
//         }).then(function (response) {
//             dispatchUpdateNewEmployeesInForm(dispatch, response.user);
//         }).catch(function (response) {
//             dispatch(createEmployeeError(response.data));
//         });
//     };
// }
