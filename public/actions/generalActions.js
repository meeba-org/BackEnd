import * as actions from "./actionTypes";

export const fetchMetaDataSuccess = (payload) => ({
    type: actions.FETCH_META_DATA_SUCCESS,
    payload
});

export const fetchUsersMetaData = () => ({
    type: actions.API,
    payload: {
        url: "/general/meta",
        method: "get",
        success: fetchMetaDataSuccess,
    },
});
