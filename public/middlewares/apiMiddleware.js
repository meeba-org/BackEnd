import {clearUser,HideLoading, ShowLoading} from "../actions";
import * as actionTypes from "../actions/actionTypes";
import config from "../config";
import axios from "axios";

import history from "../helpers/historyService";

const apiMiddleware = ({dispatch}) => next => action => {

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

    let {url, success, onError, method, data, responseType} = action.payload;

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
        const successAction = success(response.data);
        return successAction ? dispatch(successAction) : null;
    })
    .catch((err) => {
        dispatch(HideLoading());
        const {response: {data, status}} = err;

        // eslint-disable-next-line no-console
        console.error(data?.message);
        if (onError)
            return dispatch(onError(data));
        else {
            switch (status) {
                case 403:
                    dispatch(clearUser(err));
                    history.push("/home");
            }
        }
    });

    return next(action);
};

export default apiMiddleware;
