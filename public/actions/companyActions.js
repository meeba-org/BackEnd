import * as actions from "./actionTypes";

export const updateCompanySuccess = (payload) => ({
    type: actions.UPDATE_COMPANY_SUCCESS,
    payload
});

export const updateCompany = (company) => ({
    type: actions.API,
    payload: {
        url: "/companies",
        method: "put",
        data: company,
        success: updateCompanySuccess,
    },
    meta: {
        shouldAuthenticate: true,
        debounce: {
            time: 700
        }
    }
});

