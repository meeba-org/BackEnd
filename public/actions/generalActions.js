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
    let splashScreenType = ESplashScreenType.COVID19_DISCOUNT;
    let hasSeen = hasSeenSplashScreen(splashScreenType);

    // if (hasSeen)
    //     return false;

    dispatch(showModal(EModalType.COVID19_DISCOUNT));
    setSeenSplashScreen(splashScreenType);
};

export const loadDashboardData = (onFinishLoading) =>  dispatch => {
    dispatch(loadUserFromToken(onFinishLoading));
    dispatch(fetchPendingShifts());
    dispatch(displaySplashScreen());
};

