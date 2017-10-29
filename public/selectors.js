export const getCompany = (state) => {
    return (!state.user) ? null : state.user.company;
};

export const getCompanyName = (state) => {
    let company = getCompany(state);
    return (!company) ? null : company.name;
};
