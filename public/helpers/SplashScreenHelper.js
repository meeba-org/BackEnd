import {parseJson} from "./utils";

export const ESplashScreenType = {
    SURVEY_2019: "SURVEY_2019",
    NEW_FEATURE_ABSENCE_DAYS: "NEW_FEATURE_ABSENCE_DAYS"
};

export const hasSeenSplashScreen = (splashScreenType) => {
    let SplashScreensJson = localStorage.getItem('SplashScreens');
    let SplashScreens = parseJson(SplashScreensJson);

    return SplashScreens?.[splashScreenType]?.hasSeen;
};

export const setSeenSplashScreen = (splashScreenType) => {
    let SplashScreensJson = localStorage.getItem('SplashScreens');
    let SplashScreens = parseJson(SplashScreensJson);

    if (!SplashScreens)
        SplashScreens = {};

    if (!SplashScreens[splashScreenType])
        SplashScreens[splashScreenType] = {};

    SplashScreens[splashScreenType].hasSeen = true;

    localStorage.setItem('SplashScreens', JSON.stringify(SplashScreens));
};
