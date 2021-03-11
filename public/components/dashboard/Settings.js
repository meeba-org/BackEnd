import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {fetchTasks} from "../../actions";
import * as selectors from "../../selectors";
import TasksContainer from "../tasks/TasksContainer";
import UserContainer from "../user/UserContainer";

const Settings = ({isTasksFeatureEnable, fetchTasks}) => {
    const [selectedTab, setSelectedTab] = useState(0);
    
    const handleChange = (event, value) => setSelectedTab(value);

    useEffect(() => {
        fetchTasks();
    }, []);

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

const mapDispatchToProps = {
    fetchTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
