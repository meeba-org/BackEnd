import axios from 'axios';
import {RECEIVE_EMPLOYEES_ERROR, RECEIVE_EMPLOYEES_SUCCESS, REQ_DATA} from "./actionTypes";


function requestData() {
    return {type: REQ_DATA};
}

function receiveEmployees(json) {
    return {
        type: RECEIVE_EMPLOYEES_SUCCESS,
        employees: json
    };
}

function receiveError(json) {
    return {
        type: RECEIVE_EMPLOYEES_ERROR,
        data: json
    };
}

export function fetchEmployees() {
    return function (dispatch) {
        dispatch(requestData());
        return axios({
            url: 'http://localhost:3000/api/users',
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            dispatch(receiveEmployees(response.data.users));
        }).catch(function (response) {
            dispatch(receiveError(response.data));
        });
    };
}
