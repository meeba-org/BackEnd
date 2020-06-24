import Paper from "@material-ui/core/Paper";
import React, {useState} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {ReportModes} from "../../helpers/utils";
import AppBar from "../AppBar";
import EmployeesContainer from "../employees/EmployeesContainer";
import ExportContainer from "../export/ExportContainer";
import Fade from "../Fade";
import MbSnackbar from "../MbSnackbar";
import DailyReportContainer from "../reports/DailyReportContainer";
import Report from "../reports/Report";
import Settings from "../Settings";
import SideBarContainer from "../SideBarContainer";
import "../../styles/Dashboard.scss";

const Dashboard = ({userRole, isDesktop, path, hasPremium, isLoading}) => { 
    const [open, setOpen] = useState(isDesktop);
    const toggleOpen = () => setOpen(!open);
    
    return (
        <Fade styleName="dashboard">
            <div styleName="dashboard-container">
                <div styleName="appBar-container">
                    <AppBar onLogoClick={toggleOpen} isDesktop={!!isDesktop} isLoading={isLoading}/>
                </div>
                <div styleName="grid-container">
                    <Paper styleName={"sideBar-container" + (isDesktop ? " isDesktop" : "")}>
                        <SideBarContainer
                            userRole={userRole}
                            isDesktop={!!isDesktop}
                            open={open}
                            toggleSideBar={toggleOpen}
                        />
                    </Paper>
                    <Paper styleName="main-container">
                        <Switch>
                            <Route path={`${path}/live`} component={() => <DailyReportContainer mode={ReportModes.Live}/>}/>
                            <Route path={`${path}/report`} component={Report}/>
                            <Route path={`${path}/employees`} component={EmployeesContainer}/>
                            <Route path={`${path}/export`} component={ExportContainer}/>
                            <Route path={`${path}/settings`} component={Settings}/>
                            <Redirect from="*" to="/dashboard/live"/>
                        </Switch>
                    </Paper>
                </div>
                {!isLoading && !hasPremium && <MbSnackbar /> }
            </div>
        </Fade>
    );
};

export default Dashboard;
