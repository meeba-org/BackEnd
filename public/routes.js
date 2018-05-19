import React from "react";
import AppContainer from "./components/AppContainer";

export default (
    <AppContainer/>
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
