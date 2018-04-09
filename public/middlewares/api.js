import * as actionTypes from "../actions/actionTypes";
import config from "../config";
import axios from "axios";
import {ErrorAction, HideLoading, ShowLoading} from "../actions/index";

const api = ({dispatch}) => next => action => {
    if (action.type !== actionTypes.API) {
        return next(action);
    }

    let headers = {};
    if (action.meta && action.meta.shouldAuthenticate) {
        let token = localStorage.getItem('jwtToken');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    let {url, success, method, data, responseType} = action.payload;

    url = `${config.API_URL}${url}`;

    dispatch(ShowLoading());
    axios({
        url,
        timeout: 20000,
        method,
        data,
        headers,
        responseType,
    }).then(response => {
        dispatch(HideLoading());
        return dispatch(success(response.data));
    })
    .catch((err) => {
        dispatch(HideLoading());
        return dispatch(ErrorAction(err));
    });

    return next(action);
};

export default api;
