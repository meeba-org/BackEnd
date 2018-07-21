import React from 'react';
import routes from "./routes";
import {Provider} from "react-redux";
import {browserHistory, Router} from "react-router";
import createStore from "./store/configureStore";
import {syncHistoryWithStore} from "react-router-redux";
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import brown from '@material-ui/core/colors/brown';
import orange from '@material-ui/core/colors/orange';
import JssProvider from 'react-jss/lib/JssProvider';
import {create} from 'jss';
import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';

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
    },
});

const store = createStore();
const history = syncHistoryWithStore(browserHistory, store);
const generateClassName = createGenerateClassName();
const jss = create(jssPreset());

const Root = () =>
    (<MuiThemeProvider theme={muiTheme}>
        <Provider store={store}>
            <JssProvider jss={jss} generateClassName={generateClassName}>
                <Router history={history} routes={routes}/>
            </JssProvider>
        </Provider>
    </MuiThemeProvider>);

export default Root;
