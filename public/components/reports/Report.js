import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import {ReportModes} from "../../helpers/utils";
import * as selectors from "../../selectors";
import DailyReportContainer from "./DailyReportContainer";
import MonthlyReportContainer from "./MonthlyReportContainer";
import PendingReportContainer from "./PendingReportContainer";
import TasksReportContainer from "./TasksReportContainer";

const EReportType = {
    MONTHLY: 0,
    DAILY: 1,
    TASKS: 2,
    PENDING: 3
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
                    <Tab value={EReportType.MONTHLY} label="חודשי" />
                    <Tab value={EReportType.DAILY} label="יומי" />
                    {isTasksFeatureEnable &&
                    <Tab value={EReportType.TASKS} label="משימות" />
                    }
                    <Tab value={EReportType.PENDING} label="ממתינות לאישור" />
                </Tabs>
                {selectedTab === EReportType.MONTHLY && <MonthlyReportContainer/>}
                {selectedTab === EReportType.DAILY && <DailyReportContainer mode={ReportModes.Report} />}
                {selectedTab === EReportType.TASKS && <TasksReportContainer />}
                {selectedTab === EReportType.PENDING && <PendingReportContainer />}
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
