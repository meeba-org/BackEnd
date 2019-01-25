
const port = process.env.PORT || 5000;
const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:' + port : '';
const API_URL = `${ROOT_URL}/api`;

export default {
    ROOT_URL,
    API_URL
};
