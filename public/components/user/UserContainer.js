import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Feature} from "../../../managers/FeaturesManager";
import {showAddDefaultIATasksModal, showCancelPremiumModal, showGoPremiumModal, updateActiveUser, updateCompany} from "../../actions";
import {getTasks, getUser, hasPremiumFeature, isFeatureEnable} from "../../selectors";
import {DEFAULT_IA_TASK_TITLE, DEFAULT_NON_IA_TASK_TITLE} from "./constants";
import User from "./User";

const UserContainer = () => {
    const user = useSelector(getUser);
    const isCommuteFeatureEnable = useSelector(state => isFeatureEnable(state, Feature.CommuteModule));
    const hasPremiumFeat = useSelector(hasPremiumFeature);
    const tasks = useSelector(getTasks);
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

    // const handleEnablingInnovationAuthority = () => {
    //     // TODO enableTask is false... no tasks while IA is off - will think on it...
    //     // TODO Ok I'm thinking companies/enableIA should  do the switch on stuff and return a company (with the right settings) and tasks - both should be placed in store, 
    //     // then onSuccess we will determine with tasks if we should display modal suggesting to add defaults IA tasks 
    //    
    //     if (tasks) {
    //         const shouldAddDefaultIATask = !(tasks.find(t => t.title === DEFAULT_IA_TASK_TITLE));
    //         const shouldAddNoneIaTask = !(tasks.find(t => t.title === DEFAULT_NON_IA_TASK_TITLE));
    //        
    //         if (shouldAddNoneIaTask || shouldAddDefaultIATask)
    //             dispatch(showAddDefaultIATasksModal(tasks, user.company._id));
    //     }
    // };
    
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
            onInnovativeAuthorityChange={handleInnovativeAuthorityChange}
        />
    );
};

export default UserContainer;

