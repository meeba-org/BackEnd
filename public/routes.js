import React from "react";
import {IndexRedirect, Route} from "react-router";
import AppContainer from "./components/AppContainer";
import EmployeesContainer from "./components/employees/EmployeesContainer";
import LoginContainer from "./components/login/LoginContainer";
import Dashboard from "./components/Dashboard";
import MonthlyReportContainer from "./components/reports/MonthlyReportContainer";
import DailyReportContainer from "./components/reports/DailyReportContainer";
import {ReportModes} from "./helpers/utils";
import UserContainer from "./components/user/UserContainer";
import Home from "./components/home/Home";
import FAQContainer from "./components/faq/FAQContainer";

export default (
    <Route path="/" component={AppContainer}>
        <IndexRedirect to="/dashboard" />
        <Route path="/home" component={Home}/>
        <Route path="/login" component={LoginContainer}/>
        <Route path="/dashboard" component={Dashboard} onEnter={requireAuth}>
            <IndexRedirect to="/dashboard/report" />
            <Route path="employees" component={EmployeesContainer} />
            <Route path="user" component={UserContainer} />
            <Route path="report"  >
                <IndexRedirect to="/dashboard/report/live" />
                <Route path="monthly" component={MonthlyReportContainer}  />
                <Route path="daily" component={DailyReportContainer} mode={ReportModes.Report} />
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
