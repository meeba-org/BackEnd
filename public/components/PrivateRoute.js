import React from 'react';
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (<Route {...rest} render={(props) => {
    const token = localStorage.getItem('idToken');
    return token ? <Component {...props} />
        : <Redirect to="/home"/>;
}}/>);

export default PrivateRoute;
