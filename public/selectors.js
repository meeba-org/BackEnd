import FeaturesManager, {Feature} from "../managers/FeaturesManager";
import * as EPlanType from "../models/EPlanType";
import {COMPANY_MANAGER} from "../models/ERoles";

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
    return getUser(state)?.role ?? COMPANY_MANAGER;
};

export const getMeta = (state) => {
    return (!state.general.meta) ? null : state.general.meta;
};

export const isDesktop = (state) => {
    return state.general.isDesktop ?? true;
};

export const hasPremiumFeature = (state) => {
    return isFeatureEnable(state, Feature.Premium);
};

const getPayment = state => state.payment;

export const getPaymentUrl = state => getPayment(state).paymentUrl;

export const getPaymentError = state => getPayment(state).error;

export const getPaymentActiveStep = state => getPayment(state).activeStep;

export const isFeatureEnable = (state, feature) => {
    let company = getCompany(state);
    return (!company) ? false : FeaturesManager.isFeatureEnable(company, feature);
};

export const getCompanySettings = (state) => {
    return getCompany(state)?.settings;
};

export const getCompanyDefaultExportFormat = (state) => {
    return getCompanySettings(state)?.defaultExportFormat;
};

export const isCommuteFeatureEnable = (state) => {
    return isFeatureEnable(state, Feature.CommuteModule) && getCompanySettings(state)?.enableCommute;
};

export const isTasksFeatureEnable = (state) => {
    const companySettings = getCompanySettings(state);
    if (!companySettings)
        return false;

    return companySettings.enableTasks || companySettings.enableAbsenceDays;
};

export const isInnovativeAuthorityEnable = (state) => {
    const companySettings = getCompanySettings(state);
    if (!companySettings)
        return false;

    return companySettings.enableInnovativeAuthority;
};

export const isTasksEnable = (state) => {
    const companySettings = getCompanySettings(state);
    if (!companySettings)
        return false;

    return companySettings.enableTasks;
};

export const getPlan = state => {
    let company = getCompany(state);
    if (!company)
        return EPlanType.Free;
    return company.plan || EPlanType.Free;
};

export const hasPremiumPlan = state => getPlan(state) === EPlanType.Premium;

export const getDailyShifts = state => state.shifts.daily;

export const getPendingShifts = state => state.shifts.pending;

export const getEmployeesMonthlyReports = state => state.reports.employeesMonthlyReports;

export const getStartOfMonth = state => getCompanySettings(state)?.startOfMonth;

export const getTasks = state => state.tasks;

export const getDefaultClockInTime = state => getCompanySettings(state)?.defaultClockInTime;

export const getDefaultClockOutTime = state => getCompanySettings(state)?.defaultClockOutTime;
