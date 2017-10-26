import * as actions from "../actions/actionTypes";
import callApi from "../actions/api";

const api = ({dispatch}) => next => action => {
	if (action.type !== actions.API) {
		return next(action);
	}

	let {url, success, method} = action.payload;

    callApi({
        url: url,
        timeout: 20000,
        method: method,
        shouldAuthenticate: true,
    }).then(response => response.json())
        .then(data => dispatch(success(data)))
        .catch(response => dispatch(actions.ErrorAction(response.data)));

	return next(action);
};

export default api;
