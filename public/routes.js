import {Switch} from "@material-ui/core";
import React, {lazy, Suspense} from "react";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import AppContainer from "./components/AppContainer";
import FAQContainer from "./components/faq/FAQContainer";
import PaymentSuccessRedirectContainer from "./components/go-premium/PaymentSuccessRedirectContainer";
import Home from "./components/home/Home";
import {ReportModes} from "./helpers/utils";
const Dashboard = lazy(() => import('./components/Dashboard'));
const EmployeesContainer = lazy(() => import('./components/employees/EmployeesContainer'));
const Settings = lazy(() => import('./components/Settings'));
const Report = lazy(() => import('./components/reports/Report'));
const DailyReportContainer = lazy(() => import('./components/reports/DailyReportContainer'));

const Routes = () => {
    return (
        <BrowserRouter>
            <AppContainer>
                {/*<Redirect exact from="/" to="/dashboard"/>*/}
                <Route path="/home" component={Home}/>
                <Suspense fallback={<div>Loading...</div>}>
                    <Dashboard>
                        <Suspense fallback={<div>Loading...</div>}>
                            {/*<Redirect exact from="/dashboard" to="/dashboard/report"/>*/}
                            <PrivateRoute path="/dashboard/employees" component={EmployeesContainer}/>
                            <PrivateRoute path="/dashboard/settings" component={Settings}/>
                            <PrivateRoute path="/dashboard/report" component={Report}/>
                            <PrivateRoute path="/dashboard/live" component={() => <DailyReportContainer mode={ReportModes.Live}/>}/>
                        </Suspense>
                    </Dashboard>
                </Suspense>
                <Route path="/faq(/:name)" component={FAQContainer}/>
                <Route path="/paymentSuccess" component={PaymentSuccessRedirectContainer}/>
            </AppContainer>
        </BrowserRouter>
    );
};

export default Routes;

const PrivateRoute = ({component: Component, ...rest}) => {
    let token = localStorage.getItem('jwtToken');
    const isAuthenticated = token && token !== '';

    return (
        <Route
            {...rest}
            render={(props) => isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{pathname: '/home', state: {from: props.location}}}/>}
        />
    );
};
