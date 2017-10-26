import axios from 'axios';
import config from "../config";

export default function callApi(apiConfig) {

    if (apiConfig.shouldAuthenticate) {
        let token = localStorage.getItem('jwtToken');
        if (!token || token === '') {//if there is no token, dont bother
            return Promise.reject("[api] - token not available for authenticate api call");
        }

        apiConfig.headers = {
            'Authorization': `Bearer ${token}`
        };
    }

    apiConfig.url = `${config.API_URL}${apiConfig.url}`;

    return axios(apiConfig)
        .then(response => response.data);
}
