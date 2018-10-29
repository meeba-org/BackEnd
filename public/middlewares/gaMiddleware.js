const UNKNOWN_USER = "UNKNOWN_USER";

const gaMiddleware = ({dispatch}) => next => action => {
    if (!action.ga) {
        return next(action);
    }

    // We want to track only production
    if (localStorage.getItem('isDevEnv') === "true")
        return next(action);

    let activeUser = localStorage.getItem('activeUser');

    let gaCategory = action.ga.category || extractCompanyFromJson(activeUser);
    let gaAction = action.ga.action || extractUserFromJson(activeUser);
    let gaLabel = extractAction(action.ga.actionType, action.ga.actionInfo);

    // Call Google Analytics
    window.ga('send', 'event', gaCategory, gaAction, gaLabel);

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

export const extractUser = (activeUser) => {
    if (!activeUser || !activeUser._id)
        return UNKNOWN_USER;

    let user = activeUser._id;

    if (activeUser.fullName)
        user += "_" + activeUser.fullName;

    return user;
};

export const extractCompany = (activeUser) => {
    if (!activeUser || !activeUser.company || !activeUser.company._id)
        return UNKNOWN_USER;

    let company = activeUser.company._id;

    if (activeUser.company.name)
        company += "_" + activeUser.company.name;

    return company;
};

const extractAction = (actionType, actionInfo) => {
    let action = actionType;

    if (actionInfo)
        action += "_" + actionInfo;

    return action;
};

export default gaMiddleware;
