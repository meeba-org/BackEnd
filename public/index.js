import "babel-polyfill";
import {render} from "react-dom";
import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import routes from "./routes";

import {Provider} from "react-redux";
import {browserHistory, Router} from "react-router";
import createStore from "./store/configureStore";
import {syncHistoryWithStore} from "react-router-redux";
import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import {brown, orange} from 'material-ui/colors';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

function muiTheme() {
    return createMuiTheme({
        direction: "rtl",
        typography: {
            fontFamily: '"Assistant", sans-serif'
        },
        overrides: {
            MuiIconButton: {
                root: {
                    height: "100%"
                }
            },
            MuiSvgIcon: {
                root: {
                    height: "48px",
                    width:"48px"
                }
            }
        },
        palette: {
            primary: brown,
            secondary: orange,
        },
    });
}
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
