import React from "react";
import {IndexRedirect, Route} from "react-router";
import AppContainer from "./components/AppContainer";
import Dashboard from "./components/Dashboard";
import EmployeesContainer from "./components/employees/EmployeesContainer";
import FAQContainer from "./components/faq/FAQContainer";
import Home from "./components/home/Home";
import LoginContainer from "./components/login/LoginContainer";
import DailyReportContainer from "./components/reports/DailyReportContainer";
import MonthlyReportContainer from "./components/reports/MonthlyReportContainer";
import TasksReportContainer from "./components/reports/TasksReportContainer";
import Settings from "./components/Settings";
import {ReportModes} from "./helpers/utils";

export default (
    <Route path="/" component={AppContainer}>
        <IndexRedirect to="/dashboard" />
        <Route path="/home" component={Home}/>
        <Route path="/login" component={LoginContainer}/>
        <Route path="/dashboard" component={Dashboard} onEnter={requireAuth}>
            <IndexRedirect to="/dashboard/report" />
            <Route path="employees" component={EmployeesContainer} />
            <Route path="settings" component={Settings} />
            <Route path="report"  >
                <IndexRedirect to="/dashboard/report/live" />
                <Route path="monthly" component={MonthlyReportContainer}  />
                <Route path="daily" component={DailyReportContainer} mode={ReportModes.Report} />
                <Route path="tasks" component={TasksReportContainer} />
                <Route path="live" component={DailyReportContainer} mode={ReportModes.Live} />
            </Route>
        </Route>
        <Route path="faq(/:name)" component={FAQContainer} />
    </Route>
);

function requireAuth(nextState, replace) {
    let token = localStorage.getItem('jwtToken');
    if (!token || token === '') {
        replace({
            pathname: '/home',
            state: {nextPathname: nextState.location.pathname}
        });
    }
}
