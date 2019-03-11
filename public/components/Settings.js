import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import * as selectors from "../selectors";
import TasksContainer from "./tasks/TasksContainer";
import UserContainer from "./user/UserContainer";

class Settings extends Component {
    state = {
        selectedTab: 0
    };

    handleChange = (event, value) => {
        this.setState({ selectedTab: value });
    };

    render() {
        const {selectedTab} = this.state;
        const {isTasksFeatureEnable} = this.props;

        return (
            <Fragment>
                <Tabs value={selectedTab} onChange={this.handleChange}>
                    <Tab label="כללי" />
                    {isTasksFeatureEnable &&
                        <Tab label="משימות" />
                    }
                </Tabs>
                {selectedTab === 0 && <UserContainer/>}
                {selectedTab === 1 && <TasksContainer/>}
            </Fragment>
        );
    }
}

Settings.propTypes = {};
Settings.defaultProps = {};

const mapStateToProps = (state) => {
    return {
        isTasksFeatureEnable: selectors.isTasksFeatureEnable(state),
    };
};

export default connect(mapStateToProps)(Settings);
