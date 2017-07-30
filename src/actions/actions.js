import * as types from './actionTypes';
import axios from 'axios';


function requestData() {
    return {type: types.REQ_DATA};
}

function receiveData(json) {
    return{
        type: types.RECV_DATA,
        data: json
    };
}

function receiveError(json) {
    return {
        type: types.RECV_ERROR,
        data: json
    };
}

export function fetchEmployees() {
    return function(dispatch) {
        dispatch(requestData());
        return axios({
            url: 'http://localhost:3000/api/users',
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        })
            .then(function(response) {
                dispatch(receiveData(response.data));
            })
            .catch(function(response){
                dispatch(receiveError(response.data));
            });
    };
}
