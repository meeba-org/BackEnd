import {EModalType} from "../components/modals/EModalType";
import * as actions from "./actionTypes";
import {showModal} from "./index";
import {authenticate} from "./loginLogoutActions";
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
    // let splashScreenType = ESplashScreenType.COVID19_DISCOUNT;
    // let hasSeen = hasSeenSplashScreen(splashScreenType);
    //
    // if (hasSeen)
    //     return false;

    dispatch(showModal(EModalType.WORKPLACE_SELECTION));
    // setSeenSplashScreen(splashScreenType);
};

export const loadDashboardData = (onFinishLoading, user) =>  dispatch => {
    if (!user)
        dispatch(authenticate(onFinishLoading, onFinishLoading));
    else
        onFinishLoading();
    dispatch(fetchPendingShifts());
    dispatch(displaySplashScreen());
};

