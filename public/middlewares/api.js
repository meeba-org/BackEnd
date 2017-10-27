import * as actions from "../actions/actionTypes";
import callApi from "../actions/api";

const api = ({dispatch}) => next => action => {
    if (action.type !== actions.API) {
        return next(action);
    }

    let {url, success, method, data} = action.payload;

    callApi({
        url,
        timeout: 20000,
        method,
        data,
        shouldAuthenticate: true,
    }).then(data => dispatch(success(data)))
        .catch(() => dispatch(actions.ErrorAction));

    return next(action);
};

export default api;
