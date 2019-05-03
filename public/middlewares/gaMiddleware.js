import moment from "moment";

const UNKNOWN_USER = "UNKNOWN_USER";

const gaMiddleware = () => next => action => {
    if (!action.ga) {
        return next(action);
    }

    // We want to track only production
    // TODO Chen for debugging - uncomment this when done
    // if (localStorage.getItem('isDevEnv') === "true")
    //     return next(action);

    let activeUser = localStorage.getItem('activeUser');

    let company = extractCompanyFromJson(activeUser);
    let user = action.ga.user || extractUserFromJson(activeUser);

    let gaCategory = action.ga.actionType;
    let gaAction = action.ga.actionInfo;
    let gaLabel = createExtraInfo(action.ga, company, user);

    // Call Google Analytics
    window.ga('send', 'event', gaCategory, gaAction, gaLabel, {
        'dimension1': company.name,
        'dimension2': user.fullName
    });

    return next(action);
};

const parseJson = (json) => {
    if (!json)
        return null;

    return JSON.parse(json);

};

const extractCompanyFromJson = (activeUserStr) => {
    let activeUser = parseJson(activeUserStr);

    return extractCompany(activeUser);
};

const extractUserFromJson = (activeUserStr) => {
    let activeUser = parseJson(activeUserStr);

    return extractUser(activeUser);
};

const createExtraInfo = (ga, company, user) => {
    let time = moment().format("DD-MM-YYYY HH:mm");
    return `${time} | companyId: ${company._id} | userId: ${user._id}`;
};

export const extractUser = (activeUser) => {
    if (!activeUser || !activeUser._id)
        return {fullName: UNKNOWN_USER};

    return activeUser;
};

export const extractCompany = (activeUser) => {
    if (!activeUser || !activeUser.company || !activeUser.company._id)
        return UNKNOWN_USER;

    return activeUser.company;
};

const extractAction = (actionType, actionInfo) => {
    let action = actionType;

    if (actionInfo)
        action += "_" + actionInfo;

    return action;
};

export default gaMiddleware;
