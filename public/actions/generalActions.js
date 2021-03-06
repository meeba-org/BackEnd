import {EModalType} from "../components/modals/EModalType";
import {ESplashScreenType, hasSeenSplashScreen, setSeenSplashScreen} from "../helpers/SplashScreenHelper";
import * as actions from "./actionTypes";
import {showModal} from "./index";
import {authenticate} from "./loginLogoutActions";
import {fetchPendingShifts} from "./shiftsActions";

export const fetchMetaDataSuccess = (payload) => {
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
    let splashScreenType = ESplashScreenType.NEW_FEATURE_WORKPLACES;
    let hasSeen = hasSeenSplashScreen(splashScreenType);

    if (hasSeen)
        return false;

    dispatch(showModal(EModalType.NEW_FEATURE_WORKPLACES));
    setSeenSplashScreen(splashScreenType);
};

export const loadDashboardData = (onFinishLoading, user) =>  dispatch => {
    if (!user)
        dispatch(authenticate(onFinishLoading, onFinishLoading));
    else
        onFinishLoading();
    dispatch(fetchPendingShifts());
    dispatch(displaySplashScreen());
};

