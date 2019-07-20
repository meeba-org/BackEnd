import React from "react";
import {IndexRedirect, Redirect, Route} from "react-router";
import AppContainer from "./components/AppContainer";
import Dashboard from "./components/Dashboard";
import EmployeesContainer from "./components/employees/EmployeesContainer";
import FAQContainer from "./components/faq/FAQContainer";
import PaymentSuccessRedirectContainer from "./components/go-premium/PaymentSuccessRedirectContainer";
import Home from "./components/home/Home";
import DailyReportContainer from "./components/reports/DailyReportContainer";
import Report from "./components/reports/Report";
import Settings from "./components/Settings";
import {ReportModes} from "./helpers/utils";

export default (
    <Route path="/" component={AppContainer}>
        <IndexRedirect to="/dashboard" />
        <Route path="/home" component={Home}/>
        <Route path="/dashboard" component={Dashboard} onEnter={requireAuth}>
            <IndexRedirect to="/dashboard/report" />
            <Route path="employees" component={EmployeesContainer} />
            <Route path="settings" component={Settings} />
            <Route path="report" component={Report} />
            <Route path="live" component={() => <DailyReportContainer mode={ReportModes.Live} />} />
            <Redirect from="*" to="/dashboard/live" />
        </Route>
        <Route path="faq(/:name)" component={FAQContainer} />
        <Route path="paymentSuccess" component={PaymentSuccessRedirectContainer} />
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
