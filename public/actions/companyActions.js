import * as actions from "./actionTypes";

export const fetchCompanySuccess = (payload) => ({
    type: actions.FETCH_COMPANY_SUCCESS,
    payload
});

export const fetchCompany = (companyId) => ({
    type: actions.API,
    payload: {
        url: "/companies/" + companyId,
        method: "get",
        success: fetchCompanySuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const updateCompany = (company) => ({
    type: actions.API,
    payload: {
        url: "/companies",
        method: "put",
        data: company,
        success: fetchCompanySuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});
