import {EModalType} from "../components/modals/EModalType";
import {ESplashScreenType, hasSeenSplashScreen, setSeenSplashScreen} from "../helpers/SplashScreenHelper";
import * as actions from "./actionTypes";
import {showModal} from "./index";
import {loadUserFromToken} from "./loginLogoutActions";
import {fetchPendingShifts} from "./shiftsActions";

export const fetchMetaDataSuccess = (payload) => {
    localStorage.setItem('isDevEnv', payload.isDevEnv);

    return {
        type: actions.FETCH_META_DATA_SUCCESS,
        payload
    };
};

export const fetchMetaData = () => ({
    type: actions.API,
    payload: {
        url: "/general/meta",
        method: "get",
        success: fetchMetaDataSuccess,
    },
});

export const displaySplashScreen = () => dispatch => {
    let splashScreenType = ESplashScreenType.NEW_FEATURE_ABSENCE_DAYS;
    let hasSeen = hasSeenSplashScreen(splashScreenType);

    if (hasSeen)
        return false;

    dispatch(showModal(EModalType.NEW_FEATURE_ABSENCE_DAYS));
    setSeenSplashScreen(splashScreenType);
};

export const loadDashboardData = () =>  dispatch => {
    dispatch(loadUserFromToken());
    dispatch(fetchPendingShifts());
    // dispatch(displaySplashScreen());
};

