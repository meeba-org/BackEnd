import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import {ReportModes} from "../../helpers/utils";
import * as selectors from "../../selectors";
import DailyReportContainer from "./DailyReportContainer";
import MonthlyReportContainer from "./MonthlyReportContainer";
import TasksReportContainer from "./TasksReportContainer";

const EReportType = {
    MONTHLY: 0,
    DAILY: 1,
    TASKS: 2,
};
class Report extends Component {
    state = {
        selectedTab: EReportType.MONTHLY
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
                    <Tab label="חודשי" />
                    <Tab label="יומי" />
                    {isTasksFeatureEnable &&
                    <Tab label="משימות" />
                    }
                </Tabs>
                {selectedTab === 0 && <MonthlyReportContainer/>}
                {selectedTab === 1 && <DailyReportContainer mode={ReportModes.Report} />}
                {selectedTab === 2 && <TasksReportContainer />}
            </Fragment>
        );
    }
}

Report.propTypes = {};
Report.defaultProps = {};

const mapStateToProps = (state) => {
    return {
        isTasksFeatureEnable: selectors.isTasksFeatureEnable(state),
    };
};

export default connect(mapStateToProps)(Report);
