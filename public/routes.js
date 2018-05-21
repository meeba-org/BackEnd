import React from "react";
import {Route} from "react-router";
import AppContainer from "./components/AppContainer";

export default (
    <Route path="/" component={AppContainer} />
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
