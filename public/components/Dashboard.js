import Paper from "@material-ui/core/Paper";
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from "react-redux";
import {Redirect, Route, withRouter, Switch} from "react-router-dom";
import {loadDashboardData} from "../actions/generalActions";
import {ReportModes} from "../helpers/utils";
import * as selectors from "../selectors";
import "../styles/Dashboard.scss";
import AppBar from "./AppBar";
import EmployeesContainer from "./employees/EmployeesContainer";
import DailyReportContainer from "./reports/DailyReportContainer";
import Report from "./reports/Report";
import Settings from "./Settings";
import SideBarContainer from "./SideBarContainer";

class Dashboard extends React.PureComponent {

    state = {
        open: null,
    };

    componentDidMount() {
        this.props.loadDashboardData();
    }

    toggleDrawer = () => {
        this.setState({open: !this.state.open});
    };

    isOpen = () => {
        if (this.state.open === null)
            return !!this.props.isDesktop;

        return this.state.open;
    };

    render() {
        let {userRole, isDesktop, isTasksFeatureEnable, match: {path} } = this.props;
        let open = this.isOpen();

        return (
            <div styleName="dashboard">
                <div styleName="dashboard-container">
                    <div styleName="appBar-container">
                        <AppBar onLogoClick={this.toggleDrawer} isDesktop={!!isDesktop}/>
                    </div>
                    <div styleName="grid-container">
                        <Paper styleName={"sideBar-container" + (isDesktop ? " isDesktop" : "")}>
                            <SideBarContainer
                                userRole={userRole}
                                isDesktop={!!isDesktop}
                                open={open}
                                toggleSideBar={this.toggleDrawer}
                                isTasksFeatureEnable={isTasksFeatureEnable}
                            />
                        </Paper>
                        <Paper styleName="main-container">
                            <Switch>
                                <Route path={`${path}/employees`} component={EmployeesContainer}/>
                                <Route path={`${path}/settings`} component={Settings}/>
                                <Route path={`${path}/report`} component={Report}/>
                                <Route path={`${path}/live`} component={() => <DailyReportContainer mode={ReportModes.Live}/>}/>
                                <Redirect from="*" to="/dashboard/live"/>
                            </Switch>
                        </Paper>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    loadDashboardData: PropTypes.func.isRequired,
    userRole: PropTypes.string,
    isDesktop: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        userRole: selectors.getUserRole(state),
        isDesktop: selectors.isDesktop(state),
        isTasksFeatureEnable: selectors.isTasksFeatureEnable(state),
    };
};

const mapDispatchToProps = {
    loadDashboardData,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));

