import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Feature} from "../../../managers/FeaturesManager";
import {handleInnovativeAuthorityToggle, showCancelPremiumModal, showGoPremiumModal, updateActiveUser, updateCompany} from "../../actions";
import {getUser, hasPremiumFeature, isFeatureEnable} from "../../selectors";
import User from "./User";

const UserContainer = () => {
    const user = useSelector(getUser);
    const isCommuteFeatureEnable = useSelector(state => isFeatureEnable(state, Feature.CommuteModule));
    const hasPremiumFeat = useSelector(hasPremiumFeature);
    const dispatch = useDispatch();

    const [userState, setUserState] = useState(user);

    useEffect(() => {
        setUserState(user);
    }, [user]);

    const handleUserChange = (key, value) => {
        let newUserState = {
            ...userState,
            [key]: value
        };

        setUserState(newUserState);
        dispatch(updateActiveUser(newUserState));
    };

    const handleCompanyChange = (key, value) => {
        const company = {
            ...userState.company,
            [key]: value
        };

        let newUserState = {
            ...userState,
            company
        };

        setUserState(newUserState);
        dispatch(updateCompany(company));
    };

    const handleCompanySettingsChange = (key, value) => {
        const settings = {
            ...userState.company.settings,
            [key]: value
        };

        handleCompanyChange("settings", settings);
    };

    const onInnovativeAuthorityToggle = enable => {
        const settings = {
            ...userState.company.settings,
            "enableAbsenceDays": enable,
            "enableTasks": enable,
            "enableInnovativeAuthority": enable
        };
        
        const company = {
            ...userState.company,
            settings
        };

        let newUserState = {
            ...userState,
            company
        };

        setUserState(newUserState);
        dispatch(handleInnovativeAuthorityToggle(newUserState.company, enable));
    };
    
    return (
        <User
            user={userState}
            onUserChange={handleUserChange}
            onCompanyChange={handleCompanyChange}
            isCommuteFeatureEnable={isCommuteFeatureEnable}
            hasPremiumFeature={hasPremiumFeat}
            onFreePlanClick={() => dispatch(showGoPremiumModal())}
            onPremiumPlanClick={() => dispatch(showCancelPremiumModal(userState.company))}
            onCompanySettingsChange={handleCompanySettingsChange}
            handleInnovativeAuthorityToggle={onInnovativeAuthorityToggle}
        />
    );
};

export default UserContainer;

