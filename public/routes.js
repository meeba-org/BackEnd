import React from "react";
import {IndexRoute, Route} from "react-router";
import App from "./components/App";
import Status from "./components/Status";
import EmployeesContainer from "./components/employees/EmployeesContainer";
import LoginContainer from "./components/login/LoginContainer";
import Dashboard from "./components/Dashboard";

export default (
    <Route path="/" component={App}>
        <Route path="/login" component={LoginContainer}/>
        <Route path="/dashboard" component={Dashboard} >
            <IndexRoute component={EmployeesContainer} />
            <Route path="status" component={Status} />
            <Route path="employees" component={EmployeesContainer} />
        </Route>
    </Route>
);
