import "babel-polyfill";
import {render} from "react-dom";
import React from "react";
import routes from "./routes";

import {Provider} from "react-redux";
import {browserHistory, Router} from "react-router";
import createStore from "./store/configureStore";
import {syncHistoryWithStore} from "react-router-redux";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {brown, orange} from '@material-ui/core/colors';
import {AppContainer} from 'react-hot-loader';

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
            <AppContainer>
                <Router history={history} routes={routes} />
            </AppContainer>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('react-app')
);

if (module.hot) {
    module.hot.accept();
}
