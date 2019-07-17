import * as actions from "./actionTypes";

export const fetchMetaDataSuccess = (payload) => {
    localStorage.setItem('isDevEnv', payload.isDevEnv);

    return {
        type: actions.FETCH_META_DATA_SUCCESS,
        payload
    };
};

export const fetchMetaData = () => ({
    type: actions.API,
    payload: {
        url: "/general/meta",
        method: "get",
        success: fetchMetaDataSuccess,
    },
});


