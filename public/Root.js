import React from 'react';
import {hot} from 'react-hot-loader';
import routes from "./routes";
import {Provider} from "react-redux";
import {browserHistory, Router} from "react-router";
import createStore from "./store/configureStore";
import {syncHistoryWithStore} from "react-router-redux";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {brown, orange} from '@material-ui/core/colors';

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

const Root = () =>
    (<MuiThemeProvider theme={muiTheme}>
        <Provider store={store}>
            <Router history={history} routes={routes}/>
        </Provider>
    </MuiThemeProvider>);

export default hot(module)(Root);
