import "@babel/polyfill";
import 'react-hot-loader'; // required by react-hot-loader to be imported before 'react' https://github.com/gaearon/react-hot-loader
import React from "react";
import {render} from "react-dom";
import Root from "./Root";


render(
    <Root />,
    document.getElementById('react-app')
);

