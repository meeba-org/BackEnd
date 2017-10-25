import React from "react";
import {IndexRoute, Route} from "react-router";
import AppContainer from "./components/AppContainer";
import EmployeesContainer from "./components/employees/EmployeesContainer";
import LoginContainer from "./components/login/LoginContainer";
import Dashboard from "./components/Dashboard";
import MonthlyReportContainer from "./components/reports/MonthlyReportContainer";
import DailyReportContainer from "./components/reports/DailyReportContainer";
import {ReportModes} from "./helpers/utils";

export default (
    <Route path="/" component={AppContainer}>
        <IndexRoute component={Dashboard} onEnter={requireAuth} />
        <Route path="/login" component={LoginContainer}/>
        <Route path="/dashboard" component={Dashboard} onEnter={requireAuth}>
            <IndexRoute component={EmployeesContainer} />
            <Route path="employees" component={EmployeesContainer} />
            <Route path="report" >
                <IndexRoute component={MonthlyReportContainer} />
                <Route path="monthly" component={MonthlyReportContainer} />
                <Route path="daily" component={DailyReportContainer} mode={ReportModes.Report}/>
                <Route path="live" component={DailyReportContainer} mode={ReportModes.Live}/>
            </Route>
        </Route>
    </Route>
);

function requireAuth(nextState, replace) {
    let token = localStorage.getItem('jwtToken');
    if (!token || token === '') {
        replace({
            pathname: '/login',
            state: {nextPathname: nextState.location.pathname}
        });
    }
}
