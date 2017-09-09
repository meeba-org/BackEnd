import "babel-polyfill";
import {render} from "react-dom";
import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import createMuiTheme from 'material-ui/styles/theme';
import injectTapEventPlugin from "react-tap-event-plugin";
import routes from "./routes";

import {Provider} from "react-redux";
import {browserHistory, Router} from "react-router";
import createStore from "./store/configureStore";
import {syncHistoryWithStore} from "react-router-redux";
import createPalette from 'material-ui/styles/palette';
import createTypography from 'material-ui/styles/typography';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = createMuiTheme({
    isRtl: true,
    typography: createTypography(createPalette(), {
        fontFamily: '"Assistant", sans-serif'
    })
});

const store = createStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
    <MuiThemeProvider theme={muiTheme}>
        <Provider store={store}>
            <Router history={history} routes={routes} />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('react-app')
);
