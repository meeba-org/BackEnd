import React from "react";
import {IndexRoute, Route} from "react-router";
import AppContainer from "./components/AppContainer";
import Status from "./components/Status";
import EmployeesContainer from "./components/employees/EmployeesContainer";
import LoginContainer from "./components/login/LoginContainer";
import Dashboard from "./components/Dashboard";

export default (
    <Route path="/" component={AppContainer}>
        <IndexRoute component={LoginContainer} />
        <Route path="/login" component={LoginContainer}/>
        <Route path="/dashboard" component={Dashboard} >
            <IndexRoute component={EmployeesContainer} />
            <Route path="status" component={Status} />
            <Route path="employees" component={EmployeesContainer} />
        </Route>
    </Route>
);
