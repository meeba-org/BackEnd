import React from "react";
import {IndexRedirect, Redirect, Route} from "react-router";
import AppContainer from "./components/AppContainer";
const  Dashboard = React.lazy(() => import("./components/Dashboard"));
const  EmployeesContainer = React.lazy(() => import("./components/employees/EmployeesContainer"));
const  FAQContainer = React.lazy(() => import("./components/faq/FAQContainer"));
const  PaymentSuccessRedirectContainer = React.lazy(() => import("./components/go-premium/PaymentSuccessRedirectContainer"));
import Home from "./components/home/Home";
const  DailyReportContainer = React.lazy(() => import("./components/reports/DailyReportContainer"));
const  Report = React.lazy(() => import("./components/reports/Report"));
const  Settings = React.lazy(() => import("./components/Settings"));
import {ReportModes} from "./helpers/utils";

export default (
    <Route path="/" component={AppContainer}>
        <IndexRedirect to="/dashboard" />
        <Route path="/home" component={Home}/>
        <Route path="/dashboard" render={(props) => <Dashboard {...props} />} onEnter={requireAuth}>
            <IndexRedirect to="/dashboard/report" />
            <Route path="employees" render={props => <EmployeesContainer {...props}/>} />
            <Route path="settings" render={props => <Settings {...props} />} />
            <Route path="report" render={props => <Report {...props} />} />
            <Route path="live" render={(props) => <DailyReportContainer mode={ReportModes.Live} {...props} />} />
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
