import * as actions from "./actionTypes";

export const fetchUserSuccess = (payload) => ({
    type: actions.FETCH_USER_SUCCESS,
    payload
});

export const fetchUser = (userId) => ({
    type: actions.API,
    payload: {
        url: "/users/" + userId,
        method: "get",
        success: fetchUserSuccess,
        shouldAuthenticate: true,
    }
});

export const updateUser = (user) => ({
    type: actions.API,
    payload: {
        url: "/users/" + user._id,
        method: "put",
        data: user,
        success: fetchUserSuccess,
        shouldAuthenticate: true,
    }
});

