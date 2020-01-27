import React from 'react';
import {Redirect, Route} from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => (<Route {...rest} render={(props) => {
    const token = localStorage.getItem('jwtToken');
    return token ? <Component {...props} />
        : <Redirect to="/home"/>;
}}/>);

export default PrivateRoute;
