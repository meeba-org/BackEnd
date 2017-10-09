import React from "react";
import {IndexRoute, Route} from "react-router";
import AppContainer from "./components/AppContainer";
import Status from "./components/Status";
import EmployeesContainer from "./components/employees/EmployeesContainer";
import LoginContainer from "./components/login/LoginContainer";
import Dashboard from "./components/Dashboard";
import MonthlyReportContainer from "./components/reports/MonthlyReportContainer";
import DailyReportContainer from "./components/reports/DailyReportContainer";

export default (
    <Route path="/" component={AppContainer}>
        <IndexRoute component={Dashboard} onEnter={requireAuth} />
        <Route path="/login" component={LoginContainer}/>
        <Route path="/dashboard" component={Dashboard} onEnter={requireAuth}>
            <IndexRoute component={EmployeesContainer} />
            <Route path="status" component={Status} />
            <Route path="employees" component={EmployeesContainer} />
            <Route path="report" >
                <IndexRoute component={MonthlyReportContainer} />
                <Route path="month" component={MonthlyReportContainer} />
                <Route path="daily" component={DailyReportContainer} />
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
