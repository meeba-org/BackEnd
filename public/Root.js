import brown from '@material-ui/core/colors/brown';
import orange from '@material-ui/core/colors/orange';
import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {create} from 'jss';
import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import {Provider} from "react-redux";
import {browserHistory, Router} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import routes from "./routes";
import createStore from "./store/configureStore";

const muiTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: '"Assistant", sans-serif'
    },
    overrides: {
        MuiIconButton: {
            root: {
                height: "100%",
                width: "initial",
                padding: "3px",
            }
        },
        MuiInputLabel: {
            root: {
                transformOrigin: "top right"
            },
            shrink: {
                transformOrigin: "top right"
            },
        },
        MuiTooltip: {
            tooltip: {
                fontSize: "15px"
            }
        },
        MuiSwitch: {
            root: {
                direction: "ltr"
            },
            "&$checked": {
                "transform": "translateX(20px)"
            }
        },
        MuiPickersTimePicker: {
            hourMinuteLabel: {
                direction: "ltr"
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
