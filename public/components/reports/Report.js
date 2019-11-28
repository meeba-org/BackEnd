import Badge from "@material-ui/core/es/Badge";
import {withStyles} from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {ReportModes} from "../../helpers/utils";
import {getPendingShifts, isTasksFeatureEnable} from "../../selectors";
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

const styles = () => ({
    padding: {
        paddingRight: "10px",
    },
});

class Report extends Component {
    state = {
        selectedTab: EReportType.MONTHLY
    };

    handleChange = (event, value) => {
        this.setState({ selectedTab: value });
    };

    render() {
        const {selectedTab} = this.state;
        const {isTasksFeatureEnable, classes, hasPendingShifts} = this.props;

        return (
            <Fragment>
                <Tabs value={selectedTab} onChange={this.handleChange}>
                    <Tab value={EReportType.MONTHLY} label="חודשי" />
                    <Tab value={EReportType.DAILY} label="יומי" />
                    {isTasksFeatureEnable &&
                    <Tab value={EReportType.TASKS} label="משימות" />
                    }
                    <Tab
                        value={EReportType.PENDING}
                        label={
                            <Badge className={classes.padding} color="secondary" variant="dot" invisible={!hasPendingShifts}>ממתינות לאישור</Badge>
                        }
                    />
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
        isTasksFeatureEnable: isTasksFeatureEnable(state),
        hasPendingShifts: getPendingShifts(state).length > 0
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Report));
