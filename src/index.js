import "babel-polyfill";
import {render} from "react-dom";
import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import createMuiTheme from 'material-ui/styles/theme';
import injectTapEventPlugin from "react-tap-event-plugin";
import Root from "./Root";
import App from "./components/App";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = createMuiTheme({
    isRtl: true,
});

render(
    <MuiThemeProvider theme={muiTheme}>
        <App />
    </MuiThemeProvider>,
    document.getElementById('react-app')
);
