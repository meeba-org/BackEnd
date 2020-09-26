import moment from "moment";
import {extractCompany, extractUser} from "../middlewares/gaMiddleware";
import {parseJson} from "./utils";

export const GACategory = {
    LOGIN: "login",
    REGISTER: "register",
    DOWNLOAD_EXCEL: "download-excel",
    CLOCK_IN: "clock-in",
    CLOCK_OUT: "clock-out",
    USER_WENT_PREMIUM: "user-went-premium",
    PROMOTION_VIDEO_SELECTED: "promotion-video-selected",
};

export const sendGaEvent = ({category, action = "default", label = null, defaultUser = null}) => {
    // We want to track only production
    if (process.env.NODE_ENV !== "production")
        return;

    let activeUser = localStorage.getItem('activeUser');

    let company = extractCompanyFromJson(activeUser);
    let user = defaultUser || extractUserFromJson(activeUser);

    let gaCategory = category;
    let gaAction = action;
    let gaLabel = createLabel(label, company, user);

    // Call Google Analytics
    window.ga('send', 'event', gaCategory, gaAction, gaLabel, {
        'dimension1': company.name,
        'dimension2': user.fullName
    });
};

const extractCompanyFromJson = (activeUserStr) => {
    let activeUser = parseJson(activeUserStr);

    return extractCompany(activeUser);
};

const extractUserFromJson = (activeUserStr) => {
    let activeUser = parseJson(activeUserStr);

    return extractUser(activeUser);
};

const createLabel = (label, company, user) => {
    let time = moment().format("DD-MM-YYYY HH:mm");
    let extraInfo = `${time} | companyId: ${company._id} | userId: ${user._id}`;

    if (label)
        extraInfo += " | " + label;
    return extraInfo;
};
