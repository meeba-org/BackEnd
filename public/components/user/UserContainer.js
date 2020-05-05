import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Feature} from "../../../managers/FeaturesManager";
import {showCancelPremiumModal, showGoPremiumModal, updateActiveUser, updateCompany} from "../../actions";
import {getUser, hasPremiumFeature, isFeatureEnable} from "../../selectors";
import User from "./User";

const UserContainer = () => {
    const userFromState = useSelector(getUser);
    const isCommuteFeatureEnable = useSelector(state => isFeatureEnable(state, Feature.CommuteModule));
    const hasPremiumFeat = useSelector(hasPremiumFeature);
    const dispatch = useDispatch();

    const [user, setUser] = useState(userFromState);

    useEffect(() => {
        setUser(userFromState);
    }, [userFromState]);

    const handleUserChange = (key, value) => {
        let newUser = {
            ...user,
            [key]: value
        };

        setUser(newUser);
        dispatch(updateActiveUser(newUser));
    };

    const handleCompanyChange = (key, value) => {
        const company = {
            ...user.company,
            [key]: value
        };

        let newUser = {
            ...user,
            company
        };

        setUser(newUser);
        dispatch(updateCompany(company));
    };

    const handleCompanySettingsChange = (key, value) => {
        const settings = {
            ...user.company.settings,
            [key]: value
        };

        handleCompanyChange("settings", settings);
    };


    return (
        <User
            user={user}
            onUserChange={handleUserChange}
            onCompanyChange={handleCompanyChange}
            isCommuteFeatureEnable={isCommuteFeatureEnable}
            hasPremiumFeature={hasPremiumFeat}
            onFreePlanClick={() => dispatch(showGoPremiumModal())}
            onPremiumPlanClick={() => dispatch(showCancelPremiumModal(user.company))}
            onCompanySettingsChange={handleCompanySettingsChange}
        />
    );
};

export default UserContainer;

