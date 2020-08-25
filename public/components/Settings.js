import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, {useState} from 'react';
import {connect} from "react-redux";
import * as selectors from "../selectors";
import TasksContainer from "./tasks/TasksContainer";
import UserContainer from "./user/UserContainer";

const Settings = ({isTasksFeatureEnable}) => {
    const [selectedTab, setSelectedTab] = useState(0);
    
    const handleChange = (event, value) => setSelectedTab(value);
    
    return (
        <>
            <Tabs value={selectedTab} onChange={handleChange}>
                <Tab label="כללי" />
                {isTasksFeatureEnable &&
                <Tab label="משימות" />
                }
            </Tabs>
            {selectedTab === 0 && <UserContainer/>}
            {selectedTab === 1 && <TasksContainer/>}
        </>
    );
};

const mapStateToProps = (state) => ({
    isTasksFeatureEnable: selectors.isTasksFeatureEnable(state),
});

export default connect(mapStateToProps)(Settings);
