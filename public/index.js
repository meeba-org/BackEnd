import "babel-polyfill";
import {render} from "react-dom";
import React from "react";
import Root from "./Root";


render(
    <Root />,
    document.getElementById('react-app')
);

