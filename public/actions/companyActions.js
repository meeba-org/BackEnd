import {API, UPDATE_COMPANY_SUCCESS} from "./actionTypes";

export const updateCompanySuccess = (payload) => ({
    type: UPDATE_COMPANY_SUCCESS,
    payload
});

export const updateCompany = (company) => ({
    type: API,
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

