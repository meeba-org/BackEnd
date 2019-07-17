import FeaturesManager, {Feature} from "../managers/FeaturesManager";

export const getUser = (state) => {
    return (!state.user) ? null : state.user;
};

export const getCompany = (state) => {
    let user = getUser(state);
    return (!user) ? null : user.company;
};

export const getCompanyName = (state) => {
    let company = getCompany(state);
    return (!company) ? null : company.name;
};

export const getUserRole = (state) => {
    return (!state.user) ? null : state.user.role;
};

const getGeneral = state => state.general;

export const getMeta = (state) => {
    return (!state.general.meta) ? null : state.general.meta;
};

export const isDesktop = (state) => {
    return state.general.isDesktop;
};

export const hasPremium = (state) => {
    return isFeatureEnable(state, Feature.Premium);
};

export const isDevEnv = (state) => {
    return getGeneral(state).isDevEnv;
};

export const getBlueSnapBaseUrl = state => {
    return isDevEnv(state) ? "https://sandbox.bluesnap.com" : "https://ws.bluesnap.com";
};

export const getPaymentToken = state => getGeneral(state).paymentToken;

export const isFeatureEnable = (state, feature) => {
    let company = getCompany(state);
    return (!company) ? false : FeaturesManager.isFeatureEnable(company, feature);
};

export const getCompanySettings = (state) => {
    return getCompany(state).settings;
};

export const isCommuteFeatureEnable = (state) => {
    return isFeatureEnable(state, Feature.CommuteModule) && getCompanySettings(state).enableCommute;
};

export const isTasksFeatureEnable = (state) => {
    return isFeatureEnable(state, Feature.Tasks) && getCompanySettings(state).enableTasks;
};
