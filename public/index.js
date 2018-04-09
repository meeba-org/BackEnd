import "babel-polyfill";
import {render} from "react-dom";
import React from "react";
import routes from "./routes";

import {Provider} from "react-redux";
import {browserHistory, Router} from "react-router";
import createStore from "./store/configureStore";
import {syncHistoryWithStore} from "react-router-redux";
import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import {brown, orange} from 'material-ui/colors';

const muiTheme = createMuiTheme({
        direction: "rtl",
        typography: {
            fontFamily: '"Assistant", sans-serif'
        },
        overrides: {
            MuiIconButton: {
                root: {
                    height: "100%"
                }
            }
        },
        palette: {
            primary: brown,
            secondary: orange,
        }
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
