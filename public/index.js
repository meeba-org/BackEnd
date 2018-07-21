import "babel-polyfill";
import {render} from "react-dom";
import React from "react";
import Root from "./Root";


render(
    <Root />,
    document.getElementById('react-app')
);

if (module.hot) {
    module.hot.accept('./Root', () => {
        const RootContainer = require('./Root').default;
        render(
            <RootContainer />,
            document.getElementById('react-app')
        );
    });
}

