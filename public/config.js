
const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000' : '';
const API_URL = `${ROOT_URL}/api`;

export default {
    ROOT_URL,
    API_URL
};
