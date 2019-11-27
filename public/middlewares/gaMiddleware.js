import moment from "moment";
import {parseJson} from "../helpers/utils";

const UNKNOWN_USER = "UNKNOWN_USER";

const gaMiddleware = () => next => action => {
    if (!action.ga) {
        return next(action);
    }

    // We want to track only production
    if (localStorage.getItem('isDevEnv') === "true")
        return next(action);

    let activeUser = localStorage.getItem('activeUser');

    let company = extractCompanyFromJson(activeUser);
    let user = action.ga.user || extractUserFromJson(activeUser);

    let gaCategory = action.ga.category;
    let gaAction = action.ga.action;
    let gaLabel = createLabel(action.ga, company, user);

    // Call Google Analytics
    window.ga('send', 'event', gaCategory, gaAction, gaLabel, {
        'dimension1': company.name,
        'dimension2': user.fullName
    });

    return next(action);
};

const extractCompanyFromJson = (activeUserStr) => {
    let activeUser = parseJson(activeUserStr);

    return extractCompany(activeUser);
};

const extractUserFromJson = (activeUserStr) => {
    let activeUser = parseJson(activeUserStr);

    return extractUser(activeUser);
};

const createLabel = (ga, company, user) => {
    let time = moment().format("DD-MM-YYYY HH:mm");
    let extraInfo = `${time} | companyId: ${company._id} | userId: ${user._id}`;

    if (ga.label)
        extraInfo += " | " + ga.label;
    return extraInfo;
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

export default gaMiddleware;
