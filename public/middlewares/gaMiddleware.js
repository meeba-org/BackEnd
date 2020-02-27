import {sendGaEvent} from "../helpers/GAService";

const UNKNOWN_USER = "UNKNOWN_USER";

const gaMiddleware = () => next => action => {
    if (!action.ga) {
        return next(action);
    }

    // We want to track only production
    if (localStorage.getItem('isDevEnv') === "true")
        return next(action);

    sendGaEvent(action.ga);

    return next(action);
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
