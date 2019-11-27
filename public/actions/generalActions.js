import {EModalType} from "../components/modals/EModalType";
import {ESplashScreenType, hasSeenSplashScreen, setSeenSplashScreen} from "../helpers/SplashScreenHelper";
import * as actions from "./actionTypes";
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
    let splashScreenType = ESplashScreenType.SURVEY_2019;
    let hasSeen = hasSeenSplashScreen(splashScreenType);

    if (hasSeen)
        return false;

    dispatch(show2019SurveyModal());
    setSeenSplashScreen(splashScreenType);
};

export const show2019SurveyModal = () => ({
    type: 'SHOW_MODAL',
    payload: {
        modalType: EModalType.SURVEY_2019,
        modalProps: {
            open: true,
        }
    }
});

export const loadDashboardData = () =>  dispatch => {
    dispatch(loadUserFromToken());
    dispatch(fetchPendingShifts());
    dispatch(displaySplashScreen());
};

